import 'react-table/react-table.css';

import React, { Component } from 'react';

import { PlusCircle } from 'react-feather';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  Button,
  Modal,
  ModalHeader,
} from 'reactstrap';

import ContentHeader from '../components/contentHead/contentHeader';
import ApplicationFormComponent from '../components/applications/form';
import ApplicationListComponent from '../components/applications/list';
import ApplicationPreviewComponent from '../components/applications/preview';

class ApplicationPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    openPreviewModal: false
  };

  constructor() {
    super();

    this.onApplicationAdded = this.onApplicationAdded.bind(this);
    this.onApplicationEdited = this.onApplicationEdited.bind(this);
    this.onApplicationRemoved = this.onApplicationRemoved.bind(this);
  }

  onApplicationAdded(success) {
    if (success) {
      toastr.success('Informations !','Application ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onApplicationEdited(success) {
    if (success) {
      toastr.success('Informations !','Application modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onApplicationRemoved(success) {
    if(success) {
      toastr.success('Informations !','Application supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentApplication(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des applications</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter une application
          </Button>
        </div>

        <ApplicationListComponent successRemove={this.onApplicationRemoved}/>

        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewApplication(null)} size="lg">
            <ModalHeader toggle={()=> this.props.setPreviewApplication(null) }>Prévisualisation de l'application "{ this.props.preview ? this.props.preview.title : '' }"</ModalHeader>
            <ApplicationPreviewComponent closePreviewModal={()=> this.props.setPreviewApplication(null) } />
        </Modal>

        <Modal isOpen={this.state.openAddModal} toggle={() => this.setState({ openAddModal: false })} size="md">
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une application</ModalHeader>
            <ApplicationFormComponent onRequestSent={this.onApplicationAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }  toggle={() => this.closeEditModal()} size="md">
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de l'application "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <ApplicationFormComponent onRequestSent={this.onApplicationEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ application: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentApplication: (current) => dispatch({ type: 'current-application', current }),
    setPreviewApplication: (preview) => {
        dispatch({ type: 'preview-application', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(ApplicationPage)
