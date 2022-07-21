import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import {
    Button,
    Col,
    Form,
    Label,
    ModalBody,
    ModalFooter,
    Row,
} from 'reactstrap';

require('dotenv').config()
class ApplicationPreviewComponent extends Component {
    
    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            
                            <Row>
                                <Col md={6}>
                                    <Label for="iconLeft" >Nom</Label>
                                </Col>
                                <Col md={6}>
                                    <Label for="iconLeft" >{this.props.name}</Label>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col md={6}>
                                    <Label for="iconLeft" >Redirection</Label>
                                </Col>
                                <Col md={6}>
                                    <Label for="iconLeft" >{this.props.redirect}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Label for="iconLeft" >Mot de passe client</Label>
                                </Col>
                                <Col md={6}>
                                    <Label for="iconLeft" >{this.props.secret}</Label>
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
    preview: state.application.preview,
}) 

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ApplicationPreviewComponent)
