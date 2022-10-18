import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Badge, Modal, ModalHeader,ModalFooter, ModalBody } from "reactstrap";
import { connect } from 'react-redux'
import { getEntity, removeEntity, putEntity } from "../../service/api";
import Moment from "moment";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Table = ReactTable;
const ENDPOINT = 'sellings'

class SellingListComponent extends Component {
    state = {
    
        openPreviewModal: false,
        data: this.props.data,
        productsList: [{label:"Aucun résultat",value:""}],
        loading: false,
        pages: null,
        ConfirmModal:null,
        pagination: 15,
        current_page: 1,
        sorted:null,
        filtered:null,
        links: null,
        columns: [
            {
                accessor: 'description',
                filterable:false,
                Header: 'Détail'
            },
            {
                accessor: 'client_id',
                filterable:false,
                Header: 'Client',
                Cell: ({ row: { _original } }) => <b>{_original.clients.lastname + ' ' + _original.clients.firstname}</b>
            },
            {
                accessor: 'selling_products',
                filterable:false,
                Header: 'Produits',
                Cell: ({ row: { _original } }) => <i>{this.renderProductsList(_original.selling_products)}</i>
            },
            {
                accessor: 'created_at',
                filterable:false,
                Header: 'Date d\'ajout',
                Cell: ({ row: { _original } }) => Moment(_original.created_at).format("DD/MM/YYYY")
            },
            {
                accessor: 'public',
                Header: 'Validé',
                width:100,
                Cell: ({ row: { _original } }) => <Toggle checked={_original.public==1}  onChange={() => this.sellingUpdatePublic(_original)} />,
                
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

    removeSelling = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderProductsList = (row) => (
        <>
        { row?.map((item, index) => (
            <span key={`${index}`}>
                {' ' + item.quantity + ' ' + this.getProduct(item.product_id)} ; 
            </span>
            ))
        }
        </>
    );

    renderActions = (row) => (
        <>
            <Button size="sm" outline title="Prévisualiser" color="success" onClick={()=>{ this.props.setPreviewSelling(row); this.setState({ openPreviewModal: true }) }}><i className="fa fa-eye"></i></Button> {"   "}
            <Button size="sm" outline title="Supprimer" color="danger" onClick={() => this.setState({ ConfirmModal: row })}><i className="fa fa-trash"></i></Button>
        </>
    );

    sellingUpdatePublic = (row) => {
        row.public=row.public==0?1:0;
        let id = row.id;
        delete row['id'];
        delete row['fichier'];
        delete row['deleted'];
        delete row['type_doc'];
        delete row['access_link'];
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
        let prods = [{label:"Aucun résultat",value:""}];
        getEntity('products_all').then(res => {
            res.data.data.map(product => {
                prods.push({label:product.name,value:product.id});
            });
            this.setState({ productsList: prods});
        });
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

    getProduct(product_id){
        if(this.state.productsList){
            return this.state.productsList.find(i => i.value === product_id)?.label;
        }
        return 'Produit introuvable';
    }

    getProductObject(product_id){
        if(this.state.productsList) return { label: this.state.productsList.find(i => i.value === product_id)?.label, value: product_id};
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
                        <Button color="danger" onClick={() => {this.removeSelling(this.state.ConfirmModal);this.setState({ ConfirmModal: null });}}>Supprimer</Button>
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
        current: state.selling.current,
        reload_data: state.selling.reload_data,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentSelling: (current) => {
            dispatch({ type: 'current-selling', current })
        },
        setPreviewSelling: (preview) => {
            dispatch({ type: 'preview-selling', preview })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(SellingListComponent)
