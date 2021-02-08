import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Dropdown from "./Dropdown";
import ListItemForm from "./ListItemForm";
import ListItemsByList from "./ListItemsByList";
import api from '../api';

class View extends Component {

  state = {
    listItems: [],
    showForm: false
  }

  componentDidUpdate = async (prevProps) => {
    console.log(this.props.viewItem.item._id)
    if(this.props.viewItem !== prevProps.viewItem) {
      await api.getListItemsByListId(this.props.viewItem.item._id).then(listitems => {
        console.log(listitems)
          this.setState({
              listItems: listitems.data.data
          })
      })
    }  
  }

  
  deleteItem = (item) => {
    console.log("ITEM", item)
    if(this.props.viewItem.type === "list") {
      api.deleteListById(item);
    } else if(this.props.viewItem.type === "note") {
      api.deleteNoteById(item);
    } else {
      return null
    }
  }

  render() {
    console.log(this.props.viewItem)
    console.log(this.state.listItems)
    return (
      <section className="view">
        {this.props.viewItem.isViewed &&
          <div className="view__item-box">
            <Dropdown deleteItem={() => this.deleteItem(this.props.viewItem.item._id)} />
            <h2>{this.props.viewItem.item.title}</h2>
            <p>{this.props.viewItem.item.text}</p>
            {this.props.viewItem.type === "list" &&
              <ListItemsByList viewedList={this.state.listItems} deleteItem={() => this.deleteItem(this.props.viewItem.item._id)} />}
            {this.props.viewItem.type === "list" &&
              <ListItemForm showForm={this.state.showForm} />}
          </div>}
      </section>
    );
  }
}

View.propTypes = {
  viewItem: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { viewItem } = state;
  return {
      viewItem
  }
};

export default connect(mapStateToProps, {})(View)