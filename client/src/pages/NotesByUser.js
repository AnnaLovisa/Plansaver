import React, { Component } from 'react'
import api from '../api'
import NotesInsert from './NotesInsert'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DeleteNote, UpdateNote } from './Notes';
import { openToggleModal, setCurrentModalContent } from "../actions/modalActions";
import { setDisplayedItemInView, setDisplayedItemTypeInView, displayItem } from "../actions/viewActions";

class NotesByUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            isLoading: false,
            userId: this.props.auth.user.id,
            modalData: { name: "insertNotesData" },
            viewType: "note"
        }
    }

    openModal = () => {
        this.props.setCurrentModalContent(this.state.modalData.name)
        this.props.openToggleModal(true);     
    }

    displayItemInView = (item) => {
      this.props.setDisplayedItemInView(item)
      this.props.setDisplayedItemTypeInView(this.state.viewType)
      this.props.displayItem(true)
    }

    updateNote = (note) => {
        window.location.href = `/dashboard/notes/update/${note}`
    }

    deleteNote = (note) => {
        api.deleteNoteById(note)
        window.location.reload()
    }

    componentDidMount = async () => {
        this.setState({isLoading: true})
        const { userId } = this.state
        await api.getNotesByUserId(userId).then(notes => {
            this.setState({
                notes: notes.data.data,
                isLoading: false
            })
        })
    }
    
        renderTableData() {
            return this.state.notes.map((note) => {
                const { title, _id } = note
                return (
                    <li key={_id}>
                        <i className="fa fa-pencil"></i>
                        <button onClick={() => this.displayItemInView(note)} className="btn-link">{title}</button>
                        {/*<button onClick={() => this.deleteNote(_id)}>Delete</button>
                        <button onClick={() => this.updateNote(_id)}>Update Note</button>*/}
                        {/* <td><span><DeleteNote id={_id} /></span></td> */}
                        {/* <td><UpdateNote id={_id} /></td> */}
                    </li>
                )
            })
        }

        render() {

        return (
            <section className="notes">
                <div className="notes__createNew-box">
                    <h4>MINA NOTISER</h4>
                    <button onClick={this.openModal}><span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                </div>
                {this.props.modal.currentModalContent === "insertNotesData" && <NotesInsert />}
                <ul>
                    {this.renderTableData()}
                </ul>   
            </section>
        )
    }
}

NotesByUser.propTypes = {
    auth: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    viewItem: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal, viewItem } = state;
    return {
        auth,
        modal,
        viewItem
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent, setDisplayedItemInView, setDisplayedItemTypeInView, displayItem })(NotesByUser)