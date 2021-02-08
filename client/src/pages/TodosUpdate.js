import React, { Component } from 'react'
import api from '../api'

class TodosUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            text: ''           
        }
    }

    handleChangeInputText = async event => {
        const text = event.target.value
        this.setState({ text })
    }

    handleUpdateTodo = async () => {
        const { id, text } = this.state
        const payload = { text }

        await api.updateTodoById(id, payload).then(res => {
            window.alert(`Todo updated successfully`)
            this.setState({
                text: ''
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const todo = await api.getTodoById(id)
        this.setState({
            text: todo.data.data.text,
        })
    }

    render() {
        const { text } = this.state
        return (
            <div>
                <h1>Update todo</h1>
                <p>In this page you'll see the form to update the todos</p>
                <p>Text: </p>
                <input
                    type="text"
                    value={ text }
                    onChange={ this.handleChangeInputText }
                />
                <button onClick={this.handleUpdateTodo}>Update Todo</button>
                <a href={'/dashboard/todos/list'}>Cancel</a>
            </div>
        )
    }
}

export default TodosUpdate