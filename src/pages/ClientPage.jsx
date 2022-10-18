import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, Home } from 'react-feather';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Button, Row, Modal, ModalHeader } from 'reactstrap';
import ClientListComponent from '../components/clients/list';
import ClientFormComponent from '../components/clients/form';
import ClientPreviewComponent from '../components/clients/preview';
import { toastr } from 'react-redux-toastr';

class ClientPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openAddModal: false
  };

  constructor() {
    super();

    this.onClientAdded = this.onClientAdded.bind(this);
    this.onClientEdited = this.onClientEdited.bind(this);
    this.onClientRemoved = this.onClientRemoved.bind(this);
  }

  onClientAdded(success) {
    if (success) {
      toastr.success('Informations !','Client ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onClientEdited(success) {
    if (success) {
      toastr.success('Informations !','Client modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onClientRemoved(success) {
    if(success) {
      toastr.success('Informations !','Client supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentClient(null);
  }

  render() {
    return (
      <>
        
        <Row>
          <ContentHeader className="col-md-6">Clients </ContentHeader>
          <div className="text-right col-md-6">
            <Button style={{ padding:'10px' }} color="info" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Nouvelle client
            </Button>
          </div>
        </Row>

        <ClientListComponent successRemove={this.onClientRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewClient(null)} size='lg'>
            <ModalHeader toggle={()=> this.props.setPreviewClient(null) }>Détails du client "{ this.props.preview ? this.props.preview.lastname : '' }"</ModalHeader>
            <ClientPreviewComponent closePreviewModal={()=> this.props.setPreviewClient(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un client produit</ModalHeader>
            <ClientFormComponent onRequestSent={this.onClientAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du client "{ this.props.current ? this.props.current.lastname : '' }"</ModalHeader>
            <ClientFormComponent onRequestSent={this.onClientEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ client: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentClient: (current) => dispatch({ type: 'current-client', current }),
    setPreviewClient: (preview) => {
        dispatch({ type: 'preview-client', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(ClientPage)
