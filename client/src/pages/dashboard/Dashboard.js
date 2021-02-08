import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import View from "../../components/View";
import ViewProject from "../../components/ViewProject";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    console.log(this.props.viewProjectItem)
    const displayProjectView = this.props.viewProjectItem.projectIsViewed ? 'view-project' : 'hide-project';

      return (
        <div className="dassbård">
          <div className="dassbård--gradient"></div>
            <Sidebar />
            <ViewProject setClass={`${displayProjectView}`} />
            <View />
            {/* <div> */}
              {/* <Link to="/dashboard/todos/list">
                  Todos
              </Link> */}
              {/* <Link to="/dashboard/user/todos">
                  Todos by Me
              </Link>
              <Link to="/dashboard/todos/create">
                  Create Todo
              </Link>
            </div>
            <div> */}
              {/* <Link to="/dashboard/notes/list">
                  Notes
              </Link> */}
              {/* <Link to="/dashboard/user/notes">
                  Notes by Me
              </Link>
              <Link to="/dashboard/notes/create">
                  Create Note
              </Link>
              <Link to="/dashboard/projects/project">
                  Create Project
              </Link>
              <Link to="/dashboard/user/projects">
                  Projects by me
              </Link>
              <Link to="/dashboard/lists/list">
                  Create List
              </Link> */}
              {/* <Link to="/dashboard/user/lists">
                  Lists by me
              </Link> */}
            {/* </div>*/}
        </div>
      );
    }
  }

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

/* const mapStateToProps = state => ({
  auth: state.auth
  viewProjectItem
}); */

const mapStateToProps = state => {
  const { auth, viewProjectItem } = state;
  return {
    auth: auth,
    viewProjectItem     
  }
};

export default connect(mapStateToProps,{ logoutUser })(Dashboard);
