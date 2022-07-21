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
import SelectComponent from "../select";
import { postEntity, putEntity } from '../../service/api';

class ApplicationStatiqueFormComponent extends Component {
    state = {
        model: {
            name: null,
            redirect: '',
            revoked: false,
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [''];
    constructor(props) {
        super();
        
        this.setName = this.setName.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.setRevoked = this.setRevoked.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                name: props.current.name,
                revoked: props.current.revoked,
            }
            let image = props.current.fichier;
            let model = {
                name: props.current.name,
                revoked: props.current.revoked,
            };

            if (props.current.type) {
                this.defaults.module = { label: props.current.module.name, value: props.current.module.id};
                model.type = props.current.module.id;
            }

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false,
            };
        }
    }

    onSubmit(e) {
        let request = null;
        e.preventDefault();

        this.setState({ formSubmitted: true });

        // if (this.formHasErrors()) {
        //     return;
        // }

    console.log(this.state.model);

        this.setState({ loading: true });

        if (this.props.current?.id) {
            request = putEntity('applications', this.props.current.id, this.state.model)
        } else {
            request = postEntity('applications', this.state.model)
        }
    console.log(request);
request.catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
        request.then(() => {
            this.props.onRequestSent(true);
            this.props.reloadDataAfterEvent('added');
        }, () => {
            this.props.onRequestSent(false);
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    setName(e) {
        const keyValue = { name: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setRedirect(e) {
        const keyValue = { redirect: e.target.value};
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setRevoked(event) {
        const keyValue = { revoked: (!this.state.model.accueil) ? 1 : 0 };
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

    handleImageChange(event) {
        // const file = event.target.files[0];
        // this.form.append('fichier', file);

        // postEntity('fichiers', form, {
        //     'Content-Type': 'multipart/form-data'
        // }).then((response) => {
        //     const image = response.data.data;
        //     this.setState({ image });
        //     this.setFichier(image.id);
        // });
    }

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md="12" >
                                    <FormGroup>
                                        <Label for="iconLeft" >Titre (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="name"
                                                onInput={this.setName}
                                                defaultValue={this.defaults.name}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('name')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un titre pour l'application.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
							</Row>
                            <Row>
                                <Col md="12" >
                                    <FormGroup>
                                        <Label for="iconLeft" >Lien de redirection (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="redirect"
                                                onInput={this.setRedirect}
                                                defaultValue={this.state.model.redirect}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('redirect')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour lapplication.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                                                        
                            <Row>
                                <Col md="12" className="mt-4">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Revoquer l'application "
                                                defaultChecked={this.defaults.revoked}
                                                onChange={this.setRevoked}/>
                                        </FormGroup>
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
    current: state.application.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ApplicationStatiqueFormComponent)
