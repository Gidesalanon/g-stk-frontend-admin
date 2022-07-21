import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Badge, Modal, ModalHeader,ModalFooter, ModalBody } from "reactstrap";
import { connect } from 'react-redux'
import Moment from 'moment';
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { getEntity, removeEntity, putEntity } from "../../service/api";
// import Spinner from '../spinner/spinner';

const Table = ReactTable;
const ENDPOINT = 'news'

class ActualiteListComponent extends Component {
    state = {
        data: this.props.data,
        loading: false,
        pages: null,
        ConfirmModal:null,
        pagination: 9,
        current_page: 1,
        sorted:null,
        filtered:null,
        links: null,
        columns: [
            {
                accessor: 'title',
                Header: 'Titre'
            },
            {
                accessor: 'modules.name',
                filterable:false,
                Header: 'Module',
                style: { 'whiteSpace': 'unset' },
                Cell: ({ row: { _original } }) => <Badge className="bg-success">{_original.modules?.name}</Badge>
            },
            {
                accessor: 'users.username',
                filterable:false,
                Header: 'Auteur',
                style: { 'whiteSpace': 'unset' },
            },
            {
                accessor: 'created_at',
                filterable:false,
                Header: 'Date',
                Cell: ({ row: { _original } }) => Moment(_original.created_at).format("DD/MM/YYYY à HH:mm")
            },
            {
                accessor: 'public',
                Header: 'Publié',
                width:100,
                Cell: ({ row: { _original } }) => <Toggle checked={_original.public==1}  onChange={() => this.actualiteUpdatePublic(_original)} />,
                
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

    removeActualite = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentActualite(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

    componentDidMount = () => {
        this.loadData()
    }

    actualiteUpdatePublic = (row) => {
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
        }).finally((e) => {
            this.setState({ loading: false });
            this.loadData()
        });
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
                pagination:res.data.per_page,
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
                        <Button color="danger" onClick={() => {this.removeActualite(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
                    </ModalFooter>
                </Modal>
                <Table
                    filterable
                    data={data}
                    sortable={false}
                    columns={columns}
                    pages={pages}
                    defaultPageSize={pagination}
                    loading={loading}
                    // LoadingComponent={Spinner}
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
        current: state.actualite.current,
        reload_data: state.actualite.reload_data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentActualite: (current) => {
            dispatch({ type: 'current-actualite', current })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(ActualiteListComponent)
