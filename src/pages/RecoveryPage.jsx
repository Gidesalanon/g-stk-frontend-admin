// import external modules
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from "react-router-dom";
import {
    Alert,
    Row,
    Col,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody,
} from 'reactstrap';
import { Cookies } from 'react-cookie';
import { postEntity,getEntity } from '../service/api';
import { withFormHook } from '../lib/withHooks';
import Logo from '../assets/img/logo.png';

class RecoveryPage extends Component {
    cookies = new Cookies();
    state = {
        loading: false,
        error: false
    };

    getAuth(data) {
        this.setState({ loading: true });

        postEntity('auth/password/email', data)
        .then(res => {
            // window.location.pathname = '/new-password'
        }, () => {
            this.setState({ error: true });
        })
        .finally(() => this.setState({ loading: false }));
    }

    render() {
        const form = this.props.form;
        const handleSubmit = form.handleSubmit(this.getAuth.bind(this));

        return (
            <div className="container">
                <Row className="full-height-vh">
                    <Col xs="12" className="d-flex align-items-center">
                        <div className="login-header">
                            <div className="text-center py-2 py-md-4 all-width">
                                <img className="width-300" src={Logo} alt="logo" />
                                {/* <h6 className="text-light py-2 px-2 px-md-5">Bienvenu sur l'application de gestion des stock.</h6> */}
                            </div>
                        </div>
                        <Card className="bg-green login-info">
                            <CardBody>
                                <div className="text-center py-4">
                                    <h1 className="text-bold text-light">Récupération de mot de passe</h1>
                                </div>

                                <Alert color="danger"className={classnames({"d-none": !this.state.error })}>
                                    On dirait que votre compte est introuvable. Veuillez réessayer.<br/>
                                    Merci de contacter un des administrateurs de l'application si le problème persiste.
                                </Alert>

                                <Form className="pt-2 solutech" id="judicaelbdimon" onSubmit={handleSubmit} >
                                    <FormGroup>
                                        <input
                                            type="email"
                                            className={classnames("form-control", {"is-invalid": form.errors.username })}
                                            name="email"
                                            placeholder="Votre adresse email"
                                            ref={form.register({
                                                required: "Required",
                                            })}/>
                                        <div className="invalid-feedback">
                                            Veuillez saisir un email valide.
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Button type="submit" color="secondary" block className="btn-info btn-raised">
                                            <span className={classnames({'d-none': this.state.loading})}>Envoyer</span>
                                            <i className={classnames('fa fa-circle-o-notch', {'fa-spin': this.state.loading, 'd-none': !this.state.loading})}></i>
                                        </Button>
                                    </FormGroup>
                                </Form>
                                <div>
                                    <span className="text-light bottom-text"><Link href="/login">Cliquez-ici</Link> pour accéder à la page de connexion.</span>
                                </div>
                            </CardBody>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withFormHook(RecoveryPage);
