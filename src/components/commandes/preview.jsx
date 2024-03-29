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
import classnames from 'classnames';
import { loadFile,getEntity } from '../../service/api';

require('dotenv').config()
class CommandePreviewComponent extends Component {
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
        productsList: [{label:"Aucun résultat",value:""}],
        inputFields: [{ product_id: '',expiration_date: '', quantity: '' }]
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();
        this.getProductObject = this.getProductObject.bind(this);
        
        if (props.preview) {
            this.defaults = {
                public: props.preview.public,
                description: props.preview.description || '',
                products: props.preview.command_products
            }
            let model = {
                public: props.preview.public,
                description: props.preview.description || '',
                products: props.preview.command_products
            };

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false,
                inputFields: [{ product_id: '',expiration_date: '', quantity: '' }]
            };
        }
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

    componentDidMount(){
        let prods = [{label:"Aucun résultat",value:""}];
        getEntity('products_all').then(res => {
            res.data.data.map(product => {
                prods.push({label:product.name,value:product.id});
            });
            this.setState({ productsList: prods});
        });
    }

    render() {
        let products = Array.from(this.state.model.products);
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <div className="position-relative ">
                                            <textarea type="text" name="presentation"
                                                defaultValue={this.state.model.description}
                                                disabled={true}
                                                className="form-control"/>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row>
                                
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

                            </div>

                            {products.map((product, index) => (
                                <div className='row col-12' key={`${index}`}>
                                    <Col md={5} className="pr-0">
                                        <FormGroup>
                                            <div className="position-relative ">
                                                {this.getProduct(product.product_id)}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                
                                    <Col md={3}>
                                        <FormGroup>
                                            <div className="position-relative ">
                                                {product.expiration_date}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                
                                    <Col md={3}>
                                        <FormGroup>
                                            <div className="position-relative ">
                                                {product.quantity}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    
                                </div>
                            ))}
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.closePreviewModal} type="button" block>
                                <span>Fermer</span>
                            </Button>
                        </ModalFooter>
                    </fieldset>
                </Form>
            </Fragment>
        );
    }
}



const mapStateProps = (state) => ({
    preview: state.commande.preview,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CommandePreviewComponent)
