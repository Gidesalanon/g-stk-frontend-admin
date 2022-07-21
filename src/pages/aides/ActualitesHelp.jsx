// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import ActAdd from '../../assets/guides/actAdd.PNG';
import ActEdit from '../../assets/guides/actEdit.PNG';
import ActList from '../../assets/guides/actList.PNG';

const ActualitesHelp = () => (
  <div>
    <Button color="primary" id="togglerAct" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Actualités
    </Button>
    <UncontrolledCollapse toggler="#togglerAct">
    <div>
    <Button color="primary" id="togglerActList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des Actualités 
    </Button>
    <UncontrolledCollapse toggler="#togglerActList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Actualités, cliquez sur Indicateurs dans le RUBAN
        LATÉRAL DES MENUS DU DASHBOARD. </h2>
        <h3> Cela vous amènera sur la page où vous verrez la liste des Actualités.</h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={ActList} alt="Card image cap" />
    
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddAct" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter une Actualité
    </Button>
    <UncontrolledCollapse toggler="#togglerAddAct">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter une Actualité, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter une Actualité »</h2>
      <h2>2. Remplissez les champs du formulaire(d’ajout) du modal de « Actualité » et « Enregistrer ». Elle s’ajoutera
      à la liste.</h2>
      <img width="100%" src={ActAdd} alt="Card image cap" />
      <h2>NB : Cocher « Afficher à la page d’Accueil » pour que l’indicateur soit affiché à
      l’accueil du site public</h2>
      </div>
      </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
   
    </Card>
    </UncontrolledCollapse>
    </div>
   
   <div>
   <Button color="primary" id="togglerEditAct" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier une Actualité
   </Button>
   <UncontrolledCollapse toggler="#togglerEditAct">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier une Actualité, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    devant l'Actualité sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de l’indicateur
     sélectionnée.</h3>
     <img width="100%" src={ActEdit} alt="Card image cap" />
     <h2>2. Cliquer sur « Enregistrer » une fois tous les champs renseignés.</h2>
     </div>
     </CardBody>
     </Card>
     <Card>
     <CardBody>
     </CardBody>
   
   </Card>
   </UncontrolledCollapse>
   </div>
   <div>
   <Button color="primary" id="togglerDellAct" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer une Actualité
   </Button>
   <UncontrolledCollapse toggler="#togglerDellAct">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer une Actualité,cliquez (comme précédemment dans le cas
      des thématiques) sur l’icône rouge sur la colonne Actions. </h2>
     </div>
     </CardBody>
     </Card>
     <Card>
     <CardBody>
     </CardBody>
   
   </Card>
   </UncontrolledCollapse>
   </div>
    </UncontrolledCollapse>
  </div>
);

export default ActualitesHelp;