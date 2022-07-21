// import external modules
import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";

const Guide = () => {

   return (
      <Fragment>
         <Row>
            <Col xs="12">
               <div className="content-header"> </div>
            </Col>
         </Row>
         <Row>
            <Col xs="12">
               <iframe frameBorder="0" allowFullScreen src={process.env.PUBLIC_URL+"/guide.pdf"} style={{width:'100%', height: 'calc(100vh - 175px)'}} >
                  <p>
                     Les PDF ne sont pas pris en charge par votre navigateur.<br/>
                     Cliquez <a href={process.env.PUBLIC_URL+"/guide.pdf"} target="_blanc">ici</a> pour télécharger le fichier sur votre appareil.
                  </p>
               </iframe>
            </Col>
         </Row>
      </Fragment>
   );
};

export default Guide;
