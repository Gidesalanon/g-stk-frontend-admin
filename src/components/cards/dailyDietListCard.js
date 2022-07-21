import React, { PureComponent } from "react";
import {
   Card,
   CardHeader,
   CardTitle,
   CardBody,
   ListGroup,
   ListGroupItem,
   Badge
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import imgEmpty from "../../assets/img/empty_file.jpg"

class DailyDietListCard extends PureComponent {
   render() {
      const dietList = this.props.dailyDietList;
      return (
         <Card>
            <CardHeader>
               <CardTitle className="mb-0">{this.props.cardTitle}</CardTitle>
            </CardHeader>
            {this.props.cardSubTitle&&<CardBody>
               <p className="card-text">{this.props.cardSubTitle}</p>
            </CardBody>}
            <ListGroup>
               {dietList.list.map((object, i) => {
                  return (
                     <ListGroupItem className="justify-content-between" key={i}>
                        {object.item}{" "}
                        {object.quantity&&<Badge
                           pill
                           className={classnames(
                              "white float-right",
                              object.priorityColor
                           )}
                        >
                           {object.quantity}
                        </Badge>}
                     </ListGroupItem>
                  );
               })}
               {!dietList.list.length && 
                  <div className="text-center">
                     <img src={imgEmpty} className="px-1" />
                     <p className="text-center">Aucun résultat disponible</p>
                  </div>
               }
            </ListGroup>
         </Card>
      );
   }
}

DailyDietListCard.propTypes = {
   cardTitle: PropTypes.string,
   cardSubTitle: PropTypes.string,
   dailyDietList: PropTypes.object
};

export default DailyDietListCard;
