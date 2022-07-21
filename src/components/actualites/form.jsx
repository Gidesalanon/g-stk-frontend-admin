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
import EditorJodit from '../editorJodit';

class ActualiteStatiqueFormComponent extends Component {
    state = {
        model: {
            title: null,
            content: '',
            permalink:'',
            public: 0,
            isFlashinfo: 0,
            in_slider: 0,
            module_id: '',
            type: 'nouvelle',
            fichier_id: null,
        },
        image: null,
        communique: false,
        nouvelle: true,
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = ['fichier'];
    constructor(props) {
        super();
        
        this.setTitle = this.setTitle.bind(this);
        this.setPermalink = this.setPermalink.bind(this);
        this.setType = this.setType.bind(this);
        this.setContent = this.setContent.bind(this);
        this.setWelcomepage = this.setWelcomepage.bind(this);
        this.setInSlider = this.setInSlider.bind(this);
        this.setFichier = this.setFichier.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setModule = this.setModule.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                title: props.current.title,
                content: props.current.content || '',
                permalink: props.current.permalink || '',
                module_id: props.current.module_id || '',
                type: props.current.type || 'nouvelle',
                public: props.current.public,
                isFlashinfo: props.current.isFlashinfo,
                in_slider: props.current.in_slider,
            }
            let image = props.current.fichier;
            let model = {
                title: props.current.title,
                permalink: props.current.permalink || '',
                content: props.current.content || '',
                public: props.current.public,
                isFlashinfo: props.current.isFlashinfo,
                in_slider: props.current.in_slider,
                module_id: props.current.module_id || '',
                type: props.current.type || 'nouvelle',
                fichier_id: image?.id
            };

            if (props.current.modules) {
                this.defaults.module = { label: props.current.modules.name, value: props.current.modules.id};
                model.module_id = props.current.modules.id;
            }

            this.state = {
                model: model,
                communique: false,
                nouvelle: true,
                formSubmitted: false,
                loading: false,
                image
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
            request = putEntity('news', this.props.current.id, formBody,  {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        } else {
            request = postEntity('news', form, config)
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
        // this.setState({ model: { ...this.state.model, ...keyValue }});
        this.setPermalink(e.target.value);
    }

    setModule(item) {
        const keyValue = { module_id: item.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setType(e) {
        const keyValue = { type: e };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setContent(value) {
        const keyValue = { content: value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPermalink(e) {
        const keyValue = { title: e, permalink: e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w ]+/g,'').replace(/ +/g,'-') };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPublic(event) {
        const keyValue = { public: (!this.state.model.public) ? 1 : 0 };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setWelcomepage(event) {
        const keyValue = { isFlashinfo: (!this.state.model.isFlashinfo) ? 1 : 0 };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setInSlider(event) {
        const keyValue = { in_slider: (!this.state.model.in_slider) ? 1 : 0 };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setFichier(event) {
        const file = event.target.files[0];
        const keyValue = { fichier: file };
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
                                        <Label for="iconLeft" >Titre (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="title"
                                                onInput={this.setTitle}
                                                defaultValue={this.defaults.title}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un titre pour l'actualité.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Permalien (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="permalink"
                                                disabled={true}
                                                value={this.state.model.permalink}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('permalink')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour l'actualité.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Module</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setModule}
                                                endpoint="modules_all?type_module=news"
                                                filter="name"
                                                name="module_id"
                                                nullable={false}
                                                defaultValue={this.defaults.module}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner un module.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Image de couverture</Label>
                                        <div className="position-relative ">
                                            <CustomInput type="file" id="file"
                                                accept="image/*"
                                                label={this.state.model.fichier ? this.state.model.fichier.name : 'Choisir un fichier'}
                                                className={classnames({'is-invalid': this.state.formSubmitted &&
                                                        this.fieldInValid('fichier')})}
                                                onChange={this.setFichier}/>

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
                                        <Label for="text" >Contenu de l'actualité</Label>
                                        <div className="position-relative ">
                                            <EditorJodit
                                             defaultValue={this.state.model.content}
                                             setValue={this.setContent}
                                            />
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
                                
                                <Col md="4">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="isFlashinfo" label="Flash info"
                                                defaultChecked={this.defaults.isFlashinfo}
                                                onChange={this.setWelcomepage}/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>

                                <Col md="4">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="in_slider" label="Sur un Slider"
                                                defaultChecked={this.defaults.in_slider}
                                                onChange={this.setInSlider}/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="mt-4">
                                    <FormGroup>
                                        <div className="switch-field">
                                            <input type="radio" onChange={() => this.setType('nouvelle')} id="radio-three" checked={this.state.model.type=="nouvelle"} />
                                            <label htmlFor="radio-three">Actualité</label>
                                            <input type="radio" onChange={() => this.setType('communique')} id="radio-four" checked={this.state.model.type=="communique"} />
                                            <label htmlFor="radio-four">Publication</label>
                                        </div>
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
    current: state.actualite.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ActualiteStatiqueFormComponent)
