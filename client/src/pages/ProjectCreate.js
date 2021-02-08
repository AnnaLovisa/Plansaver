import React, { Component } from 'react'
import Modal from "../components/Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal, setCurrentModalContent } from "../actions/modalActions";
import api from '../api'

class ProjectCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectName: '',      
            modalData: { name: "" }      
        }
    }

    closeModal = () => {
        this.props.openToggleModal(false);
        this.props.setCurrentModalContent(this.state.modalData.name)
    }

    handleChangeCreateProject = async event => {
        const projectName = event.target.value
        this.setState({ projectName })
    }

    handleIncludeProject = async () => {
        const { user } = this.props.auth;
        const projectInput = {
            projectName: this.state.projectName,
            userId: user.id,
            listIds: []
        }
        const payload = projectInput

        await api.createProject(payload).then(res => {
            window.alert(`Project created successfully`)
            this.setState({
                projectName: ''
            })
        })
    }

    render() {
        const { projectName } = this.state
        return (
            <div>
                <Modal show={this.props.modal.isToggled}>
                <h4>Nytt projekt</h4>
                <form>
                <input
                    type="text"
                    value={ projectName }
                    onChange={ this.handleChangeCreateProject }
                />
                <button onClick={this.handleIncludeProject}>Create Project</button>
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

ProjectCreate.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal } = state;
    return {
        auth,
        modal
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent })(ProjectCreate);