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
    Row
} from 'reactstrap';
import classnames from 'classnames';
import { getEntity, postEntity, putEntity } from '../../service/api';

const ROLES = [
    {value:'root',label:'Super Administrateur'},
    {value:'admin',label:'Administrateur'},
    {value:'data_manager',label:'Gestionnaire de Données'},
]

class UserUpdate extends Component {
    nullableFields = ['old_password','new_password', 'confirm_password'];
    state = {
        model: {
            username: null,
            lastname: '',
            firstname: '',
            public: 1,
            old_password: '',
            new_password: '',
            confirm_password: '',
            email: '',
            role_id: '',
        },
        type_menu: "info",
        loading: false,
        formSubmitted: false
    };
    constructor(props) {

        super(props);

        this.setType = this.setType.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setFirstname = this.setFirstname.bind(this);
        this.setLastname = this.setLastname.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPass = this.setPass.bind(this);
        this.setCpass = this.setCpass.bind(this);
        this.setOldPass = this.setOldPass.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
    }
    loadData(){
        getEntity('auth/me').then(res => {
            // console.log({ label: ROLES.find(i => i.value === res.data.data.roles[0]?.id).label, value: res.data.data.roles[0]?.id},res.data.data.roles);
            
            let model = {
                id: res.data.data.id,
                username: res.data.data.username,
                lastname: res.data.data.lastname,
                firstname: res.data.data.firstname,
                email: res.data.data.email,
                role_id: res.data.data.role_id,
                // role: { label: ROLES.find(i => i.value === res.data.data.roles[0]?.id).label, value: res.data.data.roles[0]?.id},
                public: 1,
            };

            this.setState({
            model: model,
            formSubmitted: false,
            loading: false
            });
        }).catch(res=>{
            // this.setState({loading:false})
        })
    }

    componentWillMount = () => {
        this.loadData();
    }

    onSubmit(e) {
        let request = null;
        e.preventDefault();
        this.setState({ formSubmitted: true });
        // if (this.formHasErrors()) {
        //     return;
        // }

        this.setState({ loading: true });

        if(this.state.type_menu === 'info') request = putEntity('users', this.state.model.id, this.state.model)
        else if(this.state.type_menu === 'pass') request = postEntity('changePassword', this.state.model)

        request.then(() => {
            this.loadData();
            this.props.successEdit(true);
        }, () => {
            this.props.successEdit(false);
        }).finally(() => {
            this.loadData();
            this.setState({ loading: false });
        });
    }

    setType(type_menu) {
    
        this.setState({type_menu})
        // const keyValue = { type: e.target.value };
        // this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setUsername(e) {
        const keyValue = { username: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setFirstname(e) {
        const keyValue = { firstname: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setEmail(e) {
        const keyValue = { email: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setLastname(e) {
        const keyValue = { lastname: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setCpass(e) {
        const keyValue = { confirm_password: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPass(e) {
        const keyValue = { new_password: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setOldPass(e) {
        const keyValue = { old_password: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPublic(event) {
        const keyValue = { public: (!this.state.model.accueil) ? 1 : 0 };
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
        const {type_menu} = this.state;
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md={12} className="mt-4">
                                    <FormGroup>
                                        <div className="switch-field">
                                            <input type="radio" onChange={(event)=>this.setType(event.target.value)} id="radio-four" name="type" value="info" checked={type_menu==="info"} />
                                            <label htmlFor="radio-four">Informations</label>
                                            <input type="radio" onChange={(event)=>this.setType(event.target.value)} id="radio-three" name="type" value="pass" checked={type_menu==="pass"} />
                                            <label htmlFor="radio-three">Mot de passe</label>
                                            
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {type_menu==='info'&&
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="lastname"
                                                onInput={this.setLastname}
                                                defaultValue={this.state.model.lastname}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('lastname')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Prénoms (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="firstname"
                                                onInput={this.setFirstname}
                                                defaultValue={this.state.model.firstname}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('firstname')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un prénom.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom d'utilisateur (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="username"
                                                onInput={this.setUsername}
                                                defaultValue={this.state.model.username}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('username')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom d'utilisateur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Email (*)</Label>
                                        <div className="position-relative ">
                                            <input type="email" name="email"
                                                onInput={this.setEmail}
                                                defaultValue={this.state.model.email}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('email')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour la page.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row> }
                            {type_menu==='pass'&&
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Ancien mot de passe</Label>
                                        <div className="position-relative ">
                                            <input type="password" name="pass"
                                                onInput={this.setOldPass}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('pass')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom d'utilisateur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nouveau mot de passe</Label>
                                        <div className="position-relative ">
                                            <input type="password" name="pass"
                                                onInput={this.setPass}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('pass')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom d'utilisateur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Confirmer le mot de passe</Label>
                                        <div className="position-relative ">
                                            <input type="password" name="cpass"
                                                onInput={this.setCpass}
                                                defaultValue={this.state.model.cpass}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('cpass')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour la page.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>}
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

export default UserUpdate
