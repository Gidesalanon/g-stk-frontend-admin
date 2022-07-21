import React, { PureComponent } from "react";
import { Card, CardHeader, CardTitle, Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ShoppingCartCard extends PureComponent {
   render() {
      const shoppingList = this.props.shoppingCart;
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            <Table responsive className="text-center">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Type</th>
                     <th>Permalien</th>
                     <th>Nombre de visites</th>
                  </tr>
               </thead>
               <tbody>
                  {shoppingList.list.map((object, i) => {
                     
                     return (
                        <tr key={i}>
                           <td>{i+1}</td>
                           <td>{object.product}</td>
                           <td>{object.status}</td>
                           <td>{object.quantity}</td>
                        </tr>
                     );
                  })}
                  {shoppingList.list.map((object, i) => {
                     
                     return (
                        <tr key={i}>
                           <td>{i+5}</td>
                           <td>{object.product}</td>
                           <td>{object.status}</td>
                           <td>{object.quantity}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </Card>
      );
   }
}

ShoppingCartCard.propTypes = {
   cardTitle: PropTypes.string,
   shoppingCart: PropTypes.object
};

export default ShoppingCartCard;
