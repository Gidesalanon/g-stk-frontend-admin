import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader } from 'reactstrap';
import CategorieProduitListComponent from '../components/categorie_produits/list';
import CategorieProduitFormComponent from '../components/categorie_produits/form';
import CategorieProduitPreviewComponent from '../components/categorie_produits/preview';
import { toastr } from 'react-redux-toastr';

class CategorieProduitPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onCategorieProduitAdded = this.onCategorieProduitAdded.bind(this);
    this.onCategorieProduitEdited = this.onCategorieProduitEdited.bind(this);
    this.onCategorieProduitRemoved = this.onCategorieProduitRemoved.bind(this);
  }

  onCategorieProduitAdded(success) {
    if (success) {
      toastr.success('Informations !','Produits ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onCategorieProduitEdited(success) {
    if (success) {
      toastr.success('Informations !','Produits modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onCategorieProduitRemoved(success) {
    if(success) {
      toastr.success('Informations !','Produits supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentCategorieProduit(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des produits</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter un produit
          </Button>
        </div>

        <CategorieProduitListComponent successRemove={this.onCategorieProduitRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewCategorieProduit(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewCategorieProduit(null) }>Prévisualisation du produit "{ this.props.preview ? this.props.preview.title : '' }"</ModalHeader>
            <CategorieProduitPreviewComponent closePreviewModal={()=> this.props.setPreviewCategorieProduit(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un produit</ModalHeader>
            <CategorieProduitFormComponent onRequestSent={this.onCategorieProduitAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du produit "{ this.props.current ? this.props.current.title : '' }"</ModalHeader>
            <CategorieProduitFormComponent onRequestSent={this.onCategorieProduitEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ categorie_produit: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCategorieProduit: (current) => dispatch({ type: 'current-categorie_produit', current }),
    setPreviewCategorieProduit: (preview) => {
        dispatch({ type: 'preview-categorie_produit', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(CategorieProduitPage)
