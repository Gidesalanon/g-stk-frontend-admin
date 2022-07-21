// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import MenusAdd from '../../assets/guides/MenusAdd.PNG';
import MenusEdit from '../../assets/guides/MenusEdit.PNG';
import MenusList from '../../assets/guides/MenusList.PNG';

const MenusHelp = () => (
  <div>
    <Button color="primary" id="togglerMenus" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Menus
    </Button>
    <UncontrolledCollapse toggler="#togglerMenus">
    <div>
    <Button color="primary" id="togglerMenusList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des  Menus
    </Button>
    <UncontrolledCollapse toggler="#togglerMenusList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Menus, cliquez sur Menus dans le <span>RUBAN LATÉRAL DES MENUS DU DASHBOARD.</span>
        </h2>
           <h3> Cela vous amènera sur la page où vous verrez la liste des Menus </h3>
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={MenusList} alt="Card image cap" />

    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddMenus" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter une  Menu
    </Button>
    <UncontrolledCollapse toggler="#togglerAddMenus">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter un menu, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter un menu »</h2>
      <h2>2. Remplissez les champs du formulaire(d’ajout) du modal de « Menu » et « Enregistrer ». Elle s’ajoutera
      à la liste.</h2>
      <img width="100%" src={MenusAdd} alt="Card image cap" />
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
   <Button color="primary" id="togglerEditMenus" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier un menu
   </Button>
   <UncontrolledCollapse toggler="#togglerEditMenus">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier un menu, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    dans Menu sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes du Menu
     sélectionnée.</h3>
     <img width="100%" src={MenusEdit} alt="Card image cap" />
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
   <Button color="primary" id="togglerDellMenus" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer un menu
   </Button>
   <UncontrolledCollapse toggler="#togglerDellMenus">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer un menu,cliquez (comme précédemment dans le cas
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

export default MenusHelp;
