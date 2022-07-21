import React, { Component } from 'react';

import { toastr } from 'react-redux-toastr';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

class DeleteModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>
                    Launch Modal
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    backdrop="static"
                >
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Voulez-vous vraiment supprimé cette page statique?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={ ()=>toastr.success('suppression', 'page supprimée')}>
                            Do Something
                        </Button>{" "}
                        <Button color="dark" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DeleteModal;