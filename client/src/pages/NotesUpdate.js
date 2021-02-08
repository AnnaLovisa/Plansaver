import React, { Component } from 'react'
import api from '../api'

class NotesUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            text: ''           
        }
    }

    handleChangeInputText = async event => {
        const name = event.target.name
        this.setState({ [name]: event.target.value })
    }

    handleUpdateNote = async () => {
        const { id, title, text } = this.state
        const noteInput = {
            title: title,
            text: text
        }
        const payload = noteInput
        await api.updateNoteById(id, payload).then(res => {
            window.alert(`Note updated successfully`)
            this.setState({
                title: '',
                text: ''
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const note = await api.getNoteById(id)
        console.log("note heue", note);
        this.setState({
            title: note.data.data.title,
            text: note.data.data.text
        })
    }

    render() {
        const { title, text } = this.state
        return (
            <div>
                <h1>Update note</h1>
                <p>In this page you'll see the form to update the notes</p>
                <form>
                <p>Title: </p>
                <input
                    name="title"
                    type="text"
                    value={ title }
                    onChange={ this.handleChangeInputText }
                />
                <p>Text: </p>
                <input
                    name="text"
                    type="text"
                    value={ text }
                    onChange={ this.handleChangeInputText }
                />
                <button onClick={this.handleUpdateNote}>Update Note</button>
                <a href={'/dashboard/notes/list'}>Cancel</a>
                </form>
            </div>
        )
    }
}

export default NotesUpdate