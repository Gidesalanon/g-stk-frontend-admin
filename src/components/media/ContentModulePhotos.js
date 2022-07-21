import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import ContentModulePhotosItems from './ContentModulePhotosItems';
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader,ModalFooter, ModalBody } from 'reactstrap';
import { getEntity, removeEntity, putEntity } from "../../service/api";
import Spinner from '../spinner/spinner';

const directory = process.env.REACT_APP_SERVER_ASSET

class ContentModulePhotos extends Component {

    state = {
        parent : null,
        loading : true,
        modulePhotos : [],
        numberPage : [],
        currentPage : 1,
    }

    componentWillMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading:true});
        getEntity(`modules_all?type_module=medias${this.state.parent ? `&parent_id=${this.state.parent.id}` : ''}`).then(res => {
            let modules = res.data.data;
            if (!this.state.parent) modules = modules.filter(m => m.parent_id == null)
            else modules = modules.filter(m => m.parent_id == this.state.parent.id)
            this.setState({modulePhotos:modules});
            this.setState({loading:false});
            let array_pages = Math.ceil(parseInt(res.data.total) / parseInt(res.data.per_page))
            array_pages = Array.from(Array(array_pages).keys())
            this.setState({numberPage:array_pages});
        });
    }
    removeMedia = row => {
        removeEntity('ENDPOINT', row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="success" onClick={()=>{ this.props.setPreviewMedia(row); this.setState({ openPreviewModal: true }) }}><i className="fa fa-eye"></i></Button> {"   "}
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentMedia(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

    render() {
    const access_children = module => {
        if(module==null) window.location.reload();
        this.setState({parent:module});
        // this.setState({modulePhotos:module?.children||null});
        this.loadData();
        // history.push(`/mediatheque-items/${module.id}`)
    }

    return (
            <div className="container">
                {this.state.loading&&<Spinner/>}
                  
                <Modal isOpen={this.state.ConfirmModal!=null} size='md'>
                    <ModalHeader toggle={()=> this.setState({ ConfirmModal: null }) }>Attention</ModalHeader>
                    <ModalBody>Faut-il vraiment supprimer cet élément ?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=> this.setState({ ConfirmModal: null }) }>Annuler</Button>
                        <Button color="danger" onClick={() => {this.removeMedia(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
                    </ModalFooter>
                </Modal>
                
                <div className="row pt-md-2">
                    {(this.state.modulePhotos?.length > 0 || this.state.parent!=null)  && <div className={`${this.state.parent ?'col-2 ':'col-12'} section-title`}>

                        <div className=" album ">
                            <div className="row">
                            {this.state.parent && <button className="btn" onClick={() => this.setState({parent:this.state.parent.parents||null})}><i className="fa fa-chevron-circle-left"></i> Retour</button>}
                                {
                                   !this.state.loading && this.state.modulePhotos.map(module => (
                                        <div className={`${!this.state.parent && 'col-sm-4 '}`} key={module.id}>
                                            <div className="single-teachers cursor text-center mt-3" onClick={() => {access_children(module);}}>
                                                <div className="image">
                                                    <img src={module.medias?.length>0 ? `${directory}/${module.medias[0].fichier.filename}`:'/album-default.jpeg'} alt={module.name} />
                                                    
                                                </div>
                                                <div className="cont">
                                                    <a className="cursor" >{module.name}</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {this.state.numberPage > 1 && <div className="row">
                                <div className="col-lg-12">
                                    <nav className="courses-pagination mt-10 pb-3">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item cursor">
                                                <a onClick={() => this.state.currentPage > 1 && this.setState({currentPage:this.state.currentPage - 1})} aria-label="Précédent" >
                                                    <i className="fa fa-angle-left"></i>
                                                </a>
                                            </li>
                                            {
                                                this.state.numberPage.map((n) => (
                                                    <li key={`page${n + 1}`} className="page-item cursor"><a className={this.state.currentPage == (n + 1) && 'active'} onClick={() => this.setState({currentPage:this.state.currentPage + 1})}>{n + 1}</a></li>
                                                ))
                                            }
                                            <li className="page-item cursor">
                                                <a onClick={() => this.state.currentPage < this.state.numberPage?.length && this.setState({currentPage:this.state.currentPage + 1})} aria-label="Suivant">
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
}
                        </div>

                    </div>
}
                    {this.state.parent && <div className={`${this.state.modulePhotos?.length>0 ?'col-10 ':'col-12 '} section-title `}>
                        <h5 className="mb-10">Photos {this.state.parent && this.state.parent.name} {this.state.parent.medias?.length ? ' ('+this.state.parent.medias.length+')':''} </h5>    
                        <div className="pl-10 pr-10 album">
                        <ContentModulePhotosItems module={this.state.parent} renderActions={this.renderActions}/>
                        </div>
                    </div>}

                </div>

            </div>

    )};

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

export default connect(mapStateProps, mapDispatchToProps)(ContentModulePhotos)