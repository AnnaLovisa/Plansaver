import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import api from "../api";

class ListItemForm extends Component {

    state = {
        textValue: "",
        showForm: false
    }

    handleChange = event => {
        this.setState({ textValue: event.target.value });
        event.preventDefault();
    }

    addListItem = /* async  */(event) => {
        const { user } = this.props.auth;
        const listItemInput = {
            text: this.state.textValue,
            listId: this.props.viewItem.item._id,
            userId: user.id,
            checked: false
        }
        const payload = listItemInput

        /* await  */api.insertListItem(payload).then(res => {
            console.log("listitem created")
            this.setState({textValue: ""})
            
        })
        event.preventDefault();
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }


    render() {

        return (
            <div className="add-listitem">
            {!this.state.showForm &&           
                <div><button onClick={this.toggleForm}><span><i className="fa fa-plus" aria-hidden="true"></i></span></button><span className="add-span">Lägg till</span></div>
            }
            {this.state.showForm && 
                <form className="listitem-form">
                    <input type="text" value={this.state.textValue} onChange={this.handleChange} className="listitem-input" />
                    <button onClick={(event) => this.addListItem(event)} className="btn--add-listitem">Lägg till</button>
                </form>
            }
            </div>
        )
    }
}

ListItemForm.propTypes = {
    auth: PropTypes.object.isRequired,
    viewItem: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, viewItem } = state;
    return {
        auth,
        viewItem
    }
};

export default connect(mapStateToProps, {})(ListItemForm);