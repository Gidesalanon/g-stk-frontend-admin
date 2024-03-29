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
import { loadFile } from '../../service/api';

require('dotenv').config()
class EntreprisePreviewComponent extends Component {
    form = new FormData();
    state = {
        model: {
            name: null,
            fichier: null,
            presentation: null
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
                presentation: props.preview.presentation || '',
            }
            let model = {
                name: props.preview.name,
                fichier: props.preview.fichier || null,
                presentation: props.preview.presentation || '',
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
                                    <iframe className="col-12" src={loadFile(process.env.REACT_APP_SERVER_ASSET+this.state.model.fichier.filename)}></iframe>
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
                                        <Label for="iconLeft" >Présentation</Label>
                                        <div className="position-relative ">
                                            <textarea type="text" name="presentation"
                                                defaultValue={this.state.model.presentation}
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
    preview: state.entreprise.preview,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(EntreprisePreviewComponent)
