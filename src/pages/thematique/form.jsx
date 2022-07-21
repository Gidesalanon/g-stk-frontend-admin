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
} from 'reactstrap';
import classnames from 'classnames';

import SelectComponent from '../select';
import { postEntity, putEntity } from '../../service/api';
import { withFormHook } from '../../lib/withHooks';

class ThematiqueFormComponent extends Component {
    state = {
        model: {
            nom: null,
            organisation_id: null,
        },
        formSubmitted: false,
        loading: false,
        progress: 0
    };
    defaults = {};
    years = [];

    constructor(props) {
        super();

        this.setNom = this.setNom.bind(this);
        this.setOrganisation = this.setOrganisation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (props.current) {
            this.defaults = {
                nom: props.current.nom,
                organisation: { label: props.current.organisation?.name, value: props.current.organisation?.id},
            }

            this.state = {
                model: {
                    nom: props.current.nom,
                    organisation_id: props.current.organisation?.id,
                },
                formSubmitted: false,
                loading: false
            };
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let request = null;

        this.setState({ formSubmitted: true });

        if (this.formHasErrors()) {
            return;
        }

        this.setState({ loading: true });

        if (this.props.current?.id) {
            request = putEntity('documentations', this.props.current.id, this.state.model)
        } else {
            request = postEntity('documentations', this.state.model)
        }

        request
        .then(res => {
            this.props.onRequestSent(true);
            this.props.reloadDataAfterEvent('added');
        }).catch(res => {
            this.props.onRequestSent();
        }).finally(() => this.setState({ loading: false }));
    }

    setNom(event) {
        const keyValue = { nom: event.target.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    setOrganisation(item) {
        const keyValue = { organisation_id: item.value };
        this.setState({ model: { ...this.state.model, ...keyValue }});
    }

    fieldInValid(field) {
        return this.state.model[field] === undefined || this.state.model[field] === null;
    }

    formHasErrors() {
        for (let k in this.state.model) {
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
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Nom (*)</Label>
                                        <div className="position-relative">
                                            <input type="text" onInput={this.setNom} name="nom" defaultValue={this.defaults.nom}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('nom')})}
                                            />
                                            <div className="invalid-feedback">
                                                Veuillez saisir un nom pour la thematique.
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="iconLeft" >Organisation (*)</Label>
                                        <div className="position-relative ">
                                            <SelectComponent setValue={this.setOrganisation}
                                                endpoint="organisations"
                                                filter="name"
                                                name="organisation_id"
                                                defaultValue={this.defaults.organisation}
                                                className={classnames({'is-invalid': this.state.formSubmitted && this.fieldInValid('organisation_id')})}
                                            />

                                            <div className="invalid-feedback">
                                                Veuillez selectionner une thématique.
                                            </div>
                                        </div>
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
    current: state.thematique.current,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(
    withFormHook(ThematiqueFormComponent)
)
