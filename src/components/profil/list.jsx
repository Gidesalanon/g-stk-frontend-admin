import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "reactstrap";
import { connect } from 'react-redux'
import { getEntity, removeEntity } from "../../service/api";

const Table = ReactTable;
const ENDPOINT = 'pages'

class PageStatiqueListComponent extends Component {
    state = {
    
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
                accessor: 'public',
                Header: 'Publié'
            },
            {
                accessor: 'get_module.name',
                Header: 'Module'
            },
            {
                accessor: 'get_page.username',
                Header: 'Auteur'
            },
            {
                accessor: 'id',
                Header: 'Actions',
                Cell: ({ row: { _original } }) => this.renderActions(_original)
            }]
            
    };

    removePageStatique = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }).catch(error => {
            this.props.successRemove()
        });
    }

    renderActions = (row) => (
        <>
            <Button size="sm" outline color="info" onClick={() => this.props.setCurrentPageStatique(row)}><i className="fa fa-edit"></i></Button> {"   "}
            <Button size="sm" outline color="danger" onClick={() => this.removePageStatique(row)}><i className="fa fa-trash"></i></Button>
        </>
    );

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

        getEntity(ENDPOINT, query).then(res => {
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

    render() {
        const { data, columns, pages, pagination, loading } = this.state;
        return (
            <Table
                filterable
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
            />
        );
    }
}

const mapStateProps = (state) => {
    return {
        current: state.page.current,
        reload_data: state.page.reload_data,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentPageStatique: (current) => {
            dispatch({ type: 'current-page', current })
        },
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(PageStatiqueListComponent)
