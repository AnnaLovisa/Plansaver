import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import api from '../api'

class TodosInsert extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    handleChangeInputText = async event => {
        const text = event.target.value
        this.setState({ text })
    }

    handleIncludeTodo = async () => {
        const { user } = this.props.auth;
        const todoInput = {
            text: this.state.text,
            userId: user.id,
            checked: this.state.checked
        }
        console.log("todo input", todoInput);
        const payload = todoInput

        await api.insertTodo(payload).then(res => {
            window.alert(`Todo inserted successfully`)
            this.setState({
                text: ''
            })
        })
    }

    render() {
        const { text } = this.state

        return (
            <div>
                <p>In this page you'll see the form to add todos</p>
                <h1>Create Todo</h1>

                <p>Text: </p>
                <input
                    type="text"
                    value={ text }
                    onChange={ this.handleChangeInputText }
                />
                <button onClick={this.handleIncludeTodo}>Add Todo</button>
                <a href={'/dashboard/todos/list'}>Cancel</a>
            </div>
        )
    }
}

TodosInsert.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(TodosInsert);