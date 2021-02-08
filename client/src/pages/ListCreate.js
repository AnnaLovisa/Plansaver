import React, { Component } from 'react'
import Modal from "../components/Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal, setCurrentModalContent } from "../actions/modalActions";
import api from '../api'

class ListCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            modalData: { name: "" } 
        }
    }

    closeModal = () => {
        this.props.openToggleModal(false);
        this.props.setCurrentModalContent(this.state.modalData.name)
    }

    handleChangeCreateList = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleIncludeList = async () => {
        const { user } = this.props.auth;
        const listInput = {
            title: this.state.title,
            userId: user.id
        }
        const payload = listInput

        await api.createList(payload).then(res => {
            window.alert(`List created successfully`)
            this.setState({
                title: ''
            })
        })
    }

    render() {
        const { title } = this.state

        return (
            <div>
                <Modal show={this.props.modal.isToggled}>
                <h4>Ny lista</h4>
                <form>
                <input
                    type="text"
                    value={ title }
                    onChange={ this.handleChangeCreateList }
                />
                <button onClick={this.handleIncludeList}>Skapa lista</button>
                </form>
                <div className="footer">
                    <button onClick={this.closeModal}>
                        Close
                    </button>
                </div>
                </Modal>
            </div>
        )
    }
}

ListCreate.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal } = state;
    return {
        auth,
        modal
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent })(ListCreate);