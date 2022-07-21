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

class WeblinkFormComponent extends Component {
    state = {
        model: {
            name: null,
            access_link: null,
            public: 1,
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super(props);

        this.setName = this.setName.bind(this);
        this.setAccessLink = this.setAccessLink.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setIframe = this.setIframe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        if (props.current) {
            this.defaults = {
                name: props.current.name,
                access_link: props.current.access_link || null,
                public: props.current.public,
            }
            let model = {
                name: props.current.name,
                access_link: props.current.access_link || null,
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
            request = putEntity('weblinks', this.props.current.id, this.state.model)
        } else {
            request = postEntity('weblinks', this.state.model)
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

    setPublic(event) {
        const keyValue = { public: (!this.state.model.public) ? 0 : 1 };
        this.setState({ model: { ...this.state.model, ...keyValue } });
    }

    setIframe(event) {
        const keyValue = { iframe: (!this.state.model.iframe) ? 0 : 1 };
        this.setState({ model: { ...this.state.model, ...keyValue } });
    }

    setAccessLink(e) {
        const keyValue = { access_link: e.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setModule(item) {
        const keyValue = { module_id: item.value };
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
                                        <Label for="iconLeft" >Nom (*)</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="name"
                                                onInput={this.setName}
                                                defaultValue={this.defaults.name}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('name')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >Lien d'accès (*)</Label>
                                        <div className="position-relative ">
                                            <input type="url" name="access_link"
                                                onInput={this.setAccessLink}
                                                defaultValue={this.defaults.access_link}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('access_link')})}/>
                                            <div className="invalid-feedback">
                                                Veuillez saisir un autre.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Rendre public"
                                                defaultChecked={this.defaults.public}
                                                onChange={this.setPublic} />
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                {/* <Col md="6">
                                    <FormGroup>
                                        <FormGroup check className="px-0">
                                            <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Embarquer sur le site"
                                                defaultChecked={this.defaults.iframe}
                                                onChange={this.setIframe} />
                                        </FormGroup>
                                    </FormGroup>
                                </Col> */}
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
    current: state.weblink.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(WeblinkFormComponent)
