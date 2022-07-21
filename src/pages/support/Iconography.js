// import external modules
import React, { Fragment, useState } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import * as Icon from "react-feather";
// import internal(own) modules
import Accordion from "../../components/accordion/Accordion";
import EmptyList from "../../components/empty";
import Search from "./search"

const posts = [
   {  
      id: '1', 
      icon: <Icon.PlusCircle size={24} strokeWidth={1} />,
      name: 'Ajouter un élément',
      content: `Cliquez sur le bouton représenté par cette icon pour ajouter un nouvel enregistrement dans la liste courante.
                              Vous devez ensuite remplir le formulaire d'ajout avec les informations demandées. 
                              Certains champs sont nécessaires exigent un type précis d'information. 
                              D'autres par contre ne sont pas requis et ne pas les renseigner n'empêche pas la soumission du formulaire.
                              Les champs requis sont marqués d'un signe (*) juste après le libellé.` 
   },
   {  
      id: '2', 
      icon: <Icon.Edit size={24} strokeWidth={1} />,
      name: 'Modifier un élément',
      content: `Cliquez sur le bouton représenté par cette icon pour mettre à jour les informations d'un enregistrement existant dans la liste courante.
                              Vous devez ensuite remplir le formulaire de mise à jour avec les informations demandées. 
                              Certains champs sont nécessaires exigent un type précis d'information. 
                              D'autres par contre ne sont pas requis et ne pas les renseigner n'empêche pas la soumission du formulaire.
                              Les champs requis sont marqués d'un signe (*) juste après le libellé.` 
   },
   {  
      id: '3', 
      icon: <Icon.Trash2 size={24} strokeWidth={1} />,
      name: 'Supprimer un élément',
      content: `Cliquez sur le bouton représenté par cette icon pour supprimer définitivement les informations d'un enregistrement existant dans la liste courante.
                              Vous devez ensuite confirmer la suppression. Faites attention aux données sensibles car cette action est irréversible.` 
   },
   {  
      id: '4', 
      icon: <Icon.Home size={24} strokeWidth={1} />,
      name: 'Accueil',
      content: `Un résumé de quelques statistiques du site du site et quelques racourcis vers des menus fréquents.` 
   },
   {  
      id: '5', 
      icon: <Icon.BarChart2 size={24} strokeWidth={1} />,
      name: 'Editions de contenus',
      content: `Regroupe les menus de gestion des contenus du site web à grandes fréquence de mise à jour. ` 
   },
   {  
      id: '6', 
      icon: <Icon.Database size={24} strokeWidth={1} />,
      name: 'Données de base',
      content: `Ce groupe de menus concerne les informations de catégorisations dont dépendent les menus du groupe Actions sur l'application` 
   },
   {  
      id: '7', 
      icon: <Icon.Grid size={24} strokeWidth={1} />,
      name: 'Configurations',
      content: `Rendez vous dans ce groupe de menus pour pouvoir faire des réglages du point de vue sécuritaire, visuel du site web et de la plateforme en général` 
   },
   {  
      id: '8', 
      icon: <Icon.HelpCircle size={24} strokeWidth={1} />,
      name: 'Aide',
      content: `Obtenez de l'aide pendant l'utilisation de cet espace d'administration en cliquant sur les boutons représentés par cette icône` 
   },
];

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

const FAQ = props => {

   const { search } = window.location;
   const query = new URLSearchParams(search).get('s');
   const [searchQuery, setSearchQuery] = useState(query || '');
   const filteredPosts = filterPosts(posts, searchQuery);
   return (
      <Fragment>
         <Row>
            <Col xs="12">
               <div className="content-header">Iconographie</div>
               <p className="content-sub-header">Retrouvez ici la liste des icones présents sur la plateforme suivi de quelques explications</p>
            </Col>
         </Row>
         
         <Row>
            <Search
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
            />
         </Row>
         <Row>
            <Col xs="12">
               <Card className="accordion">
                  <CardBody>
                     {!filteredPosts.length&&<EmptyList title="Aucun résultat trouvé"/>}
                     <Accordion>
                        {filteredPosts.map((post) => (
                           <Accordion.AccordionItem key={post.id}
                              render={() => (
                                 <CardHeader className="border-bottom-grey border-bottom-lighten-3">
                                    <span aria-expanded="true" aria-disabled="false" aria-controls="1" className="primary mx-0 cursor-pointer">
                                       <h5>
                                          {post.icon} {" "}
                                          <span>{post.name}</span>
                                       </h5>
                                    </span>
                                 </CardHeader>
                              )}
                           >
                              <CardBody className="text-align-justify"> {post.content} </CardBody>
                           </Accordion.AccordionItem>
                        ))}
                        
                     </Accordion>
                  </CardBody>
               </Card>
            </Col>
         </Row>
      </Fragment>
   );
};

export default FAQ;
