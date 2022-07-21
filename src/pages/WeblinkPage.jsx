import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader } from 'reactstrap';
import WeblinkListComponent from '../components/weblinks/list';
import WeblinkFormComponent from '../components/weblinks/form';
import { toastr } from 'react-redux-toastr';

class WeblinkPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false
  };

  constructor() {
    super();

    this.onWeblinkAdded = this.onWeblinkAdded.bind(this);
    this.onWeblinkEdited = this.onWeblinkEdited.bind(this);
    this.onWeblinkRemoved = this.onWeblinkRemoved.bind(this);
  }

  onWeblinkAdded(success) {
    if (success) {
      toastr.success('Informations !','Lien ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onWeblinkEdited(success) {
    if (success) {
      toastr.success('Informations !','Lien modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onWeblinkRemoved(success) {
    if(success) {
      toastr.success('Informations !','Lien supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentWeblink(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des liens utiles</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter un lien utile
          </Button>
        </div>

        <WeblinkListComponent successRemove={this.onWeblinkRemoved}/>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un lien utile</ModalHeader>
            <WeblinkFormComponent onRequestSent={this.onWeblinkAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du lien utile "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <WeblinkFormComponent onRequestSent={this.onWeblinkEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ weblink: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentWeblink: (current) => dispatch({ type: 'current-weblink', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(WeblinkPage)
