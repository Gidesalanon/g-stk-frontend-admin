import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";

import * as Icon from "react-feather";

import { StaticCardData } from "../cards/staticCardData";
import { AdvancedCardData } from "../cards/advancedCardData";

import MinimalStatisticsChart from "../../components/cards/minimalStatisticsWithChartCard";
import VisitSalesStatisticsCard from "../../components/cards/visitSalesStatistics";
// Styling

class EcommerceDashboard extends Component {
   
    render() {
      return (
         <Fragment>
            {/* Minimal statistics charts */}
            <Row className="row-eq-height h100">
               <Col sm="12" md="6" xl="3" height="40">
                  <MinimalStatisticsChart
                     cardBgColor="gradient-blackberry"
                     statistics="256"
                     text="Documentations"
                     iconSide="right"
                  >
                     <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     cardBgColor="gradient-ibiza-sunset"
                     statistics="17"
                     text="Pages"
                     iconSide="right"
                  >
                     <Icon.Box size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     cardBgColor="gradient-green-teal"
                     statistics="45"
                     text="Actualités"
                     iconSide="right"
                  >
                     <Icon.Filter size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     cardBgColor="gradient-pomegranate"
                     statistics="4"
                     text="Partenaires"
                     iconSide="right"
                  >
                     <Icon.DollarSign size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
            </Row>

            {/* Visit - Sales Statistics & Weekly Statistics */}
     
            <Row className="row-eq-height">
               <Col sm="12" md="6">
                  <VisitSalesStatisticsCard
                     visitSalesData={AdvancedCardData.VisitSalesData}
                     cardTitle="Fréquence des vistes"
                     visitText={false}
                  />
               </Col>
               <Col sm="12" md="6">
                  <VisitSalesStatisticsCard
                     visitSalesData={AdvancedCardData.VisitSalesData}
                     cardTitle="Fréquence des commentaires"
                     visitText={false}
                  />
               </Col>
            </Row> 
         </Fragment>
      );
   }
}

export default EcommerceDashboard;
