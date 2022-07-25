import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import EntrepriseListComponent from '../components/entreprises/list';
import EntrepriseFormComponent from '../components/entreprises/form';
import EntreprisePreviewComponent from '../components/entreprises/preview';
import { toastr } from 'react-redux-toastr';

class EntreprisePage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onEntrepriseAdded = this.onEntrepriseAdded.bind(this);
    this.onEntrepriseEdited = this.onEntrepriseEdited.bind(this);
    this.onEntrepriseRemoved = this.onEntrepriseRemoved.bind(this);
  }

  onEntrepriseAdded(success) {
    if (success) {
      toastr.success('Informations !','Entreprise ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onEntrepriseEdited(success) {
    if (success) {
      toastr.success('Informations !','Entreprise modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onEntrepriseRemoved(success) {
    if(success) {
      toastr.success('Informations !','Entreprise supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentEntreprise(null);
  }

  render() {
    return (
      <>
        
        <Row>
          <ContentHeader className="col-md-6">Entreprises </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouvelle entreprise
            </Button>
          </div>
        </Row>

        <EntrepriseListComponent successRemove={this.onEntrepriseRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewEntreprise(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewEntreprise(null) }>Détails de l'entreprise "{ this.props.preview ? this.props.preview.name : '' }"</ModalHeader>
            <EntreprisePreviewComponent closePreviewModal={()=> this.props.setPreviewEntreprise(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une entreprise produit</ModalHeader>
            <EntrepriseFormComponent onRequestSent={this.onEntrepriseAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de l'entreprise "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <EntrepriseFormComponent onRequestSent={this.onEntrepriseEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ entreprise: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentEntreprise: (current) => dispatch({ type: 'current-entreprise', current }),
    setPreviewEntreprise: (preview) => {
        dispatch({ type: 'preview-entreprise', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(EntreprisePage)
