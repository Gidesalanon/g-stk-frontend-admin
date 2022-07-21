// import external modules
import React from 'react';

import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
} from 'reactstrap';

import Erreur from '../assets/guides/error.PNG';
import Home from '../assets/guides/homedashboard.PNG';
import Login from '../assets/guides/login.PNG';
import Lien from '../assets/guides/url.PNG';

const AccessGuide = () => (
  <div>
    <Button color="primary" id="toggler1" style={{ marginBottom: '1rem' }}>
      Accès à l'interface d'administration
    </Button>
    <UncontrolledCollapse toggler="#toggler1">
      <Card>
        <CardBody>
        <h4>Ouvrez une nouvelle fenêtre dans le navigateur de votre équipement de connexion, puis commencez à saisir dans la barre d’adresse de votre navigateur
        </h4>
        <a href="https://dashboard.ressources-eau.gouv.bj/">https://dashboard.ressources-eau.gouv.bj/  </a>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
      </CardBody>
      <img width="100%" src={Lien} alt="Card image cap" />
      <CardBody>
        <h2>Cela affichera la page d’authentification de l’interface. </h2>
        <img width="100%"  src={Login} alt="Card image cap" />
        <h2>Saisissez vos identifiants   de connexion  </h2>
        <h3>Içi vous entrerez un email (admin@admin.bj) , un mot de passe (password ) et validez en cliquant sur le bouton « Me connecter ».
       <br/> Une fois vos identifiants renseignés, cliquez sur le bouton « Me connecter ».  Lorsque vos identifiants sont mal renseignés, vous obtenez le message d’erreur visuel suivant :
        </h3>
        <img width="100%" style={{height:"05%" }} src={Erreur} alt="Card image cap" />
        <br/>
        <h2>Lorsque vos identifiants sont bien renseignés, vous serez redirigés vers la page du
        Tableau de bord (l’interface d’administration).
        </h2>
        <img width="100%"  src={Home} alt="Card image cap" />

        <h3>NB : Vous pouvez vous déconnecter en cliquant sur "Déconnexion" dans les option disponible sur l'avatar en haut dans l'angle droit.
        </h3>
      </CardBody>
    </Card>
    </UncontrolledCollapse>
  </div>
);

export default AccessGuide;
