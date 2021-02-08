import React, { Component } from 'react'
import api from '../api'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class UpdateTodo extends Component {
    updateTodo = (event) => {
        event.preventDefault()
        window.location.href = `/dashboard/todos/update/${this.props.id}`
    }

    render() {
        return <button onClick={this.updateTodo}>Update Todo</button>
    }
}

export class DeleteTodo extends Component {
    deleteTodo = (event) => {
        event.preventDefault()
        api.deleteTodoById(this.props.id)
        window.location.reload()
    }

    render() {
        return <button onClick={this.deleteTodo}>Delete</button>
    }
}

export class CheckTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            checked: props.checkTodo
        }
    }

    handleChangeCheck = async event => {
        const check = event.target.checked
        this.setState({ checked: check })
        await api.checkTodoById(this.props.id, {
            checked: check
        })
    }

    render() {
        return <input type="checkbox" onClick={this.handleChangeCheck} id={this.props.id} defaultChecked={this.state.checked} />
    }
}

class TodosList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todosListId: "",
            todos: [],
            isLoading: false,
        }
    }
    
    componentDidMount = async () => {
        this.setState({isLoading: true})
        await api.getAllTodos().then(todos => {
            this.setState({
                todos: todos.data.data,
                isLoading: false
            })
        })
    }

    renderTableData() {
        return this.state.todos.map((todo, index) => {
            const { text, checked, _id } = todo
            
            return (
                <tr key={_id}>
                    <td><span><CheckTodo id={_id} checkTodo={checked}/></span></td>
                    <td>{text}</td>
                    <td><span><DeleteTodo id={_id} /></span></td>
                    <td><UpdateTodo id={_id} /></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <p>In this page you'll see the list of todos</p>
                <Link to="/dashboard">Back to page</Link>
                <table id="todos">
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

TodosList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(TodosList)
