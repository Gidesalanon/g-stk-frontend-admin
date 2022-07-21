// import external modules
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  Button,
  Card,
  Modal,
  ModalHeader,
  CardBody,
} from "reactstrap";
import { getEntity } from "../../service/api";
import { toastr } from 'react-redux-toastr';
import { Cookies } from "react-cookie";
import Moment from 'moment';
import { HelpCircle } from "react-feather";
import UtilisateurFormComponent from './UserUpdate';
import headerDark from "../../assets/img/photos/14.jpg";
import headerLight from "../../assets/img/photos/15.jpg";
  
require('dotenv').config()
const cookies = new Cookies();
var TemplateColor = 'light';

if(cookies.get('TemplateColor')) 
{ 
   TemplateColor = cookies.get('TemplateColor') ;
}
else if(process.env.REACT_APP_DEFAULT_LAYOUT)
{ 
   TemplateColor = process.env.REACT_APP_DEFAULT_LAYOUT ;
}
var ColorIsDark = TemplateColor === 'dark';

function Profil() {
  const [info, setInfo] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  
  const cookies = new Cookies();
  const successEdit = (status)=>{
    if(status) {
      getInfo();
      toggleModal();
      toastr.success('Informations !',"Utilisateur modifié avec succès",{ position: 'top-center'})
    }else{
      toastr.warning('Informations !',"Erreur lors de la soumission des données",{ position: 'top-center'})
    }
  }
  
  const toggleModal = () => {
    setisModalOpen(!isModalOpen);
  }
  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!info) {
        getInfo();
    }

  }, []);

  const getInfo = async () => {
    const response = await getEntity('auth/me');
    const data = await response;
    let dataObj = data.data.data
    setInfo({...dataObj,roles:dataObj.roles.map(item => item.display_name )});
  };

  return (
    <>
      <Modal isOpen={isModalOpen} size="md">
           <ModalHeader  toggle={()=> setisModalOpen(false) }>Mise à jour du profil </ModalHeader>
           <UtilisateurFormComponent successEdit={successEdit}  />
      </Modal>

      <Fragment>

        <div className="toggle_switch is_dark">
            <input checked={ColorIsDark} 
            onChange={() => {
              cookies.set('TemplateColor', TemplateColor === 'dark' ? 'light':'dark');
              window.location.reload();}
            } 
            type="checkbox" className="switch_3"/>
            <svg className="checkbox" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 80">
              <path className="outer-ring" d="M41.534 9h88.932c17.51 0 31.724 13.658 31.724 30.482 0 16.823-14.215 30.48-31.724 30.48H41.534c-17.51 0-31.724-13.657-31.724-30.48C9.81 22.658 24.025 9 41.534 9z" fill="none" stroke="#233043" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="3"/>
              <path className="is_checked" d="M17 39.482c0-12.694 10.306-23 23-23s23 10.306 23 23-10.306 23-23 23-23-10.306-23-23z"/>
              <path className="is_unchecked" d="M132.77 22.348c7.705 10.695 5.286 25.617-5.417 33.327-2.567 1.85-5.38 3.116-8.288 3.812 7.977 5.03 18.54 5.024 26.668-.83 10.695-7.706 13.122-22.634 5.418-33.33-5.855-8.127-15.88-11.474-25.04-9.23 2.538 1.582 4.806 3.676 6.66 6.25z"/>
            </svg>
        </div>

        {localStorage["alreadyVisitedGuide"] === 'true' && 
        <div onClick={()=>{ localStorage["alreadyVisitedGuide"] = false; window.location.href='/'; }} 
            title="Obtenir de l'aide"
            className="enable-help">
            <HelpCircle />
        </div>}

        <Row>
          <Col xs="12" id="user-profile">
            <Card className="profile-with-cover">
              <div
                className="card-img-top img-fluid bg-cover height-300"
                style={{ background: `url("${ColorIsDark ? headerDark : headerLight}") 50%` }}
              />
              <Row className="media profil-cover-details">
                <Col xs="5">
                  
                </Col>
                <Col xs="2">
                  <div className="align-self-center halfway-fab text-center">
                    <Link to="#" className="profile-image">
                        <div className="user-profil rounded-circle img-border gradient-summer width-100 height-100"> <i className="fa fa-user-circle-o"></i> </div>
                    </Link>
                  </div>
                </Col>
                <Col xs="5">
                  
                </Col>
              </Row>
              <div className="profile-section">
                <Row>
                  <Col sm="12">
                    <Card>
                      <CardBody>
                        <hr />
                        <div className="profil-header">
                        <Row>
                          <Col md="12">
                            <h5 className="mb-2">Informations personnelles</h5>
                          </Col>
                        </Row>
                            <button onClick={() => toggleModal()} className="profil-header-button"><i className="fa fa-edit"></i></button>
                            </div>
                        <hr />
                        <Row>
                          <Col xs="12" md="6" lg="4">
                            <ul className="no-list-style">
                              
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  <Link to="#">Nom :</Link>
                                </span>
                                <span className="display-block overflow-hidden">
                                  {info.lastname}
                                </span>
                              </li>
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  <Link to="#">Prénom(s) :</Link>
                                </span>
                                <Link
                                  to="#"
                                  className="display-block overflow-hidden"
                                >
                                  {info.firstname}
                                </Link>
                              </li>
                            </ul>
                          </Col>
                          <Col xs="12" md="6" lg="4">
                            <ul className="no-list-style">
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  Nom d'utilisateur :
                                </span>
                                <span className="display-block overflow-hidden">
                                  {info.username}
                                </span>
                              </li>
                              
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  <Link to="#">Email :</Link>
                                </span>
                                <Link
                                  to="#"
                                  className="display-block overflow-hidden"
                                >
                                  {info.email}
                                </Link>
                              </li>
                              
                            </ul>
                          </Col>
                          <Col xs="12" md="6" lg="4">
                            <ul className="no-list-style">
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  <Link to="#">
                                    Rôle :
                                  </Link>
                                </span>
                                { info && <span className="display-block overflow-hidden">
                                      {info.roles.join()}
                                </span>}
                              </li>
                              
                              <li className="mb-2">
                                <span className="text-bold-500 primary">
                                  <Link to="#">Date d'inscription :</Link>
                                </span>
                                <span className="display-block overflow-hidden">
                                  {Moment(info.created_at).format("DD/MM/YYYY")}
                                </span>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </>
  );
}

export default Profil;
