import React, { Component } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { openToggleModal } from "../../actions/modalActions";
import classnames from "classnames";

class Login extends Component {

    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
    }

    openModal = () => {
      this.props.openToggleModal(true)
    }

    closeModal = () => {
      this.props.history.push("/dashboard");
      this.props.openToggleModal(false)
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
        this.openModal()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
              this.setState({
                errors: nextProps.errors
              });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

    const userData = {
        email: this.state.email,
        password: this.state.password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    this.props.openToggleModal(false); 
  };
    render() {
    const { errors } = this.state;

    return (
        <div className="container">
          <div className="bg-video">
              <video className="bg-video__content" autoPlay muted loop>
                  <source src={process.env.PUBLIC_URL + '/Videos/Flower_Ceiling.mp4'} type="video/mp4"/>
                  {/* <source src={videoBackup} type="video/webm"/> */}
                  Your browser is not supported!
              </video>
            </div>
            <Modal show={this.props.modal.isToggled}
                   onClose={this.closeModal}>
            <Link to="/">Cancel</Link>
            <h4>Login</h4>
            <p>Don't have an account? <Link to="/register">Create an account</Link></p>
            <form noValidate onSubmit={this.onSubmit}>
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                />
                <button
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Login
                </button>
            </form>
          </Modal>
        </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    const { errors, auth, modal } = state;

    return {
      auth: auth,
      errors: errors,
      modal: modal
    }
  };

  export default connect(mapStateToProps,{ loginUser, openToggleModal })(Login);