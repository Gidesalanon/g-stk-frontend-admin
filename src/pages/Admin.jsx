// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  Table,
  UncontrolledCollapse,
} from 'reactstrap';

import Pdf from '../assets/docs/sieau_dashboard.pdf';
import GuideHelp from '../pages/aides/GuideHelp';
import AccessGuide from './AccessGuide';
import ExplorePage from './ExplorePage';

const Admin = () => (
  <div>
    <a className="btn btn-primary" href={Pdf} target="blank">
      <i className="fa fa-download"></i>
      <span className="menu-item-text">Télécharger le Guide D'utilisation  </span>
    </a>
    <div>
      <GuideHelp />
    </div>


    <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      Guide d'utilisation du Dashboard (Aide en ligne)
    </Button>
    <UncontrolledCollapse toggler="#toggler">
      <Card>
        <CardBody>
          <h1>[Guide pour les administrateurs] </h1>
          <h2>Digitalisation du système d’information sur l’eau au Bénin : Interface d’Administration
        </h2>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>ID Document</td>
                <td>......</td>
              </tr>
              <tr>
                <td>Date de création   </td>
                <td>......</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>......</td>
              </tr>
              <tr>
                <td>Date de la version    </td>
                <td>......</td>
              </tr>
              <tr>
                <td>Créé par  </td>
                <td>......</td>
              </tr>
              <tr>
                <td>Confidentialité  </td>
                <td>......</td>
              </tr>
            </tbody>
          </Table>
          <h2>Prérequis </h2>
          <h4>Pour accéder à l’interface d’administration, vous devez :   </h4>
          <ul>
            <li>	Disposer d’un ordinateur  </li>
            <li>Avoir une connectivité au réseau d’un opérateur      </li>
          </ul>
        </CardBody>
      </Card>
    </UncontrolledCollapse>

    <AccessGuide />
    <ExplorePage />
  </div>
);

export default Admin;
