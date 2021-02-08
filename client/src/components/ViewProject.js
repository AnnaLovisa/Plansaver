import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { displayProjectItem, setItemInProjectView } from "../actions/viewProjectActions";
import { setDisplayedItemInView, setDisplayedItemTypeInView, displayItem } from "../actions/viewActions";

class ViewProject extends Component {

  state = {
    viewType: "list"
  }
  
  closeProjectView = () => {
    this.props.setItemInProjectView({})
    this.props.displayProjectItem(false)
  }

  displayItemInView = (item) => {
    this.props.setDisplayedItemInView(item)
    this.props.setDisplayedItemTypeInView(this.state.viewType)
    this.props.displayItem(true)
  }

  render() {

    let listArr = []
    if(this.props.viewProjectItem.projectIsViewed) {
      console.log(this.props.viewProjectItem.projectItem.project.projectName)
      this.props.viewProjectItem.projectItem.lists.data.data.map(res => {
        if(res) {
          listArr.push(res)
        }
      })
    }
    const list = listArr.map((res, i) => (
      console.log(res),
      <li key={i}><button onClick={() => this.displayItemInView(res)} className="btn-link">{res.title}</button></li>
    ))

    return (
      <section className={this.props.setClass}>
        {this.props.viewProjectItem.projectIsViewed &&
          <div className="view__item-box">
          <button className="btn-close-projectview" onClick={this.closeProjectView}><i className="fa fa-angle-left projectview-arrow"></i></button>
            <h4>{this.props.viewProjectItem.projectItem.project.projectName}</h4>
            <ul className="project-view">
            {list}
            </ul>            
          </div> }
      </section>
    );
  }
}

/* ViewProject.propTypes = {
  viewProject: PropTypes.object.isRequired
}; */

const mapStateToProps = state => {
  const { viewProjectItem } = state;
  return {
    viewProjectItem     
  }
};


export default connect(mapStateToProps, { displayProjectItem, setItemInProjectView, setDisplayedItemInView, setDisplayedItemTypeInView, displayItem })(ViewProject)