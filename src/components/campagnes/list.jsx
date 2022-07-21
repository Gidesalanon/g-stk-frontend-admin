import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Modal, ModalHeader,ModalFooter, ModalBody } from "reactstrap";
import { connect } from 'react-redux'
import { getEntity, removeEntity, putEntity } from "../../service/api";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Table = ReactTable;
const ENDPOINT = 'campagnes'

class CampagneListComponent extends Component {
    state = {
    
        openPreviewModal: false,
        data: this.props.data,
        loading: false,
        pages: null,
        pagination: 15,
        current_page: 1,
        ConfirmModal:null,
        sorted:null,
        filtered:null,
        links: null,
        columns: [
            {
                accessor: 'name',
                filterable:false,
                Header: 'Nom'
            },
            {
                accessor: 'type_production',
                filterable:false,
                Header: 'Production',
            },
            {
                accessor: 'type_campagne',
                filterable:false,
                Header: 'Campagne',
            },
            {
                accessor: 'yearbegin',
                filterable:false,
                Header: 'Année de démarrage',
            },
            {
                accessor: 'yearend',
                filterable:false,
                Header: 'Année de fin',
            },
            {
                accessor: 'public',
                Header: 'Publié',
                width:100,
                Cell: ({ row: { _original } }) => <Toggle checked={_original.public==1}  onChange={() => this.campagneUpdatePublic(_original)} />,
                
                filterMethod: (filter, row) => {
                if (filter.value === "") {
                    return true;
                }
                return row._original[filter.id] == filter.value;
    
                },
                Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                >
                    <option value="">Tout</option>
                    <option value={1}>Oui</option>
                    <option value={0}>Non</option>

                </select>
  
            },
            {
                accessor: 'id',
                filterable:false,
                Header: 'Actions',
                Cell: ({ row: { _original } }) => this.renderActions(_original)
            }]
            
    };

    removeCampagne = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="success" onClick={()=>{ this.props.setPreviewCampagne(row); this.setState({ openPreviewModal: true }) }}><i className="fa fa-eye"></i></Button> {"   "}
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentCampagne(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

    campagneUpdatePublic = (row) => {
        row.public=row.public==0?1:0;
        let id = row.id;
        delete row['id'];
        delete row['fichier'];
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
        var url = ENDPOINT
        const { filtered, sorted, current_page } = this.state;

        if (filtered) {
            filtered.map(f=>{
                if(url.indexOf('?')==-1){
                    url += `?${f.id}=${f.value}`
                }else{
                    url += `&${f.id}=${f.value}`
                }
            })

        }

        if (current_page){
            url += url.indexOf('?')==-1?`?page=${current_page}`:`&page=${current_page}`;
        }

        this.setState({ loading: true });

        getEntity(url).then(res => {     
            this.setState({
                pages: Math.ceil(res.data.total / res.data.per_page),
                data: res.data.data,
                links: res.data.links,
                loading: false,
                pagination: res.data.per_page,
                current_page: !current_page ? res.data.current_page : current_page,
            })
        }).catch(res=>{
            this.setState({loading:false})
        });
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

    render() {
        const { data, columns, pages, pagination, loading } = this.state;
        return (
            <>
                <Modal isOpen={this.state.ConfirmModal!=null} size='md'>
                    <ModalHeader toggle={()=> this.setState({ ConfirmModal: null }) }>Attention</ModalHeader>
                    <ModalBody>Faut-il vraiment supprimer cet élément ?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=> this.setState({ ConfirmModal: null }) }>Annuler</Button>
                        <Button color="danger" onClick={() => {this.removeCampagne(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
                    </ModalFooter>
                </Modal>
                <Table
                    filterable
                    data={data}
                    columns={columns}
                    pages={pages}
                    sortable={false}
                    defaultPageSize={pagination}
                    loading={loading}
                    manual
                    showPageSizeOptions={false}
                    onPageChange={pageIndex => this.paging(++pageIndex)}
                    onFilteredChange={(state, key) => this.filtering(state)}
                    onSortedChange={state => this.sorting(state)}
                    nextText="Suivant"
                    previousText="Précédent"
                />
            </>
        );
    }
}

const mapStateProps = (state) => {
    return {
        current: state.campagne.current,
        reload_data: state.campagne.reload_data,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentCampagne: (current) => {
            dispatch({ type: 'current-campagne', current })
        },
        setPreviewCampagne: (preview) => {
            dispatch({ type: 'preview-campagne', preview })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(CampagneListComponent)
