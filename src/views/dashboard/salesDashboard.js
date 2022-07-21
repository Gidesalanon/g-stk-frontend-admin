import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardFooter, CardLink, CardText, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

import { AdvancedCardData } from "../cards/advancedCardData";

import MinimalStatisticsBG from "../../components/cards/minimalStatisticsBGCard";

import WeeklyStatisticsLineChartCard from "../../components/cards/weeklyStatisticsLineChartCard";

import ShoppingCartCard from "../../components/cards/shoppingCartCard";

import { getEntity } from "../../service/api";

// Styling
class SalesDashboard extends Component {
   state = {
      documentations: 0,
      partners: 0,
      pages: 0,
      modules: 0,
   }
   componentDidMount = () => {
        getEntity('documentations').then(res => {
            this.setState({ documentations: res.data.total});
        });
        getEntity('partners').then(res => {
            this.setState({ partners: res.data.total});
        });
        getEntity('pages').then(res => {
            this.setState({ pages: res.data.total});
        });
        getEntity('modules').then(res => {
            this.setState({ modules: res.data.data.length});
        })
    }
    
   render() {
      return (
         <Fragment>
            {/* Minimal statistics charts */}
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <Link to="/documentations">
                     <MinimalStatisticsBG
                        cardBgColor="gradient-blackberry"
                        statistics={this.state.documentations}
                        text="Documents"
                        iconSide="right"
                     >
                        <Icon.Briefcase size={56} strokeWidth="1.3" color="#fff" />
                     </MinimalStatisticsBG>
                  </Link>
               </Col>
               
               <Col sm="12" md="3">
                  <Link to="/pages">
                     <MinimalStatisticsBG
                        cardBgColor="gradient-ibiza-sunset"
                        statistics={this.state.pages}
                        text="Pages"
                        iconSide="right"
                     >
                        <Icon.FileText size={56} strokeWidth="1.3" color="#fff" />
                     </MinimalStatisticsBG>
                  </Link>
               </Col>
               <Col sm="12" md="3">
                  <Link to="/modules">
                     <MinimalStatisticsBG
                        cardBgColor="gradient-green-teal"
                        statistics={this.state.modules}
                        text="Modules"
                        iconSide="right"
                     >
                        <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                     </MinimalStatisticsBG>
                  </Link>
               </Col>
               <Col sm="12" md="3">
                  <Link to="/partners">
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

            {/* VISIT & SALES STATISTICS */}
            <Row className="row-eq-height">
               
               <Col sm="12" md="4">
                  <WeeklyStatisticsLineChartCard
                     weeklySalesStatisticsBarChartData={AdvancedCardData.WeeklySalesStatisticsBarChartData}
                     cardBgColor="bg-green-light"
                     cardTitle="Statistiques du site"
                     statisticsAmount="143"
                     statisticsRangeAmount="visites cette semaine"
                  />
               </Col>
               <Col sm="12" md="8">
                  <ShoppingCartCard shoppingCart={AdvancedCardData.ShoppingCart} cardTitle="Les plus visités" />
               </Col>
               
            </Row>
         
         </Fragment>
      );
   }
}

export default SalesDashboard;
