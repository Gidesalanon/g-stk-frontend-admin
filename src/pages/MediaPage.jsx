import React, { Component } from 'react';
import 'react-table/react-table.css';
import { PlusCircle, HelpCircle } from 'react-feather';
import { Button,Row } from 'reactstrap';
import { connect } from 'react-redux'
import ContentHeader from '../components/contentHead/contentHeader';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MediaListComponent from '../components/medias/list';
import MediaFormComponent from '../components/medias/form';
import MediaPreviewComponent from '../components/medias/preview';
import { toastr } from 'react-redux-toastr';
import { Link  } from "react-router-dom";

class MediaPage extends Component {
  state = {
    openAddModal: false,
    openEditModal: false,
    helpTuto: false
  };

  constructor() {
    super();

    this.onMediaAdded = this.onMediaAdded.bind(this);
    this.onMediaEdited = this.onMediaEdited.bind(this);
    this.onMediaRemoved = this.onMediaRemoved.bind(this);
  }

  onMediaAdded(success) {
    if (success) {
      toastr.success('Informations !','Média ajouté avec succès',{ position: 'top-center'});
      this.setState({ openAddModal: false });
    } else {
      // toastr.warning('Informations !','Erreur lors de la soumission des données', { position: 'top-center'});
    }
  }

  onMediaEdited(success) {
    if (success) {
      toastr.success('Informations !','Média modifié avec succès',{ position: 'top-center'});
      this.setState({ openEditModal: false });
    } else {
      toastr.warning('Informations !','Erreur lors de la soumission des données',{ position: 'top-center'});
    }
  }

  onMediaRemoved(success) {
    if(success) {
      toastr.success('Informations !','Média supprimé avec succès',{ position: 'top-center'})
    } else {
      toastr.warning('Informations !','Erreur lors de la suppression des données',{ position: 'top-center'})
    }
  }

  closeEditModal() {
    this.props.setCurrentMedia(null);
  }

  render() {
    return (
      <>
        <Row>
          <ContentHeader className="col-md-4">Les Médias</ContentHeader>
          <div className="text-right col-md-8">
            <HelpCircle size={24} strokeWidth={1} title="Aide"
              onClick={()=> this.setState({helpTuto: true}) } 
              style={{ position:'relative', bottom:'3px', margin:'0 25px',cursor:'pointer' }} />
            <Link to="/albums">
              <Button style={{ padding:'10px',margin:'3px' }} color="success" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
                Voir les Albums
              </Button>
            </Link>
            <Button style={{ padding:'10px',margin:'3px' }} color="primary" type="button" onClick={()=>{ this.setState({ openAddModal: true }) }}>
              <PlusCircle size={16} color="#FFF" /> Ajouter Média(s)
            </Button>
          </div>
        </Row>

        <MediaListComponent successRemove={this.onMediaRemoved}/>

        <Modal isOpen={ this.state.helpTuto } toggle={() => this.setState({helpTuto: false})} size='md'>
            <ModalHeader toggle={()=> this.setState({helpTuto: false}) }>Comment utiliser le menu des médias ?</ModalHeader>
            <ModalBody>
              Cliquer sur le botton "Ajouter Média(s)" pour afficher le formulaire d'ajout.<br/>
              Renseigner chaque champ avec les données de type adéquat.<br/>
              Selectionner un ou plusieurs fichiers valides.
              Vérifier la présence des informations sur le formulaire puis cliquer sur le boutton "Envoyer"
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={()=> this.setState({helpTuto: false}) }>Fermer</Button>
            </ModalFooter>
        </Modal>
        
        <Modal isOpen={ this.props.preview ? true : false } toggle={() => this.props.setPreviewMedia(null)} size='md'>
            <ModalHeader toggle={()=> this.props.setPreviewMedia(null) }>Prévisualisation du média "{ this.props.preview ? this.props.preview.title : '' }"</ModalHeader>
            <MediaPreviewComponent closePreviewModal={()=> this.props.setPreviewMedia(null) } />
        </Modal>
        
        <Modal isOpen={this.state.openAddModal}>
            <ModalHeader toggle={()=> this.setState({ openAddModal: false }) }>Ajout d'un média</ModalHeader>
            <MediaFormComponent onRequestSent={this.onMediaAdded}  />
        </Modal>

        <Modal isOpen={ this.props.current ? true : false }>
            <ModalHeader toggle={()=> this.closeEditModal() }>Modification du média "{ this.props.current ? this.props.current.title : '' }"</ModalHeader>
            <MediaFormComponent onRequestSent={this.onMediaEdited} />
        </Modal>
      </>
    )
  }
}

const mapStateProps = ({ media: { current,preview }}) => {
  return { current,preview };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMedia: (current) => dispatch({ type: 'current-media', current }),
    setPreviewMedia: (preview) => {
        dispatch({ type: 'preview-media', preview })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(MediaPage)
