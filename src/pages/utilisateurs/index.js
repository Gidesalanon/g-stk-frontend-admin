import 'react-table/react-table.css';

import React, { useState } from 'react';

import { PlusCircle } from 'react-feather';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  Button,
  Modal,
  ModalHeader,
} from 'reactstrap';

import ContentHeader from '../../components/contentHead/contentHeader';
import UtilisateurFormComponent from '../../components/utilisateur/UtilisateurForm';
import UtilisateurListComponent from '../../components/utilisateur/UtilisateurList';

  const  UtilisateurPage = ({current,setCurrentUtilisateur})=>{

  const [openModalAdd, setOpenModalAdd] = useState(false)

  const toogleModalAdd = ()=> setOpenModalAdd(!openModalAdd)
  const toogleModalEdit = ()=> setCurrentUtilisateur(null)

  const successAdd = (error=false)=>{
    if(!error) {
      toastr.success('Informations !',"Utilisateur  ajouté avec succès",{ position: 'top-center'})
      toogleModalAdd()
    }else{
      toastr.warning('Informations !',"Erreur lors de la soumission des données",{ position: 'top-center'})
    }
  }

  const successEdit = (error=false)=>{
    if(!error) {
      toastr.success('Informations !',"Utilisateur modifié avec succès",{ position: 'top-center'})
      toogleModalEdit()
    }else{
      toastr.warning('Informations !',"Erreur lors de la soumission des données",{ position: 'top-center'})
    }
  }

  const successRemove = (error=false)=>{
    if(!error) {
      toastr.success('Informations !',"Utilisateur supprimé avec succès",{ position: 'top-center'})
    }else{
      toastr.warning('Informations !',"Erreur lors de la soumission des données",{ position: 'top-center'})
    }
  }
  return (
    <>
      <ContentHeader>Liste des utilisateurs</ContentHeader>
        <div className="text-right">
          <Button style={{ padding:'10px' }} color="primary" type="button" onClick={()=>{toogleModalAdd(true)}}>
            <PlusCircle size={16} color="#FFF" /> Ajouter un utilisateur
          </Button>
        </div>

      <UtilisateurListComponent successRemove={successRemove}/>

      <Modal isOpen={openModalAdd} toggle={()=>toogleModalAdd()} size="md">
           <ModalHeader toggle={()=>toogleModalAdd()}>Ajout d'un utilisateur</ModalHeader>
           <UtilisateurFormComponent successAdd={successAdd}  />
      </Modal>

      <Modal isOpen={current?true:false} toggle={()=>toogleModalEdit()} size="md">
           <ModalHeader toggle={()=>toogleModalEdit()}>Modification de "{current?current.username:null}"</ModalHeader>
           <UtilisateurFormComponent successEdit={successEdit}  />
      </Modal>

    </>
  )
}

const mapStateProps = (state) => ({
  current: state.utilisateur.current
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUtilisateur: (current) => dispatch({ type: 'current-utilisateur', current }),
  }
}

export default connect(mapStateProps, mapDispatchToProps)(UtilisateurPage)
