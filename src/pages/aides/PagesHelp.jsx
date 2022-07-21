// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import PagesAdd from '../../assets/guides/pagesAdd.PNG';
import PagesEdit from '../../assets/guides/pagesEdit.PNG';
import PagesList from '../../assets/guides/pagesList.PNG';

const PagesHelp = () => (
  <div>
    <Button color="primary" id="togglerPagesStatiques" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    pages
    </Button>
    <UncontrolledCollapse toggler="#togglerPagesStatiques">
    <div>
    <Button color="primary" id="togglerPagesList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des  pages 
    </Button>
    <UncontrolledCollapse toggler="#togglerPagesList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder aux pages, cliquez sur Pages dans le
        RUBAN LATÉRAL DES MENUS DU DASHBOARD. </h2>
           <h3> Cela vous amènera sur la page où vous verrez la liste des  pages </h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={PagesList} alt="Card image cap" />
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddPages" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter une  page
    </Button>
    <UncontrolledCollapse toggler="#togglerAddPages">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter une page, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter une page »</h2>
      <h2>2. Remplissez les champs du formulaire(d’ajout) du modal de « page » et « Enregistrer ». Elle s’ajoutera
      à la liste.</h2>
      <img width="100%" src={PagesAdd} alt="Card image cap" />
      <h2>NB : Cocher « Afficher à la page d’Accueil » pour qu'elle soit affichée à
      l’accueil du site public.</h2>
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
   <Button color="primary" id="togglerEditPages" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier une page
   </Button>
   <UncontrolledCollapse toggler="#togglerEditPages">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier une page, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    devant la page sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de la page
     sélectionnée.</h3>
     <img width="100%" src={PagesEdit} alt="Card image cap" />
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
   <Button color="primary" id="togglerDellPages" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer une page
   </Button>
   <UncontrolledCollapse toggler="#togglerDellPages">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer une page,cliquez (comme précédemment dans le cas
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

export default PagesHelp;