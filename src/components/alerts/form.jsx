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
import { postEntity, putEntity } from '../../service/api';

class AlertFormComponent extends Component {
    state = {
        model: {
            title: null,
            email: null,
            other: null,
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super(props);

        this.setTitle = this.setTitle.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setOther = this.setOther.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        if (props.current) {
            this.defaults = {
                other: props.current.other,
                title: props.current.title,
                email: props.current.email,
            }
            let model = {
                title: props.current.title,
                email: props.current.email,
                other: props.current.other,
            };

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false
            };
        }
    }

    onSubmit(e) {
        let request = null;
        e.preventDefault();

        this.setState({ formSubmitted: true });

        if (this.formHasErrors()) {
            return;
        }

        this.setState({ loading: true });
        if (this.props.current?.id) {
            request = putEntity('subjects', this.props.current.id, this.state.model)
        } else {
            request = postEntity('subjects', this.state.model)
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

    setTitle(e) {
        const keyValue = { title: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setEmail(e) {
        const keyValue = { email: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setOther(e) {
        const keyValue = { other: e.target.value };
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

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Titre (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="title"
                                                onInput={this.setTitle}
                                                defaultValue={this.defaults.title}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Email (*)</Label>
                                        <div className="position-relative ">
                                            <input type="email" 
                                                name="email"
                                                placeholder="username@domain.ext"
                                                onInput={this.setEmail}
                                                defaultValue={this.defaults.email}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('email')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un email.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Détails (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="other"
                                                onInput={this.setOther}
                                                defaultValue={this.defaults.other}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un autre.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" className={classnames({ 'cursor-not-allowed': this.state.loading })} block>
                                <span className={classnames({ 'd-none': this.state.loading })}>Enregistrer</span>
                                <i className={classnames('fa fa-circle-o-notch', { 'fa-spin': this.state.loading, 'd-none': !this.state.loading })}></i>
                            </Button>
                        </ModalFooter>
                    </fieldset>
                </Form>
            </Fragment>
        );
    }
}

const mapStateProps = (state) => ({
    current: state.alert.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(AlertFormComponent)
