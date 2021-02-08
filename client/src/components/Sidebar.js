import React, { Component } from 'react';
import Lists from "../pages/Lists";
import Projects from "../pages/Projects";
import NotesByUser from "../pages/NotesByUser";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Sidebar extends Component {

    
   

    render() {


      return (
        <aside className="sidebar">
            <Projects />
            <Lists />
            <NotesByUser />         
        </aside>
      )
    }
  }

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, {})(Sidebar));