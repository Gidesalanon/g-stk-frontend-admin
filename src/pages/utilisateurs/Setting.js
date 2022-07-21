import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import { getEntity, postEntity } from '../../service/api';
import { Card, CardBody, Row, Col, Button, Form, CustomInput, FormGroup, Label } from "reactstrap";
import { FileText } from "react-feather";
import { toastr } from 'react-redux-toastr';
import Spinner from '../../components/spinner/spinner';

import EditorJodit from '../../components/editorJodit';

const ENDPOINT = 'settings'

export default class Setting extends Component {
   
   state = {
      model: {
               organisation_name: '',
               // fichier: null,
               copyright: '',
               copyright_author: '',
               welcome_title: '',
               welcome_content: '',
               director_name: '',
               director_position: '',
               facebook_url: '',
               twitter_url: '',
               home_indicator_1: '',
               home_indicator_1_value: '',
               home_indicator_2: '',
               home_indicator_2_value: '',
               home_indicator_3: '',
               home_indicator_3_value: '',
               home_indicator_4: '',
               home_indicator_4_value: '',
      },
      loading: false,
      formSubmitted: false,
   };
   defaults = {};
   nullableFields = [];
   constructor(props) {

      super();

      this.setValue = this.setValue.bind(this);
      this.setOrg = this.setOrg.bind(this);
      this.setFichier = this.setFichier.bind(this);
      this.setMessage = this.setMessage.bind(this);
      this.setWelcome = this.setWelcome.bind(this);
      this.setDirector = this.setDirector.bind(this);
      this.setPosition = this.setPosition.bind(this);
      this.setFacebook = this.setFacebook.bind(this);
      this.setTwitter = this.setTwitter.bind(this);
      this.setIndicateurValue1 = this.setIndicateurValue1.bind(this);
      this.setIndicateurValue2 = this.setIndicateurValue2.bind(this);
      this.setIndicateurValue3 = this.setIndicateurValue3.bind(this);
      this.setIndicateurValue4 = this.setIndicateurValue4.bind(this);
      this.setIndicateur1 = this.setIndicateur1.bind(this);
      this.setIndicateur2 = this.setIndicateur2.bind(this);
      this.setIndicateur3 = this.setIndicateur3.bind(this);
      this.setIndicateur4 = this.setIndicateur4.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   loadData(){
      getEntity(ENDPOINT).then(res => {
      let model = {
            id: res.data.data[0]?.id,
            copyright: res.data.data[0]?.copyright,
            copyright_author: res.data.data[0]?.copyright_author,
            organisation_name: res.data.data[0]?.organisation_name,
            fichier: res.data.data[0]?.fichier,
            director_name: res.data.data[0]?.director_name || '',
            director_position: res.data.data[0]?.director_position || '',
            welcome_title: res.data.data[0]?.welcome_title || '',
            welcome_content: res.data.data[0]?.welcome_content || '',
            facebook_url: res.data.data[0]?.facebook_url || '',
            twitter_url: res.data.data[0]?.twitter_url || '',
            home_indicator_1: res.data.data[0]?.home_indicator_1 || '',
            home_indicator_1_value: res.data.data[0]?.home_indicator_1_value || '',
            home_indicator_2: res.data.data[0]?.home_indicator_2 || '',
            home_indicator_2_value: res.data.data[0]?.home_indicator_2_value || '',
            home_indicator_3: res.data.data[0]?.home_indicator_3 || '',
            home_indicator_3_value: res.data.data[0]?.home_indicator_3_value || '',
            home_indicator_4: res.data.data[0]?.home_indicator_4 || '',
            home_indicator_4_value: res.data.data[0]?.home_indicator_4_value || ''
         };

         this.setState({
            model: model,
            formSubmitted: false,
            loading: false
         });
      }).catch(res=>{
         // this.setState({loading:false})
      })
   }

   componentDidMount = () => {
      this.loadData();
   }

   onSubmit(e) {
      let request = null;
      e.preventDefault();

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
      
      request = postEntity(ENDPOINT, form, {
            'Content-Type': 'multipart/form-data'
      });

      request.then(() => {
         toastr.success('Informations !','Paramètres modifiés avec succès', { position: 'top-center'});
         this.setState({ loading: false });
         this.loadData();
      }, () => {
         toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
      }).finally(() => {
         this.setState({ loading: false });
      });
   }

   setValue(e) {
      const field = e.target.name;
      const keyValue = { [field]: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setOrg(e) {
      const keyValue = { organisation_name: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setDirector(e) {
      const keyValue = { director_name: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setPosition(e) {
      const keyValue = { director_position: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setFacebook(e) {
      const keyValue = { facebook_url: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setTwitter(e) {
      const keyValue = { twitter_url: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setWelcome(e) {
      const keyValue = { organisation_name: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setMessage(value) {
      const keyValue = { welcome_content: value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setFichier(event) {
      const file = event.target.files[0];
      const keyValue = { fichier: file };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }
   
   setIndicateur1(e) {
      const keyValue = { home_indicator_1: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateurValue1(e) {
      const keyValue = { home_indicator_1_value: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateur2(e) {
      const keyValue = { home_indicator_2: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateurValue2(e) {
      const keyValue = { home_indicator_2_value: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateur3(e) {
      const keyValue = { home_indicator_3: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateurValue3(e) {
      const keyValue = { home_indicator_3_value: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateur4(e) {
      const keyValue = { home_indicator_4: e.target.value };
      this.setState({ model: { ...this.state.model, ...keyValue }});
   }

   setIndicateurValue4(e) {
      const keyValue = { home_indicator_4_value: e.target.value };
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
            {this.state.loading&&<Spinner/>}
            <Form onSubmit={this.onSubmit} >

               <Row>
                  <Row>
                     <Col md="12">
                        <div className="content-header">Informations liées à l'application </div>
                     </Col>
                  </Row>

                  <Col sm="12">
                     <Card>
                        <CardBody>
                           <div className="px-3">
                              <Form className="striped-rows form-bordered form-horizontal">
                                 <div className="form-body">
                                    
                                    <h4 className="form-section"><FileText size={20} color="#212529" /> Informations requises</h4>
                                    
                                    <FormGroup row>
                                       <Label for="organisation_name" sm={3}>Nom de l'organisation (*):</Label>
                                       <Col sm={9}>
                                          <input type="text" name="organisation_name" id="organisation_name"
                                             onInput={this.setOrg}
                                             required={true}
                                             defaultValue={this.state.model.organisation_name}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('organisation_name')})}/>
                                       </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                       <Label for="director_name" sm={3}>Nom complet du responsable (*):</Label>
                                       <Col sm={9}>
                                          <input type="text" name="director_name" id="director_name"
                                             required={true}
                                             onInput={this.setDirector}
                                             defaultValue={this.state.model.director_name}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('director_name')})}/>
                                       </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row className="last">
                                       <Label for="director_position" sm={3}>Fonction du responsable (*):</Label>
                                       <Col sm={9}>
                                          <input type="text" name="director_position" id="director_position"
                                             required={true}
                                             onInput={this.setPosition}
                                             defaultValue={this.state.model.director_position}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('placeholder="Indicateur"')})}/>
                                       </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                       <Label sm={3}>Photo du responsable:</Label>
                                       <Col sm={9}>
                                          <CustomInput type="file" id="file"
                                             label={this.state.model.fichier ? this.state.model.fichier.name : 'Choisir un fichier'}
                                             className={classnames({'is-invalid': this.state.formSubmitted &&
                                                      this.fieldInValid('fichier')})}
                                             onChange={this.setFichier}/>
                                          {this.state.model.fichier && <img src={process.env.REACT_APP_SERVER_ASSET+this.state.model.fichier.filename} className="file-preview" />}
                                       </Col>
                                    </FormGroup>

                                    <h4 className="form-section"><FileText size={20} color="#212529" /> Informations utiles</h4>

                                    <FormGroup row>
                                       <Label for="facebook_url" sm={3}>Facebook:</Label>
                                       <Col sm={9}>
                                          <input type="url" name="facebook_url" id="facebook_url"
                                             onInput={this.setFacebook}
                                             defaultValue={this.state.model.facebook_url}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('director_name')})}/>
                                       </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Label for="twitter_url" sm={3}>Twitter:</Label>
                                       <Col sm={9}>
                                          <input type="url" name="twitter_url" id="twitter_url"
                                             onInput={this.setTwitter}
                                             defaultValue={this.state.model.twitter_url}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('twitter_url')})}/>
                                       </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Label for="copyright_author" sm={3}>Copyright:</Label>
                                       <Col sm={9}>
                                          <input type="text" name="copyright_author" id="copyright_author" 
                                             onInput={this.setValue}
                                             defaultValue={this.state.model.copyright_author}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('copyright_author')})}/>
                                       </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                       <Label for="copyright" sm={3}>Message de Copyright:</Label>
                                       <Col sm={9}>
                                          <textarea type="text" onChange={this.setValue} name="copyright" defaultValue={this.defaults.copyright}
                                                className={classnames('form-control')}
                                                value={this.state.model.copyright}
                                            ></textarea>
                                       </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                       <Label for="welcome_title" sm={3}>Titre du message d'accueil:</Label>
                                       <Col sm={9}>
                                          <input type="text" name="welcome_title" id="welcome_title"
                                             onInput={this.setWelcome}
                                             defaultValue={this.state.model.welcome_title}
                                             className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('welcome_title')})}/>
                                       </Col>
                                    </FormGroup>

                                    <FormGroup row className="last">
                                       <Label for="projectinput9" sm={3}>Message d'accueil:</Label>
                                       <Col sm={9}>
                                       <EditorJodit
                                                defaultValue={this.state.model.content}
                                                setValue={this.setMessage}
                                             />
                                       </Col>
                                    </FormGroup>
                                    
                                    <h4 className="form-section"><FileText size={20} color="#212529" /> Quelques indicateurs</h4>
                                    
                                    <FormGroup row>
                                       <Label for="projectinput1" sm={3}>Indicateur 1:</Label>
                                       <Col sm={9}>
                                       <Row className="d-flex">
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_1"
                                                onInput={this.setIndicateur1}
                                                placeholder="Indicateur"
                                                defaultValue={this.state.model.home_indicator_1}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_1')})}/>
                                       </Col>
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_1_value"
                                                onInput={this.setIndicateurValue1}
                                                placeholder="Valeur"
                                                defaultValue={this.state.model.home_indicator_1_value}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_1_value')})}/>
                                       </Col>
                                       </Row>
                                       </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Label for="projectinput1" sm={3}>Indicateur 2:</Label>
                                       <Col sm={9}>
                                       <Row className="d-flex">
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_2"
                                                onInput={this.setIndicateur2}
                                                placeholder="Indicateur"
                                                defaultValue={this.state.model.home_indicator_2}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_2')})}/>
                                       </Col>
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_2_value"
                                                onInput={this.setIndicateurValue2}
                                                placeholder="Valeur"
                                                defaultValue={this.state.model.home_indicator_2_value}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_2_value')})}/>
                                       </Col>
                                       </Row>
                                       </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Label for="projectinput1" sm={3}>Indicateur 3:</Label>
                                       <Col sm={9}>
                                       <Row className="d-flex">
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_3"
                                                onInput={this.setIndicateur3}
                                                placeholder="Indicateur"
                                                defaultValue={this.state.model.home_indicator_3}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_3')})}/>
                                       </Col>
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_3_value"
                                                onInput={this.setIndicateurValue3}
                                                placeholder="Valeur"
                                                defaultValue={this.state.model.home_indicator_3_value}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_3_value')})}/>
                                       </Col>
                                       </Row>
                                       </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                       <Label for="projectinput1" sm={3}>Indicateur 4:</Label>
                                       <Col sm={9}>
                                       <Row className="d-flex">
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_4"
                                                onInput={this.setIndicateur4}
                                                placeholder="Indicateur"
                                                defaultValue={this.state.model.home_indicator_4}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_4')})}/>
                                       </Col>
                                       <Col md={6}>
                                             <input type="text" name="home_indicator_4_value"
                                                onInput={this.setIndicateurValue4}
                                                placeholder="Valeur"
                                                defaultValue={this.state.model.home_indicator_4_value}
                                                className={classnames('form-control', {'is-invalid': this.state.formSubmitted && this.fieldInValid('home_indicator_4_value')})}/>
                                       </Col>
                                       </Row>
                                       </Col>
                                    </FormGroup> 

                                 </div>
                                 <div className="form-actions">
                                    <Button color="primary" type="submit" className={classnames({ 'cursor-not-allowed': this.state.loading })} block>
                                       <span className={classnames({ 'd-none': this.state.loading })}> Mettre à jour les données</span>
                                       <i className={classnames('fa fa-circle-o-notch', { 'fa-spin': this.state.loading, 'd-none': !this.state.loading })}></i>
                                    </Button>
                                 </div>
                              </Form>
                           </div>
                        </CardBody>
                     </Card>
                  </Col>
               </Row>
            </Form>
         </Fragment>
      );
   }
}