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

class ClientFormComponent extends Component {
    form = new FormData();
    state = {
        model: {
            public: 1,
            description: ''
        },
        progress: 0,
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();

        this.setValue = this.setValue.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setPublic = this.setPublic.bind(this);

        if (props.current) {
            this.defaults = {
                lastname: props.current.lastname,
                firstname: props.current.firstname,
                address: props.current.address,
                ifu: props.current.ifu,
                public: props.current.public,
                email: props.current.email,
                phone: props.current.phone,
                description: props.current.description || '',
            }
            let model = {
                firstname: props.current.firstname,
                lastname: props.current.lastname,
                address: props.current.address,
                ifu: props.current.ifu,
                email: props.current.email,
                public: props.current.public,
                phone: props.current.phone,
                description: props.current.description || '',

            };

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false
            };
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let request = null;
        const config = {
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.setState({ progress: percentCompleted });
            },
            headers: { 'Content-Type': 'multipart/form-data' }
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
            request = putEntity('clients', this.props.current.id, formBody,  {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        } else {
            request = postEntity('clients', form, config)
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

    setValue(e) {
        const field = e.target.name;
        const keyValue = { [field]: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setTitle(e) {
        const keyValue = { name: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setDescription(event) {
        this.setState({ model: { ...this.state.model, description: event.target.value }});
    }

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

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                            <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="firstname"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.firstname}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('firstname')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Prénom (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="lastname"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.lastname}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('lastname')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Email</Label>
                                        <div className="position-relative ">
                                            <input type="email" name="email"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.email}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('email')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Téléphone</Label>
                                        <div className="position-relative ">
                                            <input type="tel" name="phone"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.phone}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('phone')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >IFU</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="ifu"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.ifu}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('ifu')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Adresse</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="address"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.address}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('address')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Commentaire</Label>
                                        <div className="position-relative">
                                            <textarea type="text" onChange={this.setDescription} name="description" defaultValue={this.defaults.description}
                                                className={classnames('form-control')}
                                                value={this.state.model.description}
                                            ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                {/* <Col xl="8" lg="12" md="12" className="mt-1">
                                    <FormGroup>
                                        <Label for="iconLeft" >Publier</Label>
                                        <FormGroup check className="px-0">
                                            <Toggle checked={this.state.model.public}  onChange={this.setPublic} />
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
    current: state.client.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ClientFormComponent)
