import React from "react";
// import { Offline } from "react-detect-offline"
// import { Link } from "react-router-dom";
// import { UncontrolledAlert } from "reactstrap";

const Footer = props => (
   <>
      {/* <Offline>
            <UncontrolledAlert color="warning" style={{ zIndex:999, position: 'fixed', bottom: '15px', right: '30px'}}>
               Vous êtes hors ligne en ce moment. <br/>
               Vérifiez votre connexion internet. <br/>
               Cliquez <Link to="/logout">ici</Link> pour vous reconnecter au serveur.
            </UncontrolledAlert>
      </Offline> */}
      <footer data-tut="footer">
         <div className="container-fluid">
            <p className="text-center">
               © {new Date().getFullYear()!==2022&&"2022-" }{ new Date().getFullYear() + " "}
               G-STK{" "}
               Copyright  <i className="ft-heart font-small-3" />            
               <a href="https://kal-group.com" rel="noopener noreferrer" target="_blank">
                  {" "}
                  KDL FOURNITURES
               </a>
            </p>
         </div>
      </footer>
   </>
);

export default Footer;
