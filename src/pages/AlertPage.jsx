import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader } from 'reactstrap';
import AlertListComponent from '../components/alerts/list';
import AlertFormComponent from '../components/alerts/form';
import { toastr } from 'react-redux-toastr';

class AlertPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false
  };

  constructor() {
    super();

    this.onAlertAdded = this.onAlertAdded.bind(this);
    this.onAlertEdited = this.onAlertEdited.bind(this);
    this.onAlertRemoved = this.onAlertRemoved.bind(this);
  }

  onAlertAdded(success) {
    if (success) {
      toastr.success('Informations !','Alerte ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onAlertEdited(success) {
    if (success) {
      toastr.success('Informations !','Alerte modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onAlertRemoved(success) {
    if(success) {
      toastr.success('Informations !','Alerte supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentAlert(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des alertes</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter une alerte
          </Button>
        </div>

        <AlertListComponent successRemove={this.onAlertRemoved}/>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une alerte</ModalHeader>
            <AlertFormComponent onRequestSent={this.onAlertAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de l'alerte "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <AlertFormComponent onRequestSent={this.onAlertEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ alert: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentAlert: (current) => dispatch({ type: 'current-alert', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(AlertPage)
