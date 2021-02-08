import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";


class Navbar extends Component {

    render() {
        const user = this.props.auth;
        const location = this.props.location.pathname;
        const paddingClass = location === "/login" || !user.isAuthenticated ? "u-height-0" : "";
        return (
            <nav className={`navbar ${paddingClass}`}>
                <ul>
                {user.isAuthenticated && <li><p className="paragraph u-padding-right-xsmall">Logged in as {this.props.auth.user.name.split(" ")[0]}</p></li>}
                </ul>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
  });

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));