// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import Importer from '../../assets/guides/importer.PNG';
import ImportForm from '../../assets/guides/importForm.PNG';
import ImportPage from '../../assets/guides/importPage.PNG';

const ImportationHelp = () => (
  <div>
    <Button color="primary" id="togglerImport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Données et Importation
    </Button>
    <UncontrolledCollapse toggler="#togglerImport">
    <div>
    <Button color="primary" id="togglerAddImport" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Démarrer une Imporatation
    </Button>
    <UncontrolledCollapse toggler="#togglerAddImport">
      <Card>
      <CardBody>
      <div>
      <img width="100%" src={ImportPage} alt="Card image cap" />
      <h2> Pour importer des Données, </h2>
      <h2>1. Remplissez le formulaire</h2>
      <ul>
      <li><h3>Choisissez le fichier de base de données à importer»,</h3> </li>
      <li><h3>Choisissez le type de Base de données </h3></li>
      </ul>
      <h2>NB : Le fichier à choisir dépend du type de Base de donnée</h2>
      <img width="100%" src={ImportForm} alt="Card image cap" />
      <h2>2. Cliquez sur le bouton « Démarrer l’importation. » <br/> Cela prendre un
      peu de temps suivant la taille du fichier de Base de Données</h2>
      <img width="100%" src={Importer} alt="Card image cap" />
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

export default ImportationHelp;