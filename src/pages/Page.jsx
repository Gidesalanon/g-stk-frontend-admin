import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, HelpCircle } from 'react-feather';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PageListComponent from '../components/pages/list';
import PageFormComponent from '../components/pages/form';
import { toastr } from 'react-redux-toastr';

class Page extends Component {
  state = {
    helpTuto: false,
    openAddModal: false,
    openEditModal: false
  };

  constructor() {
    super();

    this.onPageAdded = this.onPageAdded.bind(this);
    this.onPageEdited = this.onPageEdited.bind(this);
    this.onPageRemoved = this.onPageRemoved.bind(this);
  }

  onPageAdded(success) {
    if (success) {
      toastr.success('Informations !','Page ajoutée avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onPageEdited(success) {
    if (success) {
      toastr.success('Informations !', 'Page modifiée avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !', 'Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onPageRemoved(success) {
    if(success) {
      toastr.success('Informations !', 'Page supprimée avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !', 'Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentPage(null);
  }

  render() {
    return (
      <>
        <Row>
            <ContentHeader className="col-md-6">Liste des pages</ContentHeader>
            <div className="text-right col-md-6">
              <HelpCircle size={24} strokeWidth={1} title="Aide"
                onClick={()=> this.setState({helpTuto: true}) } 
                style={{ position:'relative', bottom:'5px', margin:'0 25px',cursor:'pointer' }} />
              <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
                <PlusCircle size={16} color="#FFF" /> Ajouter une page 
              </Button>
            </div>
        </Row>

        <PageListComponent successRemove={this.onPageRemoved}/>

        <Modal isOpen={ this.state.helpTuto } toggle={() => this.setState({helpTuto: false})} size='md'>
            <ModalHeader toggle={()=> this.setState({helpTuto: false}) }>Comment utiliser le menu des Pages ?</ModalHeader>
            <ModalBody>
              Cliquer sur le botton "Ajouter une page" pour afficher le formulaire d'ajout.<br/>
              Renseigner chaque champ avec les données de type adéquat.<br/>
              Vérifier la présence des informations sur le formulaire puis cliquer sur le boutton "Envoyer"
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={()=> this.setState({helpTuto: false}) }>Fermer</Button>
            </ModalFooter>
        </Modal>
        
        <Modal isOpen={this.state.openAddModal} size='lg'>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'une page</ModalHeader>
            <PageFormComponent onRequestSent={this.onPageAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false } size='lg'>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification de la page"{ this.props.current ? this.props.current.title : '' }"</ModalHeader>
            <PageFormComponent onRequestSent={this.onPageEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({  page: { current }}) => {
  return { current };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPage: (current) => dispatch({ type: 'current-page', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Page)
