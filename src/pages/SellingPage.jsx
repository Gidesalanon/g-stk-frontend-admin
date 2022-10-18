import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import SellingListComponent from '../components/sellings/list';
import SellingFormComponent from '../components/sellings/form';
import SellingPreviewComponent from '../components/sellings/preview';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

class SellingPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onSellingAdded = this.onSellingAdded.bind(this);
    this.onSellingEdited = this.onSellingEdited.bind(this);
    this.onSellingRemoved = this.onSellingRemoved.bind(this);
  }

  onSellingAdded(success) {
    if (success) {
      toastr.success('Informations !','Vente ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onSellingEdited(success) {
    if (success) {
      toastr.success('Informations !','Vente modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onSellingRemoved(success) {
    if(success) {
      toastr.success('Informations !','Vente supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentSelling(null);
  }

  render() {
    return (
      <>
        
        <Row>
          <ContentHeader className="col-md-6">Sorties de stock </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouvelle Vente
            </Button>
          </div>
        </Row>

        <SellingListComponent successRemove={this.onSellingRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewSelling(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewSelling(null) }>{ this.props.preview ? this.props.preview.description : '' }</ModalHeader>
            <SellingPreviewComponent closePreviewModal={()=> this.props.setPreviewSelling(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal} size='lg'>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une vente de produits</ModalHeader>
            <SellingFormComponent onRequestSent={this.onSellingAdded} />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false } size='lg'>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de la commande </ModalHeader>
            <SellingFormComponent onRequestSent={this.onSellingEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ selling: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentSelling: (current) => dispatch({ type: 'current-selling', current }),
    setPreviewSelling: (preview) => {
        dispatch({ type: 'preview-selling', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(SellingPage)
