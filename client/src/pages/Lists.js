import React, { Component } from 'react';
import ListCreate from './ListCreate';
import api from '../api';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal, setCurrentModalContent  } from "../actions/modalActions";
import { setDisplayedItemInView, setDisplayedItemTypeInView, displayItem } from "../actions/viewActions";

class Lists extends Component {
    //constructor(props) {
        state = {
            lists: [],
            isLoading: false,
            userId: this.props.auth.user.id,
            modalData: { name: "insertListData" },
            viewType: "list"
        }
    //}

    openModal = () => {
        this.props.setCurrentModalContent(this.state.modalData.name)
        this.props.openToggleModal(true);
    }

    updateList = (list) => {
        window.location.href = `/dashboard/lists/update/${list}`
    }

    deleteList = (list) => {
        api.deleteListById(list)
        window.location.reload()
    }

    displayItemInView = (item) => {
        this.props.setDisplayedItemInView(item)
        this.props.setDisplayedItemTypeInView(this.state.viewType)
        this.props.displayItem(true)
    }


    componentDidMount = async () => {
        
        this.setState({ isLoading: true })
        await api.getListsByUserId(this.state.userId).then(lists => {
            this.setState({
                lists: lists.data.data,
                isLoading: false
            })
        })       
    }

    renderData() {
        console.log(this.props.viewItem)
        return this.state.lists.map((list) => {
            const { title, _id } = list
            return (
                <li key={_id}>
                    <i className="fa fa-list"></i>
                    <button onClick={() => this.displayItemInView(list)} className="btn-link">{title}</button>
                    {/*<button onClick={() => this.deleteList(_id)}>Delete</button>
                    <button onClick={() => this.updateList(_id)}>Update List</button>*/}
                </li>
            )
        })
    }

    render() {
        console.log("sfdsd", this.props.viewItem)
        return (
            <section className="lists">
                <div className="lists__createNew-box">
                    <h4>MINA LISTOR</h4>
                    <button onClick={this.openModal}><span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                </div>
                {this.props.modal.currentModalContent === "insertListData" && <ListCreate />}
                <ul>
                    {this.renderData()} 
                </ul>                                   
            </section>
        )
    }
}

Lists.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal, viewItem } = state;
    return {
        auth,
        modal,
        viewItem
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent, setDisplayedItemInView, setDisplayedItemTypeInView, displayItem })(Lists)