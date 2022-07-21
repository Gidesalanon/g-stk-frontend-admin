import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader } from 'reactstrap';
import UserListComponent from '../components/users/list';
import UserFormComponent from '../components/users/form';
import { toastr } from 'react-redux-toastr';

class User extends Component {
  state = {
    openAddModal: false,
    openEditModal: false
  };

  constructor() {
    super();

    this.onUserAdded = this.onUserAdded.bind(this);
    this.onUserEdited = this.onUserEdited.bind(this);
    this.onUserRemoved = this.onUserRemoved.bind(this);
  }

  onUserAdded(success) {
    if (success) {
      toastr.success('Informations !','Un utilisateur a été ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onUserEdited(success) {
    if (success) {
      toastr.success('Informations !', 'Un utilisateur a été modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !', 'Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onUserRemoved(success) {
    if(success) {
      toastr.success('Informations !', 'Un utilisateur a été supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !', 'Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentUser(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des utilisateurs</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter un utilisateur 
          </Button>
        </div>

        <UserListComponent successRemove={this.onUserRemoved}/>

        <Modal isOpen={this.state.openAddModal} size='md'>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un utilisateur</ModalHeader>
            <UserFormComponent onRequestSent={this.onUserAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false } size='md'>
            <ModalHeader toggle={()=> this.closeEditModal() }>Mise à jour des infos utilisateur pour "{ this.props.current ? this.props.current.username : '' }"</ModalHeader>
            <UserFormComponent onRequestSent={this.onUserEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({  user: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (current) => dispatch({ type: 'current-user', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(User)
