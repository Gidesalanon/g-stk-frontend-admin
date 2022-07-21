import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "reactstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { getEntity, removeEntity } from "../../service/api";

const Table = ReactTable;
const ENDPOINT = 'fichiers'

export default class FichierListComponent extends Component {
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
                accessor: 'basename',
                Header: 'Nom'
            },
            {
                accessor: 'filename',
                Header: 'Fichier'
            },
            {
                id:'fichier_id',
                accessor: f => {
                    return (<a target="_blank" href={f.url}><i className="fa fa-download"></i></a>)
                },
                Header: 'Télécharger'
            },
            {
                accessor: 'id',
                Header: 'Actions',
                Cell: ({ row: { _original } }) => this.renderActions(_original)
            }]
    };

    removeFichier = row => {
        removeEntity(ENDPOINT, row.id).then(res => {
            this.props.reloadDataAfterEvent('deleted')
            this.props.successRemove(true)
        }, error => {
            this.props.successRemove(false)
        });
    }

    renderActions = (fichier) => (
        <CopyToClipboard text={fichier.url}>
            <Button size="sm" outline color="info"><i className="fa fa-copy"></i> Copier le lien</Button>
        </CopyToClipboard>
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
                pages: Math.ceil(res.data.meta.total / this.state.pagination),
                data: res.data.data,
                links: res.data.links,
                loading: false,
                current_page: !current_page ? res.data.meta.current_page : current_page,
            })
        }).catch(res=>{
            this.setState({loading:false})
        })
    }

    componentDidUpdate(prevProps) {
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
        this.setState({sorted},()=>{
            this.loadData()
        })
    }

    filtering = (filtered) => {
        this.setState({filtered},()=>{
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
