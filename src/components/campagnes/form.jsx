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

const TYPE_CAMPAGNE = [
    {value:'realise',label:'Réalisé'},
    {value:'prevision',label:'Prévision'},
];

const TYPE_PRODUCTION = [
    {value:'animal',label:'Animal'},
    {value:'vegetal',label:'Végétal'},
    {value:'halieutique',label:'Halieutique'},
];

class CampagneFormComponent extends Component {
    form = new FormData();
    state = {
        model: {
            name: '',
            fichier: null,
            type_campagne: '',
            type_production: '',
            yearbegin: '',
            yearend: '',
            public: 1,
        },
        progress: 0,
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {
console.log(props);
        super();

        this.setName = this.setName.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setCampagne = this.setCampagne.bind(this);
        this.setYearbegin = this.setYearbegin.bind(this);
        this.setYearend = this.setYearend.bind(this);
        this.setProduction = this.setProduction.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                name: props.current.name,
                public: props.current.public,
                fichier: props.current.fichier || null,
                yearend: props.current.yearend || '',
                yearbegin: props.current.yearbegin || '',
                type_production: props.current.type_production || '',
                type_campagne: props.current.type_campagne || '',
            }
            let model = {
                name: props.current.name,
                public: props.current.public,
                fichier: props.current.fichier || null,
                type_campagne: props.current.type_campagne || '',
                type_production: props.current.type_production || '',
                yearbegin: props.current.yearbegin || '',
                yearend: props.current.yearend || '',

            };

            if (props.current.type_campagne) {
                this.defaults.type_campagne = { label: TYPE_CAMPAGNE.find(i => i.value === props.current.type_campagne)?.label, value: props.current.type_campagne};
            }
            if (props.current.type_production) {
                this.defaults.type_production = { label: TYPE_PRODUCTION.find(i => i.value === props.current.type_production)?.label, value: props.current.type_production};
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

            var encodedKey = encodeURIComponent(k);
            var encodedValue = encodeURIComponent(this.state.model[k]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        this.setState({ loading: true });
        if (this.props.current?.id) {
            request = putEntity('campagnes', this.props.current.id, form, config)
        } else {
            request = postEntity('campagnes', form, config)
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

    setName(e) {
        const keyValue = { name: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setProduction(item) {
        const keyValue = { type_production: item.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setCampagne(item) {
        const keyValue = { type_campagne: item.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setYearend(event) {
        this.setState({ model: { ...this.state.model, yearend: event.target.value }});
    }

    setYearbegin(event) {
        this.setState({ model: { ...this.state.model, yearbegin: event.target.value }});
    }

    setFichier(event) {
        const file = event.target.files[0];
        this.form.append('fichier', file);
        const keyValue = { fichier: file };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPublic(event) {
        const keyValue = { public: (!this.state.model.public) ? 0 : 1 };
        this.setState({ model: { ...this.state.model, ...keyValue } });
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
                                            <input type="text" name="name"
                                                onInput={this.setName}
                                                defaultValue={this.defaults.name}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('name')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom pour la campagne.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Fichier de la campagne</Label>
                                        <div className="position-relative ">
                                            <CustomInput type="file" id="file"
                                                label={this.state.model.fichier ? this.state.model.fichier.name : 'Choisir un fichier'}
                                                className={classnames({'is-invalid': this.state.formSubmitted &&
                                                        this.fieldInValid('fichier')})}
                                                onChange={this.setFichier}/>

                                            <div className="invalid-feedback">
                                                Veuillez selectionner une campagne.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Année de démarrage (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="yearbegin"
                                                onInput={this.setYearbegin}
                                                defaultValue={this.defaults.yearbegin}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('yearbegin')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir l'anné de début de la campagne.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Année de fin (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="yearend"
                                                onInput={this.setYearend}
                                                defaultValue={this.defaults.yearend}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('yearend')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir l'anné de fin de la campagne.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Type de campagne (*)</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setCampagne}
                                                datas={TYPE_CAMPAGNE}
                                                name="type_campagne"
                                                nullable={true}
                                                className={classnames({'is-invalid': this.state.formSubmitted && this.fieldInValid('type_campagne')})}
                                                defaultValue={this.defaults.type_campagne}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner un type de campagne.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Type de production (*)</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setProduction}
                                                datas={TYPE_PRODUCTION}
                                                name="type_production"
                                                nullable={true}
                                                className={classnames({'is-invalid': this.state.formSubmitted && this.fieldInValid('type_production')})}
                                                defaultValue={this.defaults.type_production}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner un type de production.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row className="mt-4">
                                <Col md="4" >
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
    current: state.campagne.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(CampagneFormComponent)
