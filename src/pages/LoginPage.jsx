// import external modules
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';
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
import Logo from '../assets/img/logo-large.png';
import '../assets/css/login.css';

var md5 = require('md5');

class LoginPage extends Component {
    cookies = new Cookies();
    state = {
        loading: false,
        error: false
    };

    getAuth(data) {
        this.setState({ loading: true });

        postEntity('auth/login', data)
        .then(res => {
            if(res){
                console.log(res,'DIMON');
                let tokenExpire = res.data['expires_at'];
                let token = res.data['accessToken'];
                let tokenType = res.data['token_type'];

                this.cookies.set('token', token, [{ path: '/' }]);
                this.cookies.set('tokenExpire', tokenExpire, [{ path: '/' }]);
                this.cookies.set('tokenType', tokenType, [{ path: '/' }]);
                
                if(res.data.user_data){
                    this.cookies.set('username', res.data.user_data.username);
                    if(res.data.user_data.roles[0]) 
                    this.cookies.set('userRole', md5(res.data.user_data.roles[0].name));
                }

                window.location.pathname = '/'
            }
            else {
                this.setState({ loading: false });
                this.setState({ error: true }); 
            }
        }, () => {
            this.setState({ error: true });
        })
        .finally(() => this.setState({ loading: false }));
    }

    render() {
        const form = this.props.form;
        const handleSubmit = form.handleSubmit(this.getAuth.bind(this));

        return (
            <div className="login-wrapper">
                <style dangerouslySetInnerHTML={{__html: ' html { overflow: hidden; } /*By DIMON to fix main wrapper on top*/ main {margin-top:0 !important;} '}}></style>
                <div className="login-container">
                    <div className="sign-in-container">
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <h1 className="mb-1">Se connecter</h1>
                    
                            <Alert color="danger"className={classnames({"d-none": !this.state.error })}>
                                Nom d'utilisateur ou mot de passe incorrrect. Veuillez réessayer.
                            </Alert>

                            <input type="text"
                                className={classnames("form-control", "py-3", "bg-fafafa", {"is-invalid": form.errors.email })}
                                name="username"
                                placeholder="Nom d'utilisateur"
                                ref={form.register({
                                    required: "Required",
                                })} />
                            <input type="password"
                                className={classnames("form-control", "py-3", "bg-fafafa", {"is-invalid": form.errors.email })}
                                name="password"
                                id="password"
                                placeholder="Mot de passe"
                                ref={form.register({ required: true })} />
                            <button type="submit" className="login-button login-form-btn">
                                <span>Se connecter </span>
                                <i className={classnames('fa fa-circle-o-notch', {'fa-spin': this.state.loading, 'd-none': !this.state.loading})}></i>
                            </button>
                            <span>Mot de passe oublié ? Si oui, <Link to="/recovery-password">cliquez-ici</Link>.</span>
                            <div className="social-links">
                                {/* <div>
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                </div>
                                <div>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                </div>
                                <div>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                </div> */}
                            </div>
                        </Form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay-right">
                        <img src={Logo} alt="Organe de controle" className="mx-auto d-block" style={{height:'50px'}} />
                        <h2>Bienvenue</h2>
                        <p className="text-center">Saisissez vos données personnelles pour avoir accès aux donnèes privilèges</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFormHook(LoginPage);
