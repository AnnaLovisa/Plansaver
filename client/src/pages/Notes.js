import React, { Component } from 'react'
import NotesInsert from './NotesInsert'
import api from '../api'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal } from "../actions/modalActions";

export class UpdateNote extends Component {
    updateNote = (event) => {
        event.preventDefault()
        window.location.href = `/dashboard/notes/update/${this.props.id}`
    }

    render() {
        return <button onClick={this.updateNote}>Update Note</button>
    }
}

export class DeleteNote extends Component {
    deleteNote = (event) => {
        event.preventDefault()
        api.deleteNoteById(this.props.id)
        window.location.reload()
    }

    render() {
        return <button onClick={this.deleteNote}>Delete</button>
    }
}

class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            isLoading: false,
        }
    }

    openModal = () => {
        this.props.openToggleModal(true);
    }
    
    componentDidMount = async () => {
        this.setState({isLoading: true})
        await api.getAllNotes().then(notes => {
            this.setState({
                notes: notes.data.data,
                isLoading: false
            })
        })
    }

    renderTableData() {
        return this.state.notes.map((note, index) => {
            const { title, text, _id } = note
            
            return (
                <tr key={_id}>
                    <th>{title}</th>
                    <td>{text}</td>
                    {/* <td><span><DeleteNote id={_id} /></span></td> */}
                    <td><button onClick={this.updateNote}>Update Note</button></td>
                    <td><UpdateNote id={_id} /></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h4>Mina notiser</h4>
                <button onClick={this.openModal}>Skapa ny notis</button>
                <table id="notes">
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <NotesInsert />
            </div>
        )
    }
}

Notes.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal } = state;
    return {
        auth,
        modal
    }
};

export default connect(mapStateToProps, { openToggleModal })(Notes)
