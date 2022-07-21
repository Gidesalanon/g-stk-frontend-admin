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
class CampagnePreviewComponent extends Component {
    form = new FormData();
    state = {
        model: {
            title: null,
            fichier: null,
            module_id: '',
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
                title: props.preview.title,
                fichier: props.preview.fichier || null,
                module_id: props.preview.module_id || '',
            }
            let model = {
                title: props.preview.title,
                fichier: props.preview.fichier || null,
                module_id: props.preview.module_id || '',
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
                                    <iframe className="col-12" src={process.env.REACT_APP_SERVER_ASSET+this.defaults.fichier.filename}></iframe>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >URL</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="title"
                                                defaultValue={process.env.REACT_APP_SERVER_ASSET+this.defaults.fichier.filename}
                                                disabled={true}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
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
    preview: state.campagne.preview,
}) 

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CampagnePreviewComponent)
