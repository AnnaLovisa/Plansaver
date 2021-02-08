import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Header extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };  

    render() {

      const user = this.props.auth;
      const location = this.props.location.pathname;

      return (
        <header className="header">
          <div className="header__logo-box">
            <h2 className="header__logo">PLANSAVER</h2>
          </div>
          <div className="header__login">
            {user.isAuthenticated && <p className="paragraph u-padding-right-xsmall">Logged in as {this.props.auth.user.name.split(" ")[0]}</p>}
            {location !== "/register" && !user.isAuthenticated &&<button className="btn btn--blue u-margin-right-small"><Link to="/register">Create an account</Link></button>}
            {location !== "/login" && !user.isAuthenticated && <button className="btn btn--blue"><Link to="/login">Log in</Link></button>}
            {user.isAuthenticated && <button className="btn btn--blue" onClick={this.onLogoutClick}>Log out</button>}
          </div>
        </header>
      )
    }
  }

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));