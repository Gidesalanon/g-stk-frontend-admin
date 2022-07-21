import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Modal, ModalHeader,ModalFooter, ModalBody } from "reactstrap";
import { connect } from 'react-redux'
import Moment from 'moment';
import { getEntity, removeEntity } from "../../service/api";

const Table = ReactTable;
const ENDPOINT = 'applications'

class ApplicationListComponent extends Component {
    state = {
        openPreviewModal: false,
        data: this.props.data,
        loading: false,
        pages: null,
        ConfirmModal:null,
        pagination: 15,
        current_application: 1,
        sorted:null,
        filtered:null,
        links: null,
        columns: [
            {
                accessor: 'name',
                Header: 'Nom'
            },
            {
                accessor: 'redirect',
                Header: 'Redirection',
                style: { 'whiteSpace': 'unset' },
            },
            {
                accessor: 'secret',
                Header: 'Mot de passe client',
                style: { 'whiteSpace': 'unset' },
                Cell: '******************'
            },
            {
                accessor: 'created_at',
                Header: 'Date',
                Cell: ({ row: { _original } }) => Moment(_original.created_at).format("DD/MM/YYYY à HH:mm")

            },
            {
                accessor: 'id',
                Header: 'Actions',
                Cell: ({ row: { _original } }) => this.renderActions(_original)
            }]
    };

    removeApplication = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="success" onClick={()=>{ this.props.setPreviewApplication(row); this.setState({ openPreviewModal: true }) }}><i className="fa fa-eye"></i></Button> {"   "}
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentApplication(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

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

    paging = (current_application) => {
        this.setState({current_application},()=>{
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
                        <Button color="danger" onClick={() => {this.removeApplication(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
                    </ModalFooter>
                </Modal>
                <Table
                    filterable={false}
                    data={data}
                    columns={columns}
                    pages={pages}
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
        current: state.application.current,
        reload_data: state.application.reload_data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentApplication: (current) => {
            dispatch({ type: 'current-application', current })
        },
        setPreviewApplication: (preview) => {
            dispatch({ type: 'preview-application', preview })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(ApplicationListComponent)
