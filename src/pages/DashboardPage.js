import React, { Component, Fragment } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

// import { AdvancedCardData } from "../views/cards/advancedCardData";

import MinimalStatisticsBG from "../components/cards/minimalStatisticsBGCard";

import DailyDietListCard from "../components/cards/dailyDietListCard";
import Tutorials from "../components/tutorials";
import SweetAlert from 'react-bootstrap-sweetalert';
import { getEntity } from "../service/api";
import Tour from "reactour";

// Styling
class Dashboard extends Component {
   state = {
      categorie_produits: 0,
      partners: 0,
      products: 0,
      last_news: {list:[]},
      last_products: {list:[]},
      modules: 0,
      showAlert: localStorage["alreadyVisitedGuide"] !== 'true',
      isTourOpen: false,
   }
   
   closeTour = () => {
      this.setState({ isTourOpen: false });
   };

   openTour = () => {
      this.setState({ isTourOpen: true });
   };

   componentDidMount = () => {
      getEntity('categorie_produits').then(res => {
         this.setState({ categorie_produits: res.data.total});
      });
      getEntity('users').then(res => {
         this.setState({ partners: res.data.total});
      });
      getEntity('produits').then(res => {
         this.setState({ products: res.data.total});
      let last_products = [];
      let data = res.data.data.filter( f => f.public == 1);
      if(data.length){
         for(let i=0; i < 5; i++){
            if(data.length < i) continue;
            last_products[i] = 
            {
               item: data[i]?.title,
               priorityColor: "bg-secondary",
               quantity: i+1
            }
         }
      }
         this.setState({ last_products: {list:last_products}});
      });
      // getEntity('modules').then(res => {
      //    this.setState({ modules: res.data.data.length});
      // });
      // getEntity('news').then(res => {
      //    let last_news = [];
      //    let data = res.data.data.filter( f => f.public == 1);
      //    if(data.length){
      //       for(let i=0; i < 5; i++){
      //          if(data.length < i) continue;
      //          last_news[i] = 
      //          {
      //             item: data[i]?.title,
      //             priorityColor: "bg-info",
      //             quantity: i+1
      //          }
      //       }
      //    }
      //    this.setState({ last_news: {list:last_news}});
      // });
   }

   onConfirm= () => {
      this.setState({showAlert: false});
      localStorage["alreadyVisitedGuide"] = true;
      this.openTour();
   }

   onCancel= () => {
      this.setState({showAlert: false});
      localStorage["alreadyVisitedGuide"] = true;
   }
    
   render() {
      const { isTourOpen } = this.state;
      const accentColor = "#5cb7b7";
      return (
         <Fragment>
            <Tour
               onRequestClose={this.closeTour}
               steps={Tutorials}
               isOpen={isTourOpen}
               maskClassName="mask"
               className="helper"
               rounded={5}
               accentColor={accentColor}
            />
            <SweetAlert title={"Bienvenue sur "+process.env.REACT_APP_NAME}
               show={this.state.showAlert}
               showCloseButton
               customButtons={
                  <React.Fragment>
                     <Link className="mx-2" style={{position: 'relative', bottom: '5px', textDecoration: 'underline'}} 
                        onClick={()=>this.onCancel()}>
                        Non merci
                     </Link>
                     <Button color="secondary mx-2" onClick={()=>this.setState({showAlert: false})}>
                        Peut-être plus tard
                     </Button>
                     <Button className="mx-2 bg-success" onClick={()=>this.onConfirm()}>
                        Oui bien sûr
                     </Button>
                  </React.Fragment>
               }
            >
               Ceci est un espace d'administration du contenu de votre site web.<br/> 
               {localStorage["alreadyVisitedGuide"] !== 'false'&&<span>Vous visitez cette application pour la premiere fois.<br/></span>}
               Souhaitez-vous faire une visite guidée ?
            </SweetAlert>
            
            <div data-tut="body">
               <Row className="row-eq-height">
                  <Col sm="12" md="3">
                     <Link to="/categories">
                        <MinimalStatisticsBG
                           cardBgColor="gradient-blackberry"
                           statistics={this.state.modules}
                           text="Categories"
                           iconSide="right"
                        >
                           <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                        </MinimalStatisticsBG>
                     </Link>
                  </Col>
                  
                  <Col sm="12" md="3">
                     <Link to="/products">
                        <MinimalStatisticsBG
                           cardBgColor="gradient-ibiza-sunset"
                           statistics={this.state.categorie_produits}
                           text="Produits"
                           iconSide="right"
                        >
                           <Icon.Briefcase size={56} strokeWidth="1.3" color="#fff" />
                        </MinimalStatisticsBG>
                     </Link>
                  </Col>
                  <Col sm="12" md="3">
                     <Link to="/commandes">
                        <MinimalStatisticsBG
                           cardBgColor="gradient-green-teal"
                           statistics={this.state.products}
                           text="Commandes"
                           iconSide="right"
                        >
                           <Icon.FileText size={56} strokeWidth="1.3" color="#fff" />
                        </MinimalStatisticsBG>
                     </Link>
                  </Col>
                  <Col sm="12" md="3">
                     <Link to="/users">
                        <MinimalStatisticsBG
                           cardBgColor="gradient-pomegranate"
                           statistics={this.state.partners}
                           text="Partenaires"
                           iconSide="right"
                        >
                           <Icon.DollarSign size={56} strokeWidth="1.3" color="#fff" />
                        </MinimalStatisticsBG>
                     </Link>
                  </Col>
               </Row>

               <Row className="row-eq-height">
                  <Col sm="12" md="6">
                     <DailyDietListCard
                        dailyDietList={this.state.last_news}
                        cardTitle="Les 5 dernières commandes"
                     //  cardSubTitle="Some quick example text to build on the card."
                     />
                  </Col>
                  <Col sm="12" md="6">
                     <DailyDietListCard
                        dailyDietList={this.state.last_products}
                        cardTitle="Les 5 dernièrs inscriptions"
                     //  cardSubTitle="Les dernièrs products publiées"
                     />
                  </Col>
               </Row>
            </div>
         </Fragment>
      );
   }
}

export default Dashboard;
