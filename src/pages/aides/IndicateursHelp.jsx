// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import IndEdit from '../../assets/guides/editTh.PNG';
import IndAdd from '../../assets/guides/indAdd.PNG';
import IndList from '../../assets/guides/indList.PNG';

const IndicateursHelp = () => (
  <div>
    <Button color="primary" id="togglerInd" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Indicateurs
    </Button>
    <UncontrolledCollapse toggler="#togglerInd">
    <div>
    <Button color="primary" id="togglerIndList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des Indicateurs 
    </Button>
    <UncontrolledCollapse toggler="#togglerIndList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Indicateurs, cliquez sur Indicateurs dans le <span>RUBAN LATÉRAL DES MENUS DU DASHBOARD.</span>
        </h2>
           <h3> Cela vous amènera sur la page où vous
           verrez la liste des Indicateurs avec les informations nom, thématique et la date de création </h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={IndList} alt="Card image cap" />
    
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddInd" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter un Indicateur
    </Button>
    <UncontrolledCollapse toggler="#togglerAddInd">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter un Indicateur, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter un indicateur »</h2>
      <h2>2. Remplissez le formulaire(d’ajout) du modal qui s’ouvre :</h2>
      <img width="100%" src={IndAdd} alt="Card image cap" />
      <h2>Vous devez :</h2>
      <ul>
      <li><h3>saisir le nom de l’indicateur ;</h3></li>
      <li><h3>sélectionner la période de l’analyse ;</h3></li>
      <li><h3>sélectionner la thématique correspondante ;</h3></li>
      <li><h3>sélectionner la table à analyse ;</h3></li>
      <li><h3>sélectionner un agrégateur (somme, comptage, etc) ;</h3></li>
      <li><h3>sélectionner le type d’Affichage des données (graphe linéaire, histogramme, etc) ;</h3></li>
      <li><h3>choisir l’icône du marqueur;</h3></li>
      <li><h3>choisir la couleur de la zone géographique;</h3></li>
      <li><h3>cocher « Rendre public » pour que l’indicateur soit affiché à l’accueil du site public.</h3></li>
      </ul>
      <h2>3. Cliquer sur « Valider » une fois tous les champs renseignés. Elle s’ajoutera à la
      liste.</h2>
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
   <Button color="primary" id="togglerEditTh" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier un Indicateur
   </Button>
   <UncontrolledCollapse toggler="#togglerEditTh">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier un Indicateur, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    devant l’indicateur sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de l’indicateur
     sélectionnée.</h3>
     <img width="100%" src={IndEdit} alt="Card image cap" />
     <h2>2. Cliquer sur « Enregistrer » une fois tous les champs renseignés.
     </h2>
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
   <Button color="primary" id="togglerDeleteInd" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer un Indicateur
   </Button>
   <UncontrolledCollapse toggler="#togglerDeleteInd">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer une thématique,cliquez (comme précédemment dans le cas
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

export default IndicateursHelp;