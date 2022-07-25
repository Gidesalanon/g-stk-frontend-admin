import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import ProduitListComponent from '../components/produits/list';
import ProduitFormComponent from '../components/produits/form';
import ProduitPreviewComponent from '../components/produits/preview';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

class ProduitPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onProduitAdded = this.onProduitAdded.bind(this);
    this.onProduitEdited = this.onProduitEdited.bind(this);
    this.onProduitRemoved = this.onProduitRemoved.bind(this);
  }

  onProduitAdded(success) {
    if (success) {
      toastr.success('Informations !','Produits ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onProduitEdited(success) {
    if (success) {
      toastr.success('Informations !','Produits modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onProduitRemoved(success) {
    if(success) {
      toastr.success('Informations !','Produits supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentProduit(null);
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
          <ContentHeader className="col-md-6">Produits </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouveau produit
            </Button>
          </div>
        </Row>

        <ProduitListComponent successRemove={this.onProduitRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewProduit(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewProduit(null) }>Détails du produit "{ this.props.preview ? this.props.preview.name : '' }"</ModalHeader>
            <ProduitPreviewComponent closePreviewModal={()=> this.props.setPreviewProduit(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un produit</ModalHeader>
            <ProduitFormComponent onRequestSent={this.onProduitAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du produit "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <ProduitFormComponent onRequestSent={this.onProduitEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ produit: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProduit: (current) => dispatch({ type: 'current-produit', current }),
    setPreviewProduit: (preview) => {
        dispatch({ type: 'preview-produit', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(ProduitPage)
