import React, { Component, useRef, useCallback } from "react";
import "react-table/react-table.css";
import { Col, Button,Row, Badge, Modal, ModalHeader,ModalFooter, ModalBody } from "reactstrap";
import { connect } from 'react-redux'
import { getEntity, removeEntity, putEntity } from "../../service/api";
import Spinner from '../spinner/spinner';

const ENDPOINT = 'medias'
require('dotenv').config()

class MediaListComponent extends Component {
    state = {
    
        openPreviewModal: false,
        data: this.props.data,
        loading: false,
        prevParentId : null,
        parent : null,
        pages: null,
        ConfirmModal:null,
        pagination: 15,
        current_page: 1,
        sorted:null,
        filtered:null,
        links: null,
        modules: null,
        activeTab: ""
    };
    
    removeMedia = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="success" onClick={()=>{ this.props.setPreviewMedia(row); this.setState({ openPreviewModal: true }) }}><i className="fa fa-eye"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

    mediaUpdatePublic = (row) => {
        row.public=row.public==0?1:0;
        let id = row.id;
        delete row['id'];
        let mod = {model:row};
        this.setState(mod);
        let request = null;
        this.setState({ loading: true });
        
        request = putEntity(ENDPOINT, id, row);
    
        request.then(() => {
            this.props.reloadDataAfterEvent('added');
        }, () => {
            // this.props.onRequestSent(false);
        }).finally((e) => {
            this.loadData()
            this.setState({ loading: false });
        });
            this.loadData()

    }

    componentDidMount = () => {
        this.loadData()
    }
    
    loadData = () => {
        let query = {filter: {}};
        const { filtered, sorted, current_page } = this.state;

        if (sorted && sorted.length > 0) {
            query.f_params = {
                orderBy: {
                    field: sorted[0].id,
                    type: sorted[0].desc ? 'DESC' : 'ASC',
                }
            }
        }

        if (filtered) {
            filtered.forEach(filter => {
                query.filter[filter.id] = {
                    op: 'like',
                    value: filter.value
                };
            });
        }

        if (current_page){
            query.page = current_page;
        }

        this.setState({ loading: true });

        getEntity(`medias_all${this.state.parent ? `?module_id=${this.state.parent.id}` : ''}`).then(res => {
            this.setState({
                pages: Math.ceil(res.data.meta?res.data.meta.total:res.data.data.length / this.state.pagination),
                data: res.data.data,
                links: res.data.links?res.data.links:null,
                loading: false,
                current_page: !current_page ? res.data.meta.current_page : current_page,
            });
        }).catch(res=>{
            this.setState({loading:false})
        })
    }

    componentDidUpdate() {
        if (this.props.reload_data != null) {
            this.props.reloadDataAfterEvent(null)
            this.loadData()
        }
    }

    paging = (current_page) => {
        this.setState({current_page},()=>{
            this.loadData()
        })
    }

    sorting = (sorted) => {
        this.setState({sorted}, ()=>{
            this.loadData()
        })
    }

    filtering = (filtered) => {
        this.setState({filtered}, ()=>{
            this.loadData()
        })
    }
    medias = (data) => data?.map((item, key) => {
        const isCurrent = this.state.defaultValue === item.value;
        return (
                <Col md="6" sm="6" xs="12" className="my-2" key={key} id={'media-'+key}>
                    <figure className="effect-zoe" >
                        <img  src={process.env.REACT_APP_SERVER_ASSET+item.fichier.filename} alt={item.name} />
                        <figcaption>
                            <div>
                                <p className="icon-links">
                                <Badge className="bg-info">
                                    {item.modules?.name}
                                </Badge>{"   "}
                                {this.renderActions(item)}
                                </p>
                                <p className="description">{item.title||''}</p>
                            </div>
                        </figcaption>
                    </figure>
                </Col>
            
        );
    });

    render() {
        return (
            <Row>
                
                {this.state.loading&&<Spinner/>}
                {!this.state.loading&&!this.state.data?.length&&<h3>Aucun résultat trouvé</h3>}
                  
                <Modal isOpen={this.state.ConfirmModal!=null} size='md'>
                    <ModalHeader toggle={()=> this.setState({ ConfirmModal: null }) }>Attention</ModalHeader>
                    <ModalBody>Faut-il vraiment supprimer cet élément ?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=> this.setState({ ConfirmModal: null }) }>Annuler</Button>
                        <Button color="danger" onClick={() => {this.removeMedia(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
                    </ModalFooter>
                </Modal>
                
                <Row>
                    <div className="col-12">
                        <div className="grid-hover">
                            <Row>{this.medias(this.state.data)}</Row>
                        </div>
                    </div>
                </Row>

            </Row>
        );
    }
}

const mapStateProps = (state) => {
    return {
        current: state.media.current,
        reload_data: state.media.reload_data,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentMedia: (current) => {
            dispatch({ type: 'current-media', current })
        },
        setPreviewMedia: (preview) => {
            dispatch({ type: 'preview-media', preview })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(MediaListComponent)
