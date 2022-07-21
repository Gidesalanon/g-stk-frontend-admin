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

class CategorieProduitFormComponent extends Component {
    form = new FormData();
    state = {
        model: {
            title: null,
            fichier: null,
            public: 1,
            module_id: '',
            annee: null,
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

        this.setTitle = this.setTitle.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setAnnee = this.setAnnee.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setPublic = this.setPublic.bind(this);

        if (props.current) {
            this.defaults = {
                title: props.current.title,
                public: props.current.public,
                fichier: props.current.fichier || null,
                description: props.current.description || '',
                annee: props.current.annee || null,
                client_price: props.current.client_price || '',
                partner_price: props.current.partner_price || '',
                module_id: props.current.module_id || '',
            }
            let model = {
                title: props.current.title,
                public: props.current.public,
                fichier: props.current.fichier || null,
                module_id: props.current.module_id || '',
                client_price: props.current.client_price || '',
                partner_price: props.current.partner_price || '',
                annee: props.current.annee || null,
                description: props.current.description || '',

            };

            if (props.current.modules) {
                this.defaults.module = { label: props.current.modules.name, value: props.current.modules_id};
            }

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
            request = putEntity('categorie_produits', this.props.current.id, formBody,  {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        } else {
            request = postEntity('categorie_produits', form, config)
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
        console.log(keyValue);
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setTitle(e) {
        const keyValue = { title: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setAnnee(e) {
        const keyValue = { annee: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setModule(item) {
        const keyValue = { module_id: item.value };
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
                                            <input type="text" name="title"
                                                onInput={this.setTitle}
                                                defaultValue={this.defaults.title}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un titre pour la categorie_produit.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                              
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >PV</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="annee"
                                                onInput={this.setAnnee}
                                                defaultValue={this.defaults.annee}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('annee')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Catégorie</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setModule}
                                                endpoint="modules_all"
                                                filter="name"
                                                name="module_id"
                                                nullable={true}
                                                defaultValue={this.defaults.module}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Image mis en avant</Label>
                                        <div className="position-relative ">
                                            <CustomInput type="file" id="file"
                                                label={this.state.model.fichier ? this.state.model.fichier.name : 'Choisir un fichier'}
                                                className={classnames({'is-invalid': this.state.formSubmitted &&
                                                        this.fieldInValid('fichier')})}
                                                onChange={this.setFichier}/>
                                                {this.defaults.fichier && <img src="/default.png" className="file-preview" />}
                                            <div className="invalid-feedback">
                                                Veuillez selectionner une categorie_produit.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Prix client</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="client_price"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.client_price}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('client_price')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Prix partenaire</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="partner_price"
                                                onInput={this.setValue}
                                                defaultValue={this.defaults.client_price}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('partner_price')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir une valeur.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Description</Label>
                                        <div className="position-relative">
                                            <textarea type="text" onChange={this.setDescription} name="description" defaultValue={this.defaults.description}
                                                className={classnames('form-control')}
                                                value={this.state.model.description}
                                            ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>
                            
                                <Col xl="8" lg="12" md="12" className="mt-1">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Publier"
                                                defaultChecked={this.defaults.public}
                                                onChange={this.setPublic}/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
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
    current: state.categorie_produit.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CategorieProduitFormComponent)
