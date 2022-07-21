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
import { toastr } from 'react-redux-toastr';

class MediaFormComponent extends Component {
    state = {
        model: {
            title: null,
            fichier: null,
            public: 1,
            module_id: '',
            description: ''
        },
        progress: 0,
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = ["title"];
    constructor(props) {

        super();

        this.setTitle = this.setTitle.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                title: props.current.title,
                fichier: props.current.fichier || null,
                description: props.current.description || '',
                module_id: props.current.module_id || '',
                public: props.current.public || 0,
            }
            let model = {
                title: props.current.title,
                fichier: props.current.fichier || null,
                module_id: props.current.module_id || '',
                description: props.current.description || '',
                public: props.current.public || 0,
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
        
        const config = {
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.setState({ progress: percentCompleted });
            },
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        this.setState({ formSubmitted: true });

        if (this.formHasErrors()) {
            return;
        }
        
        var formBody = [];
        var files = this.state.model.fichier;
        
        this.setState({ loading: true },()=>{
        
        });
        if(files !== null){
            for(let i=files.length; i > 0; i--){
                let result = [];
                let request = null;
                const form = new FormData();
                for (let k in this.state.model) {
                    if (k == 'fichier') continue;
                    form.append(k, this.state.model[k]);
                    var encodedKey = encodeURIComponent(k);
                    var encodedValue = encodeURIComponent(this.state.model[k]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }

                form.append('fichier', files[i-1]);

                if (this.props.current?.id) {
                    request = putEntity('medias', this.props.current.id, form, config);
                } else {
                    request = postEntity('medias', form, config);
                }

                if(i>1){
                    request.then(() => {
                        result[i] = true;
                    }, () => {
                        if(!result[i]) result[i] = false;
                        toastr.error('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
                    }).catch(function (error) {
                        if (error.response) {
                        // Request made and server responded
                        console.log("response data",error.response.data);
                        console.log("response status",error.response.status);
                        console.log("response headers",error.response.headers);
                        } else if (error.request) {
                        // The request was made but no response was received
                        console.log('request',error.request);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        }
                    });
                }
                else{
                    request.then(() => {
                        result[i] = true;
                        
                        for (let r in result) {
                            this.props.onRequestSent(r);
                        }
                        this.props.reloadDataAfterEvent('added');
                    }, () => {
                        if(!result[i]) result[i] = false;
                        
                        toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
                        for (let r in result) {
                            this.props.onRequestSent(r);
                        }
                        this.props.onRequestSent(false);
                    }).catch(function (error) {
                        if (error.response) {
                        // Request made and server responded
                        console.log("response data: ",error.response.data);
                        console.log("response status: ",error.response.status);
                        console.log("response headers: ",error.response.headers);
                        } else if (error.request) {
                        // The request was made but no response was received
                        console.log('request error: ',error.request);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error: ', error.message);
                        }
                    }).finally(() => {
                        this.setState({ loading: false });
                    });

                }
            }
        }
        else {toastr.warning('Informations !','Choisissez au moins une images', { position: 'top-center'});}
    }

    setTitle(e) {
        const keyValue = { title: e.target.value };
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
        const file = event.target.files;
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
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Module</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setModule}
                                                endpoint="modules_all?type_module=medias"
                                                filter="name"
                                                name="module_id"
                                                nullable={true}
                                                defaultValue={this.defaults.module}
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez selectionner un module.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Fichier</Label>
                                        <div className="position-relative ">
                                            <CustomInput type="file" id="file"
                                                multiple={true}
                                                label={this.state.model.fichier ? this.state.model.fichier.name : 'Choisir fichier(s)'}
                                                className={classnames({'is-invalid': this.state.formSubmitted &&
                                                        this.fieldInValid('fichier')})}
                                                onChange={this.setFichier}/>
                                                {this.defaults.fichier && <img src={this.defaults.fichier.filename} className="file-preview" />}
                                            <div className="invalid-feedback">
                                                Veuillez selectionner un fichier.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                             <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Texte alternatif</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="title"
                                                onInput={this.setTitle}
                                                defaultValue={this.defaults.title}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un texte alternatif pour le média.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Description</Label>
                                        <div className="position-relative">
                                            <textarea type="text" onChange={this.setDescription} name="description" defaultValue={this.defaults.Description}
                                                className={classnames('form-control')}
                                                value={this.state.model.description}
                                            ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
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
    current: state.media.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(MediaFormComponent)
