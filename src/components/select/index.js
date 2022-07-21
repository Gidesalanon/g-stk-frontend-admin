import React, { Component } from 'react';
import AsyncPaginate from 'react-select/async'
import { getEntity } from '../../service/api';

class SelectComponent extends Component {
    nullable = false;

    constructor(props, context) {
        super(props, context);

        this.state = {
            inputValue: '',
            endpoint: this.props.endpoint,
            filter: this.props.filter,
            data: this.props.datas,
            nextDataUrl: null // For Pagination
        }

        this.nullable = this.props.nullable === true;
    }

    fetch(url, search = '') {
        let query = '';
        if (search?.trim() !== '') {
            query = `${this.state.filter}=${search}`;
        }

        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += query;

        return getEntity(url).then(res => res.data);
    }

    transformResult(response) {
        return response.data.map(data => ({ value: data.id, label: data[this.state.filter] }));
    }

    fetchData = (callback, ...rest) => {
        if (!this.state.endpoint) { // If its static data, return
            if (typeof callback === 'function') {
                callback(this.state.data);
            }
            return;
        }

        const url = this.state.nextDataUrl ?? this.state.endpoint;

        setTimeout(() => {
            this.fetch(url, this.state.inputValue).then((responseData) => {
                let data = this.transformResult(responseData);
                const nextDataUrl = responseData.links ? responseData.links.next : null;

                if (this.state.nextDataUrl) { // Is loading next data
                    data = this.state.data.concat(data);
                } else if (this.nullable) {
                    data.unshift({ value: null, label: 'Aucune donnée'})
                }

                this.setState({ data, nextDataUrl });
                if (typeof callback === 'function') {
                    callback(data);
                }
            })
        }, 1000);
    }

    componentDidMount = () => {
        if (this.props.endpoint) {
            this.fetchData();
        } else {
            this.setState({ data: this.props.datas });
        }
    };

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    }

    render() {
        return (<div className={this.props.className} style={{ 'position': 'relative' }}>
            <AsyncPaginate
                value={this.state.selectedOption}
                loadOptions={(event, callback) => { this.fetchData(callback) }}
                cacheOptions
                options={this.state.data}
                placeholder={`Selectionner`}
                isMulti={this.props.isMulti}
                isDisabled={this.props.isDisabled}
                onInputChange={this.handleInputChange}
                onChange={(selectedOption) => { this.setState({ selectedOption }, () => { this.props.setValue(selectedOption) }) }}
                defaultOptions
                defaultValue={this.props.defaultValue}
                onMenuScrollToBottom={this.fetchData}
                menuContainerStyle={{'zIndex': 999}}
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
        </div>)
    }
}

export default SelectComponent;
