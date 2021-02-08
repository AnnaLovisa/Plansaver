import React, { Component } from 'react'
import Modal from "../components/Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal, setCurrentModalContent } from "../actions/modalActions";
import api from '../api'

class NotesInsert extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: '',
            modalData: { name: "" }
        }
    }

    closeModal = () => {
        this.props.openToggleModal(false);
        this.props.setCurrentModalContent(this.state.modalData.name)
    }

    handleChangeInputText = async event => {
        const name = event.target.name
        this.setState({ [name]: event.target.value })
    }

    handleIncludeNote = async () => {
        const { user } = this.props.auth;
        const noteInput = {
            title: this.state.title,
            text: this.state.text,
            userId: user.id
        }
        const payload = noteInput

        await api.insertNote(payload).then(res => {
            window.alert(`Note inserted successfully`)
            this.setState({
                title: '',
                text: ''
            })
        })
    }

    render() {
        const { title, text } = this.state
        return (
            <div>
                <Modal show={this.props.modal.isToggled}>
                    <div className="insertNote">
                        <h4>Ny notis</h4>
                        <form>
                        <label>Titel: </label>
                        <input
                            name="title"
                            type="text"
                            value={ title }
                            onChange={ this.handleChangeInputText }
                        />
                        <label>Text: </label>
                        <input
                            name="text"
                            type="text"
                            value={ text }
                            onChange={ this.handleChangeInputText }
                        />
                        <button onClick={this.handleIncludeNote}>Skapa notis</button>
                        </form>
                        <div className="footer">
                            <button onClick={this.closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

NotesInsert.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal } = state;
    return {
        auth,
        modal
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent })(NotesInsert);