import React from "react";
import { Link  } from "react-router-dom";

const tourConfig = [
  {
    selector: '[data-tut="logo"]',
    content: `Ceci est le logo de votre stucture...`
  },
  {
    selector: '[data-tut="quick-link"]',
    content: `La barre de raccourcis et de notifications contient des liens vers les menus les plus souvent utilisés, votre site web et vers le profil utilisateur. `
  },
  {
    selector: '[data-tut="nav-menu"]',
    content: `La barre de navigation principale de l'espace d'administration de votre site web permet d'acceder aux menus de gestion.
    Ceux-ci sont classés par groupe(Editions de contenus, Administration du site, Configurations...). 
    `
  },
  {
    selector: '[data-tut="body"]',
    content: `La zone de travail qui varie en fonction de l’action que vous aurez choisie dans les zones 2 ou 3.
    Notez bien que dans ces dernières zones, lorsque vous cliquez sur certains éléments (menus), vous voyez apparaître des sous-menus.`,
    action: ()=> window.scrollTo(0, 0)
  },
  {
    selector: '[data-tut="footer"]',
    content: `Le pied de page apparait sur toutes les pages de cet espace d'aministration. 
    `,
  },
  {
    selector: '[data-tut="guide"]',
    content: () => (
      <div>
        Découvrez-en plus dans le support d'utilisation en cliquant 
        <strong><Link to="/guide"> ici</Link></strong>.
      </div>
    )
  },
];

export default tourConfig;