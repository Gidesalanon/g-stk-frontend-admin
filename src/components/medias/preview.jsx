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
    Badge
} from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios';

require('dotenv').config()
class MediaPreviewComponent extends Component {
    form = new FormData();
    state = {
        model: {
            title: null,
            fichier: null,
            module_id: '',
        },
        loading: false,
        formSubmitted: false
    };
    defaults = {};
    nullableFields = [];
    constructor(props) {

        super();

        if (props.preview) {
            this.defaults = {
                public: props.preview.public,
                modules: props.preview.modules,
                title: props.preview.title,
                fichier: props.preview.fichier || null,
                module_id: props.preview.module_id || '',
            }
            let model = {
                title: props.preview.title,
                fichier: props.preview.fichier || null,
                module_id: props.preview.module_id || '',
            };

            this.state = {
                model: model,
                formSubmitted: false,
                loading: false
            };
        }
    }

    tryRender = (path) => {
        // Axios(path).then(res => {
        // console.log(path,'from tryRender')
        //     return path;
        // }).catch(res=>{
        //     return '/default16.png';
        // })
        try {
             require(`${path}`);
             return path;
        } catch (err) {
            return '/default.png';
        }
    };
    
    handleCloseModal = () => {
        // this.props.toggle();
    }

    render() {
    console.log(this.defaults);
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} >
                    <fieldset disabled={this.state.loading}>
                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <figure className="effect-sadie">
                                        {this.defaults.public===1&&<Badge className="bg-success badge-oblique">Publié</Badge>}
                                        <img className="" src={process.env.REACT_APP_SERVER_ASSET+this.defaults.fichier.filename} width="100%" alt="Prévisualisation" />
                                        <figcaption>
                                            <div>
                                                <p>
                                                    {this.defaults.title||''}
                                                    <br />
                                                    {this.defaults.description||''}
                                                </p>
                                            </div>
                                            {/* <a href={process.env.REACT_APP_SERVER_ASSET+this.defaults.fichier.filename} target="_blank">Voir plus</a> */}
                                        </figcaption>
                                    </figure>
                                </Col>
                            </Row>
                            {this.defaults.modules&&<Row>
                                <Col md={12}>
                                    Album : <Badge className="bg-info">{this.defaults.modules.name}</Badge>
                                </Col>
                            </Row>}
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="iconLeft" >URL :</Label>
                                        <div className="position-relative ">
                                            <input type="text" name="title"
                                                defaultValue={process.env.REACT_APP_SERVER_ASSET+this.defaults.fichier.filename}
                                                disabled={true}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('title')})}/>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {this.defaults.description&&<Row>
                                <Col md={12}>
                                    <Label for="iconLeft" >Description</Label>
                                    <div className="position-relative ">
                                        <p>{this.defaults.description}</p>
                                    </div>
                                </Col>
                            </Row>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.closePreviewModal} type="button" block>Fermer</Button>
                        </ModalFooter>
                    </fieldset>
                </Form>
            </Fragment>
        );
    }
}



const mapStateProps = (state) => ({
    preview: state.media.preview,
})

const mapDispatchToProps = (dispatch) => {
    return {
        reloadDataAfterEvent: (event) => dispatch({ type: 'reload-data', event }),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(MediaPreviewComponent)
