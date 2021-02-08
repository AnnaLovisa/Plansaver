import React, { Component } from 'react'
import api from '../api'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DeleteTodo, UpdateTodo, CheckTodo } from './TodosList';

class TodosListByUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            isLoading: false,
            userId: this.props.auth.user.id
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading: true})
        const { userId } = this.state
        await api.getTodosByUserId(userId).then(todos => {
            this.setState({
                todos: todos.data.data,
                isLoading: false
            })
        })
    }
    
        renderTableData() {
            return this.state.todos.map((todo) => {
                const { text, _id } = todo
                return (
                    <tr key={_id}>
                        <td><span><CheckTodo id={_id} /></span></td>
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

TodosListByUser.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(TodosListByUser)