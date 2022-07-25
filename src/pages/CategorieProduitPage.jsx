import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import CategorieProduitListComponent from '../components/categorie_produits/list';
import CategorieProduitFormComponent from '../components/categorie_produits/form';
import CategorieProduitPreviewComponent from '../components/categorie_produits/preview';
import { Link } from 'react-router-dom';
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
      toastr.success('Informations !','Catégorie ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onCategorieProduitEdited(success) {
    if (success) {
      toastr.success('Informations !','Catégorie modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onCategorieProduitRemoved(success) {
    if(success) {
      toastr.success('Informations !','Catégorie supprimée avec succès',{ position: 'top-center'})
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
        
        <Row>
          <div className="breacumbs">
            <Link to="/">
              <Home size={16} />
            </Link> &nbsp; / &nbsp; 
            <Link to="/products">Liste</Link> &nbsp; / &nbsp; 
            <Link to="/products/categories">Catégories</Link>
          </div>
        </Row>

        <Row>
          <ContentHeader className="col-md-6">Categories de produits </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouvelle catégorie
            </Button>
          </div>
        </Row>

        <CategorieProduitListComponent successRemove={this.onCategorieProduitRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewCategorieProduit(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewCategorieProduit(null) }>Détails de la catégorie "{ this.props.preview ? this.props.preview.name : '' }"</ModalHeader>
            <CategorieProduitPreviewComponent closePreviewModal={()=> this.props.setPreviewCategorieProduit(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une catégorie produit</ModalHeader>
            <CategorieProduitFormComponent onRequestSent={this.onCategorieProduitAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de la catégorie "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
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
