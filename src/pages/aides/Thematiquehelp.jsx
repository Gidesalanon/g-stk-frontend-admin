// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import EditIcon from '../../assets/guides/editIcon.PNG';
import EditTh from '../../assets/guides/editTh.PNG';
import AddTh from '../../assets/guides/thadd.PNG';
import Ths from '../../assets/guides/thematique.PNG';

const Thematiquehelp = () => (
  <div>
    <Button color="primary" id="togglerTh" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Thématiques
    </Button>
    <UncontrolledCollapse toggler="#togglerTh">
    <div>
    <Button color="primary" id="togglerThList" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Liste des Thématiques 
    </Button>
    <UncontrolledCollapse toggler="#togglerThList">
      <Card>
        <CardBody>
        <div>
        <h2>
        Pour accéder à la page des Thématiques, cliquez sur Thématiques dans le <span>RUBAN LATÉRAL DES MENUS DU DASHBOARD.</span>
        </h2>
           <h3> Cela vous amènera sur la page où vous verrez la liste des thématiques </h3> 
        </div>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={Ths} alt="Card image cap" />
    
    </Card>
    </UncontrolledCollapse>
    </div>
    <div>
    <Button color="primary" id="togglerAddTh" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
    Ajouter une Thématique
    </Button>
    <UncontrolledCollapse toggler="#togglerAddTh">
      <Card>
      <CardBody>
      <div>
      <h2> Pour ajouter une thématique, </h2>
      <h2>1. Cliquez sur le bouton « Ajouter une thématique », </h2>
      <h2>2. Remplissez le formulaire du modal qui s’ouvre (un seul champ où l’on doit écrire le nom de la thématique est prévu) : 
      </h2>
      <img width="100%" src={AddTh} alt="Card image cap" />
      <h2>3. Saisissez le nom de la thématique et Enregistrer. Elle s’ajoutera à la liste.</h2>
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
   Modifier une Thématique
   </Button>
   <UncontrolledCollapse toggler="#togglerEditTh">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Modifier une thématique, </h2>
 
     <h2>1.	Cliquez sur l’icône bleue devant la thématique sur la colonne "Actions". </h2>
     <h2>Ainsi un modal s’ouvrira avec le formulaire et les informations courantes de la
     thématique sélectionnée.</h2>
     <img width="100%" src={EditIcon} alt="Card image cap" />
     <h2>2.	Remplissez le formulaire du modal qui s’ouvre (un seul champ où l’on doit écrire le nom de la thématique est prévu) : </h2>

    <img width="100%" src={EditTh} alt="Card image cap" />
     <h2>3. Changez le nom de la thématique et Enregistrer</h2>
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
   <Button color="primary" id="togglerDellTh" style={{ marginBottom: '1rem', backgroundColor: '#051b32' }}>
   Supprimer une Thématique
   </Button>
   <UncontrolledCollapse toggler="#togglerDellTh">
     <Card>
     <CardBody>
     <div>
     <h2> Pour Supprimer une thématique,cliquez sur l’icône rouge sur la colonne
     Actions.  </h2>
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

export default Thematiquehelp;