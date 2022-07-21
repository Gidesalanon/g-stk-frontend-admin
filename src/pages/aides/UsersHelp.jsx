// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import Users from '../../assets/guides/users.PNG';
import UsersAdd from '../../assets/guides/usersAdd.PNG';
import UsersEdit from '../../assets/guides/usersEdit.PNG';

const UsersHelp = () => (
  <div>
    <Button color="primary" id="togglerUtilisateur" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Utilisateurs
    </Button>
    <UncontrolledCollapse toggler="#togglerUtilisateur">
    <div>
    <Button color="primary" id="togglerUtilisateurList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des Utilisateurs 
    </Button>
    <UncontrolledCollapse toggler="#togglerUtilisateurList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Utilisateurs, cliquez sur Utilisateurs dans le <span>RUBAN LATÉRAL DES MENUS DU DASHBOARD.</span>
        </h2>
           <h3> Cela vous amènera sur la page où vous verrez la liste des Utilisateurs </h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={Users} alt="Card image cap" />
    
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddUtilisateur" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter un Utilisateur
    </Button>
    <UncontrolledCollapse toggler="#togglerAddUtilisateur">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter un Utilisateur, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter un Utilisateur »</h2>
      <h2>2. Remplissez les champs du formulaire(d’ajout) du modal de « Utilisateur » et « Enregistrer ». Elle s’ajoutera
      à la liste.</h2>
      <img width="100%" src={UsersAdd} alt="Card image cap" />
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
   <Button color="primary" id="togglerEditUtilisateur" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier un Utilisateur
   </Button>
   <UncontrolledCollapse toggler="#togglerEditUtilisateur">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier un Utilisateur, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    devant l'Utilisateur sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de l'Utilisateur
     sélectionnée.</h3>
     <img width="100%" src={UsersEdit} alt="Card image cap" />
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
   <Button color="primary" id="togglerDellUtilisateur" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer un Utilisateur
   </Button>
   <UncontrolledCollapse toggler="#togglerDellUtilisateur">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer un Utilisateur,cliquez (comme précédemment dans le cas
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

export default UsersHelp;