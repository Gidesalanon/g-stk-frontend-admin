// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import Procedure from '../../assets/guides/procedure.PNG';

const ProceduresHelp = () => (
  <div>
    <Button color="primary" id="togglerProc" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Procédures
    </Button>
    <UncontrolledCollapse toggler="#togglerProc">
    <div>
    <Button color="primary" id="togglerProceList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des Procédures 
    </Button>
    <UncontrolledCollapse toggler="#togglerProceList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Procédures,cliquez sur Indicateurs dans le RUBAN LATÉRAL DES MENUS DU DASHBOARD.
        Cela vous amènera sur la page où vous verrez la liste des Procédures (demandes
        d’approvisionnement en eau soumises sur le site public par des personnes physiques
        et morales).
        </h2>
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={Procedure} alt="Card image cap" />
    
    </Card>
    </UncontrolledCollapse>
    </div>
    </UncontrolledCollapse>
  </div>
);

export default ProceduresHelp;