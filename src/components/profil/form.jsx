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
import TextEditor from '../editorJodit';
import { postEntity, putEntity } from '../../service/api';

class ProfilFormComponent extends Component {
    state = {
        model: {
            title: null,
            content: '',
            public: false,
            permalink: '',
            user_id: '',
            module_id: '',
            user_id: 1
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();

        this.setTitle = this.setTitle.bind(this);
        this.setPermalink = this.setPermalink.bind(this);
        this.setContent = this.setContent.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setModule = this.setModule.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                title: props.current.title,
                permalink: props.current.permalink || '',
                user_id: 1,
                module_id: props.current.module_id || '',
                content: props.current.content || '',
                public: props.current.public,
            }
            let model = {
                title: props.current.title,
                permalink: props.current.permalink || '',
                user_id: 1,
                module_id: props.current.module_id || '',
                content: props.current.content || '',
                public: props.current.public,
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
            request = putEntity('pages', this.props.current.id, this.state.model)
        } else {
            request = postEntity('pages', this.state.model)
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

    setModule(item) {
        const keyValue = { module_id: item.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setContent(value) {
        const keyValue = { content: value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setPermalink(e) {
        const keyValue = { permalink: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }


    setPublic(event) {
        const keyValue = { public: (!this.state.model.public) ? 0 : 1 };
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
                                                Veuillez saisir un titre pour la page.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Permalien (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="permalink"
                                                onInput={this.setPermalink}
                                                defaultValue={this.defaults.permalink}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('permalink')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un permalien pour la page.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Module</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setModule}
                                                endpoint="modules"
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
                                        <Label for="text" >Contenu de la page</Label>
                                        <div className="position-relative ">
                                            <TextEditor defaultValue={this.defaults.content} setValue={this.setContent} />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="8" lg="12" md="12" className="mt-4">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Afficher sur le site"
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
                            </Button>
                        </ModalFooter>
                    </fieldset>
                </Form>
            </Fragment>
        );
    }
}



const mapStateProps = (state) => ({
    current: state.page.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ProfilFormComponent)
