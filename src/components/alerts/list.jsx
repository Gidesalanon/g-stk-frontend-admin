import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Badge } from "reactstrap";
import { connect } from 'react-redux'
import { getEntity, removeEntity, putEntity } from "../../service/api";
import Moment from "moment";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Table = ReactTable;
const ENDPOINT = 'subjects'

class AlertListComponent extends Component {
    state = {
        openPreviewModal: false,
        data: this.props.data,
        loading: false,
        pages: null,
        pagination: 15,
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
                accessor: 'email',
                Header: 'Email'
            },
            {
                accessor: 'created_at',
                filterable:false,
                Header: 'Date de création',
                Cell: ({ row: { _original } }) => Moment(_original.created_at).format("DD/MM/YYYY")
            },
            {
                accessor: 'id',
                filterable:false,
                Header: 'Actions',
                Cell: ({ row: { _original } }) => this.renderActions(_original)
            }]
            
    };

    alertUpdatePublic = (row) => {
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

    removeAlert = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentAlert(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.removeAlert(row)}><i className="fa fa-trash"></i></Button>
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
            <Table
                filterable
                data={data}
                columns={columns}
                sortable={false}
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
        );
    }
}

const mapStateProps = (state) => {
    return {
        current: state.alert.current,
        reload_data: state.alert.reload_data,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentAlert: (current) => {
            dispatch({ type: 'current-alert', current })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(AlertListComponent)
