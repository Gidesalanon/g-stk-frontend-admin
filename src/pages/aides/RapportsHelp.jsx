// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import RapportAcess from '../../assets/guides/rapportaccess.PNG';
import RapportAdd from '../../assets/guides/rapportAdd.PNG';
import RapportEdit from '../../assets/guides/rapportEdit.PNG';

const RapportsHelp = () => (
  <div>
    <Button color="primary" id="togglerRapport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Dossiers et Rapports
    </Button>
    <UncontrolledCollapse toggler="#togglerRapport">
    <div>
    <Button color="primary" id="togglerRapportList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des  Dossiers et Rapports 
    </Button>
    <UncontrolledCollapse toggler="#togglerRapportList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Dossiers et Rapports, cliquez sur Dossiers et Rapports dans le
        RUBAN LATÉRAL DES MENUS DU DASHBOARD. </h2>
           <h3> Cela vous amènera sur la page où vous verrez la liste des  Dossiers et Rapports </h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={RapportAcess} alt="Card image cap" />
      <h2>Vous pouvez télécharger le fichier rattaché au rapport en cliquant sur
      l’icône de téléchargement.
      </h2>
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddRapport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter un  Rapport
    </Button>
    <UncontrolledCollapse toggler="#togglerAddRapport">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter un Rapport, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter un Rapport »</h2>
      <h2>2. Remplissez le formulaire(d’ajout) du modal suivant :</h2>

      <img width="100%" src={RapportAdd} alt="Card image cap" />

      <h2>Vous devez :</h2>
      <ul>
      <li><h3>Saisir le titre du rapport à ajouter;</h3></li>
      <li><h3>Choisir l’année;</h3></li>
      <li><h3>Choisir la thématique correspondante ;</h3></li>
      <li><h3>sélectionner la table à analyse ;</h3></li>
      <li><h3>choisir le fichier du rapport.</h3></li>
      </ul>
      <h2>3. Cliquez sur le bouton « Enregistrer » pour sauvegarder.</h2>
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
   <Button color="primary" id="togglerEditRapport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Modifier un Rapport
   </Button>
   <UncontrolledCollapse toggler="#togglerEditRapport">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier un Rapport, </h2>
    <h2>1. Cliquez sur l’icône bleue (comme précédemment dans le cas des thématiques)
    devant le Rapport sur la colonne Actions.</h2>
     <h3>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de l’indicateur
     sélectionnée.</h3>
     <img width="100%" src={RapportEdit} alt="Card image cap" />
     <h2>2. Cliquer sur « Enregistrer » une fois tous les champs renseignés.
     </h2>
     <h2>Vous pouvez télécharger le fichier rattaché au rapport en cliquant sur
     l’icône de téléchargement.
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
   <Button color="primary" id="togglerDellRapport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer un Rapport
   </Button>
   <UncontrolledCollapse toggler="#togglerDellRapport">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer un Rapport,cliquez (comme précédemment dans le cas
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

export default RapportsHelp;