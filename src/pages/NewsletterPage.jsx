import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader } from 'reactstrap';
import NewsletterListComponent from '../components/newsletters/list';
import NewsletterFormComponent from '../components/newsletters/form';
import { toastr } from 'react-redux-toastr';

class NewsletterPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false
  };

  constructor() {
    super();

    this.onNewsletterAdded = this.onNewsletterAdded.bind(this);
    this.onNewsletterEdited = this.onNewsletterEdited.bind(this);
    this.onNewsletterRemoved = this.onNewsletterRemoved.bind(this);
  }

  onNewsletterAdded(success) {
    if (success) {
      toastr.success('Informations !','Contact de newsletter ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onNewsletterEdited(success) {
    if (success) {
      toastr.success('Informations !','Contact de newsletter modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onNewsletterRemoved(success) {
    if(success) {
      toastr.success('Informations !','Contact de newsletter supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentNewsletter(null);
  }

  render() {
    return (
      <>
        <ContentHeader>Liste des contacts de newsletter</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
            <PlusCircle size={16} color="#FFF" /> Ajouter un contact de newsletter
          </Button>
        </div>

        <NewsletterListComponent successRemove={this.onNewsletterRemoved}/>

        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un contact de newsletter</ModalHeader>
            <NewsletterFormComponent onRequestSent={this.onNewsletterAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du contact "{ this.props.current ? this.props.current.name : '' }"</ModalHeader>
            <NewsletterFormComponent onRequestSent={this.onNewsletterEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ newsletter: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNewsletter: (current) => dispatch({ type: 'current-newsletter', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(NewsletterPage)
