import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    ModalBody,
    ModalFooter,
    Row,
    CustomInput
} from 'reactstrap';
import { Repeat } from 'react-feather';
import classnames from 'classnames';
import SelectComponent from "../select";
import { postEntity, putEntity, getEntity } from '../../service/api';

class CommandeFormComponent extends Component {
    productsList = [{label:"Aucun résultat",value:""}];
    form = new FormData();
    state = {
        model: {
            public: 1,
            description: '',
            products: [{ product_id: '',expiration_date: '', quantity: '' }]
        },
        progress: 0,
        loading: false,
        formSubmitted: false,
        inputFields: [{ product_id: '',expiration_date: '', quantity: '' }]
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();

        this.getProductObject = this.getProductObject.bind(this);
        this.handleAddFields = this.handleAddFields.bind(this);
        this.handleRemoveFields = this.handleRemoveFields.bind(this);
        this.resetFormRepeater = this.resetFormRepeater.bind(this);
        this.setExpirationDate = this.setExpirationDate.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setPublic = this.setPublic.bind(this);

        if (props.current) {
            this.defaults = {
                public: props.current.public,
                description: props.current.description || '',
                products: [{"product_id":"2253514d-8f0f-4528-9013-a42a088e3f13","expiration_date":"2022-09-14","quantity":"1"},{"product_id":"3163fee9-7c12-4ddb-ad5d-079613d64f01","expiration_date":"2022-09-15","quantity":"2"},{"product_id":"34086124-068c-4a51-a895-e39770fc9858","expiration_date":"2022-09-22","quantity":"3"},{"product_id":"7ebc9882-ea52-4361-b01e-d2241db4f3aa","expiration_date":"2022-09-24","quantity":"5"}]
            }
            let model = {
                public: props.current.public,
                description: props.current.description || '',
                products: [{"product_id":"2253514d-8f0f-4528-9013-a42a088e3f13","expiration_date":"2022-09-14","quantity":"1"},{"product_id":"3163fee9-7c12-4ddb-ad5d-079613d64f01","expiration_date":"2022-09-15","quantity":"2"},{"product_id":"34086124-068c-4a51-a895-e39770fc9858","expiration_date":"2022-09-22","quantity":"3"},{"product_id":"7ebc9882-ea52-4361-b01e-d2241db4f3aa","expiration_date":"2022-09-24","quantity":"5"}]
            };

            if (props.current.categories) {
                this.defaults.categorie = { label: props.current.categories.name, value: props.current.categorie_id};
            }

            this.state = {
                model: model,
                type_commande: 'output',
                formSubmitted: false,
                loading: false,
                inputFields: [{ product_id: '',expiration_date: '', quantity: '' }]
            };
        }
    }

    getProductObject(product_id){
        return { label: this.productsList.find(i => i.value === product_id)?.label, value: product_id};
    }

    handleAddFields() {
        const values = [...this.state.inputFields];
        values.push({ product_id: '',expiration_date: '', quantity: '' });
        this.setState({ model: { ...this.state.model, products: values }});
        this.setState({'inputFields':values});
    };
    
    handleRemoveFields(index) {
        // if(size(this.state.inputFields)>1){
            const values = [...this.state.inputFields];
            values.splice(index,1);
            this.setState({ model: { ...this.state.model, products: values }});
            this.setState({'inputFields':values});
        // }
    };
    
    resetFormRepeater() {
        const values = [{ product_id: '',expiration_date: '', quantity: '' }];
        this.setState({'inputFields': values });
        this.setState({ model: { ...this.state.model, products: values }});
    }
    
    onSubmit(e) {
        e.preventDefault();

        let request = null;
        const config = {
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.setState({ progress: percentCompleted });
            }
        }

        this.setState({ formSubmitted: true });

        // if (this.formHasErrors()) {
        //     return;
        // }
        
        var formBody = [];
        const form = new FormData();
        for (let k in this.state.model) {
            form.append(k, this.state.model[k]);

            if(k=='fichier') continue;
            
            var encodedKey = encodeURIComponent(k);
            var encodedValue = encodeURIComponent(this.state.model[k]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        this.setState({ loading: true });
        if (this.props.current?.id) {
            request = putEntity('commands', this.props.current.id, formBody,  {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        } else {
            request = postEntity('commands', this.state.model, config)
        }

        request.then(() => {
            this.props.onRequestSent(true);
            this.props.reloadDataAfterEvent('added');
        }, () => {
            this.props.onRequestSent(false);
        }).finally(() => {

            this.setState({ loading: false });
        });
    }

    setType(type_commande) {
        this.setState({type_commande})
    }

    setValue(e) {
        const field = e.target.name;
        const keyValue = { [field]: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setDescription(event) {
        this.setState({ model: { ...this.state.model, description: event.target.value }});
    }

    setQuantity(index,event) {
        const products = this.state.model.products;
        products[index].quantity = event.target.value;
        console.log(products,'from setQuantity');
        this.setState({ model: { ...this.state.model, products: products }});
        this.setState({'inputFields': products});
    }

    setExpirationDate(index,event) {
        const products = this.state.model.products;
        products[index].expiration_date = event.target.value;
        console.log(products,'from setExpirationDate');
        this.setState({ model: { ...this.state.model, products: products }});
        this.setState({'inputFields': products});
    }

    setProduct(index,item) {
        const products = this.state.model.products;
        products[index].product_id = item.value;
        console.log(products,'from setQuantity');
        this.setState({ model: { ...this.state.model, products: products }});
        this.setState({'inputFields': products});
    }

    // handleInputChange(index, event) {
    //     const values = [...this.state.inputFields];
    //     const products = [...this.state.model.products];
    //     if (event.target && event.target.name === "quantity") {
    //         values[index].quantity = event.target.value;
    //         // products[index].quantity = event.target.value;
    //     } else {
    //         values[index].product_id = {value: event.value, label:'azerty'};
    //         // products[index].product_id = event;
    //     }
    //     this.setState({'inputFields': values});
    //     // this.setState({ model: { ...this.state.model, ...{products: products} }});

    // };
    
    setFichier(event) {
        const file = event.target.files[0];
        this.form.append('fichier', file);
        const keyValue = { fichier: file };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPublic(event) {
        const keyValue = { public: (!this.state.model.public) ? 1 : 0 };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    fieldInValid(field) {
        return this.state.model[field] === undefined || this.state.model[field] === null;
    }

    formHasErrors() {
        for (let k in this.state.model) {
            if (this.nullableFields.includes(k)) {
                return false;
            };

            if (this.fieldInValid(k)) {
                return true;
            }
        }

        return false;
    }

    componentDidMount(){
        getEntity('products_all').then(res => {
            res.data.data.map(product => {
                this.productsList.push({label:product.name,value:product.id});
            });
        });
    }
    render() {
        let products = Array.from(this.state.model.products);
        const {type_commande} = this.state
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Détails</Label>
                                        <div className="position-relative">
                                            <textarea type="text" onChange={this.setDescription} name="description" defaultValue={this.defaults.description}
                                                className={classnames('form-control')}
                                                value={this.state.model.description}
                                            ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>

                                <div className='row col-12'>

                                <Col md={5}>
                                    <p>Produits</p>
                                </Col>
                               
                                <Col md={3}>
                                    <p>Date d'expriration</p>
                                </Col>
                                
                                <Col md={2}>
                                    <p>Quantité</p>
                                </Col>
                            
                                <Col md={1}>
                                    <a
                                        href='#'
                                        onClick={this.resetFormRepeater}
                                    >
                                        <Repeat size={16} />
                                    </a>
                                </Col>
                                
                                <Col md={1}>
                                    <button
                                        className="btn btn-success"
                                        type="button"
                                        onClick={() => this.handleAddFields()}
                                    >
                                        +
                                    </button>
                                </Col>
                                
                                </div>
                            
        {products.map((inputField, index) => (
            <div className='row col-12' key={`${index}`}>
                                <Col md={5} className="pr-0">
                                    <FormGroup>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={(event) => this.setProduct(index,event)}
                                                datas={this.productsList}
                                                filter="name"
                                                name="product_id"
                                                nullable={false}
                                                defaultValue={this.getProductObject(inputField.product_id)}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={3}>
                                    <FormGroup>
                                        <div className="position-relative ">
                                            <input type="date" name="expiration_date"
                                                onInput={(event) => this.setExpirationDate(index,event)}
                                                defaultValue={this.defaults.expiration_date}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('expiration_date')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={3}>
                                    <FormGroup>
                                        <div className="position-relative ">
                                            <input type="text" name="quantity"
                                                onInput={(event) => this.setQuantity(index,event)}
                                                defaultValue={inputField.quantity}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('quantity')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                
                                <Col md={1} className="p-0">
                                    <div className="position-relative ">
                                    <button
                                        className="btn btn-danger"
                                        style={{'width' : '100%'}}
                                        type="button"
                                        onClick={() => this.handleRemoveFields(index)}
                                    >
                                        -
                                    </button>
                                    
                                    </div>
                                </Col>
                            </div>
        ))}
                                {/* <Col xl="8" lg="12" md="12" className="mt-1">
                                    <FormGroup>
                                        <Label for="iconLeft" >Valider</Label>
                                        <FormGroup check className="px-0">
                                            <Toggle checked={this.state.model.public==1}  onChange={this.setPublic} />
                                        </FormGroup>
                                    </FormGroup>
                                </Col> */}
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" className={classnames({ 'cursor-not-allowed': this.state.loading })} block>
                                <span className={classnames({ 'd-none': this.state.loading })}>Enregistrer</span>
                                <i className={classnames('fa fa-circle-o-notch', { 'fa-spin': this.state.loading, 'd-none': !this.state.loading })}></i>
                                &nbsp;
                                <span className={this.state.loading ? '': 'd-none'}>
                                    { this.state.progress } %
                                </span>
                            </Button>
                        </ModalFooter>
                    </fieldset>
                </Form>
            </Fragment>
        );
    }
}

const mapStateProps = (state) => ({
    current: state.commande.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CommandeFormComponent)
