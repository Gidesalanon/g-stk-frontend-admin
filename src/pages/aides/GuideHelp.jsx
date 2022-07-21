// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import Aide from '../../assets/guides/aide.PNG';

const GuideHelp = () => (
  <div>
    <Button color="primary" id="togglerGuide" style={{ marginBottom: '1rem' }}>
      Comment utiliser l'aide en ligne ?
    </Button>
    <UncontrolledCollapse toggler="#togglerGuide">
    <div>
    <Button color="primary" id="togglerAide" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Détails
    </Button>
    <UncontrolledCollapse toggler="#togglerAide">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page de l'Aide en ligne , cliquez sur Guide D'Utilisation dans le <span>RUBAN LATÉRAL DES MENUS DU DASHBOARD.</span>
        </h2>
          <img width="100%" src={Aide} alt="Card image cap" />
          <h3> Cela vous amènera sur la page de l'Aide en ligne. Vous y trouverez des boutons qui se plient et se déplient au clic.</h3>
          <h3> Vous pouvez aussi télécharger le guide au format PDF en cliquant sur le bouton "Télécharger le guide" en haut sur la page d'aide ou aussi en cliquant sur l'option "Télécharger le guide". Cette dernière est accesible au clic sur l'icône d'aide qui se trouve à côté de l'icône de l'avatar en haut dans l'angle droit.</h3>
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

export default GuideHelp;
