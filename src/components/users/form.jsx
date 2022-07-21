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

function reandomPassword(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const ROLES = [
    {value:'root',label:'Super Administrateur'},
    {value:'admin',label:'Modérateur'},
    {value:'data_manager',label:'Gestionnaire de Données'},
]

class PageStatiqueFormComponent extends Component {

    state = {
        model: {
            username: null,
            lastname: '',
            firstname: '',
            public: 1,
            email: '',
            password: reandomPassword(8),
            role_id: '',
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super(props);

        this.setUsername = this.setUsername.bind(this);
        this.setFirstname = this.setFirstname.bind(this);
        this.setLastname = this.setLastname.bind(this);
        this.setRoles = this.setRoles.bind(this);
        this.setParent = this.setParent.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                username: props.current.username,
                email: props.current.email || '',
                role_id: props.current.role_id || '',
                parent_id: props.current.parent_id || null,
                lastname: props.current.lastname || '',
                firstname: props.current.firstname || '',
                public: props.current.public||1,
                password: reandomPassword(8),
            }
            let model = {
                lastname: props.current.lastname || '',
                firstname: props.current.firstname,
                email: props.current.email || '',
                role_id: props.current.role_id || '',
                parent_id: props.current.parent_id || null,
                username: props.current.username || '',
                public: props.current.public||1,
                password: reandomPassword(8),
            };
            
            if (props.current.roles.length) {
                this.defaults.role = { label: ROLES.find(i => i.value === props.current.roles[0]?.id).label, value: props.current.roles[0]?.id};
            }
            if (props.current.parents) {
                this.defaults.module = { label: props.current.parents.name, value: props.current.parent_id};
            }
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
            request = putEntity('users', this.props.current.id, this.state.model)
        } else {
            request = postEntity('users', this.state.model)
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

    setUsername(e) {
        const keyValue = { username: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setParent(item) {
        const keyValue = { parent_id: item.value };
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

    setRoles(item) {
        const keyValue = { role_id: item.value };
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
                                            <input type="text" name="lastname"
                                                onInput={this.setLastname}
                                                defaultValue={this.defaults.lastname}
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
                                                defaultValue={this.defaults.firstname}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('firstname')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un prénom.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom d'utilisateur (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="username"
                                                onInput={this.setUsername}
                                                defaultValue={this.defaults.username}
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
                                            <input type="text" name="email"
                                                onInput={this.setEmail}
                                                defaultValue={this.defaults.email}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('email')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour la page.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Parent (*)</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setParent}
                                                endpoint="users"
                                                filter="username"
                                                name="parent_id"
                                                nullable={true}
                                                className={classnames({'is-invalid': this.state.formSubmitted && this.fieldInValid('parent_id')})}
                                                defaultValue={this.defaults.parents}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Rôles (*)</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setRoles}
                                                datas={ROLES}
                                                name="role"
                                                nullable={true}
                                                className={classnames({'is-invalid': this.state.formSubmitted && this.fieldInValid('role_id')})}
                                                defaultValue={this.defaults.role}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner un rôle.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            {/* <Row>
                                <Col xl="8" lg="12" md="12" className="mt-4">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Publier"
                                                defaultChecked={this.defaults.public}
                                                onChange={this.setPublic}/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row> */}
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
    current: state.user.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(PageStatiqueFormComponent)
