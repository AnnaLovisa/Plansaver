import React, { Component } from 'react';
import api from '../api';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dropdown extends Component {
    constructor() {
        super();        
        this.state = {
          showMenu: false,
          isLoading: false,
          projects: [],
        }
        this.dropdownMenu = React.createRef();
      }

      getProjects = async () => {     
            this.setState({ isLoading: true })
            await api.getProjectsByUserId(this.props.auth.user.id).then(projects => {
                this.setState({
                    projects: projects.data.data,
                    isLoading: false
                })
            })
      }

      addListToProject = async (projectId, viewId) => {
        const payload = {
          projectId: projectId
        }
        await api.updateListById(viewId, payload).then(res => {
          console.log("uio", res)
        })
      }

      showMenu = (event) => {
        event.preventDefault();
        this.getProjects();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
      }

      closeMenu = (event) => {
        if (!this.dropdownMenu.current.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });
        }
      }

  render() {
    console.log(this.props.viewItem)
      const projects = this.state.projects.map((project, index) => (
        <li key={index}><button onClick={() => this.addListToProject(project._id, this.props.viewItem.item._id)} className="btn-no-style">{project.projectName}</button></li>
      ))

    return (
      <div className="btn-dropdown">
        <button onClick={this.showMenu} className="btn-no-style"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
        {
          this.state.showMenu
            ?
        <div className="menu" ref={this.dropdownMenu}>
            <ul>
                <li className="no-padding show-submenu">
                  <i className="fa fa-angle-left m-8"></i>
                  <button className="btn-no-style no-padding">Flytta till</button>
                  <ul className="submenu">
                    {projects}
                  </ul>
                </li>
                <li><button className="btn-no-style">Lägg till Favoriter</button></li>
                <li><button className="btn-no-style">Döp om</button></li>
                <li><button className="btn-no-style" onClick={() => this.props.deleteItem()}>Ta bort</button></li>
            </ul>
        </div>
        : (
            null
          )
      }
      </div>
    );
  }
}

Dropdown.propTypes = {
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

export default connect(mapStateToProps, {})(Dropdown);