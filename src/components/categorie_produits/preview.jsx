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

require('dotenv').config()
class CategorieProduitPreviewComponent extends Component {
    form = new FormData();
    state = {
        model: {
            name: null,
            fichier: null,
            description: null
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();

        if (props.preview) {
            this.defaults = {
                name: props.preview.name,
                fichier: props.preview.fichier || null,
                description: props.preview.description || '',
            }
            let model = {
                name: props.preview.name,
                fichier: props.preview.fichier || null,
                description: props.preview.description || '',
            };

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false
            };
        }
    }

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <iframe className="col-12" src={process.env.REACT_APP_SERVER_ASSET+this.state.model.fichier.filename}></iframe>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="name"
                                                defaultValue={this.state.model.name}
                                                disabled={true}
                                                className="form-control"/>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Description</Label>
                                        <div className="position-relative ">
                                            <textarea type="text" name="description"
                                                defaultValue={this.state.model.description}
                                                disabled={true}
                                                className="form-control"/>
                                        </div>
                                    </FormGroup>
                                </Col>
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
    preview: state.categorie_produit.preview,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CategorieProduitPreviewComponent)
