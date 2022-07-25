import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import CommandeListComponent from '../components/commandes/list';
import CommandeFormComponent from '../components/commandes/form';
import CommandePreviewComponent from '../components/commandes/preview';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

class CommandePage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onCommandeAdded = this.onCommandeAdded.bind(this);
    this.onCommandeEdited = this.onCommandeEdited.bind(this);
    this.onCommandeRemoved = this.onCommandeRemoved.bind(this);
  }

  onCommandeAdded(success) {
    if (success) {
      toastr.success('Informations !','Commande ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onCommandeEdited(success) {
    if (success) {
      toastr.success('Informations !','Commande modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onCommandeRemoved(success) {
    if(success) {
      toastr.success('Informations !','Commande supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentCommande(null);
  }

  render() {
    return (
      <>
        
        <Row>
          <div className="breacumbs">
            <Link to="/">
              <Home size={16} />
            </Link> &nbsp; / &nbsp; 
            <Link to="/commandes/sourcing">Entrées</Link> &nbsp; / &nbsp; 
            <Link to="/commandes">Sorties</Link>
          </div>
        </Row>

        <Row>
          <ContentHeader className="col-md-6">Sorties de stock </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouvelle commande
            </Button>
          </div>
        </Row>

        <CommandeListComponent successRemove={this.onCommandeRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewCommande(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewCommande(null) }>Détails de la commande "{ this.props.preview ? this.props.preview.name : '' }"</ModalHeader>
            <CommandePreviewComponent closePreviewModal={()=> this.props.setPreviewCommande(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une commande produits</ModalHeader>
            <CommandeFormComponent onRequestSent={this.onCommandeAdded} />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de la commande "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <CommandeFormComponent onRequestSent={this.onCommandeEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ commande: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCommande: (current) => dispatch({ type: 'current-commande', current }),
    setPreviewCommande: (preview) => {
        dispatch({ type: 'preview-commande', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(CommandePage)
