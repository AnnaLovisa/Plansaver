import React, { Component } from "react";
import Modal from "../../components/Modal";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            isOpen: false
        }
    }

    openModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        //this.props.showModal();
    }

    closeModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        this.props.history.push("/");
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
        this.openModal()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log("newUser", newUser)
        this.props.registerUser(newUser, this.props.history); 
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <Modal show={this.state.isOpen}
                   onClose={this.closeModal}>
                <Link to="/">
                    Back to home
                </Link>
                <h4>Register</h4>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="name">Name</label>
                    <span className="red-text">{errors.name}</span>
                    <input 
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("", {
                            invalid: errors.name
                          })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">{errors.email}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                            invalid: errors.email
                          })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">{errors.password}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password
                          })}
                    />
                    <label htmlFor="password2">Confirm Password</label>
                    <span className="red-text">{errors.password2}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password2
                          })}
                        />
                    <button type="submit">Sign up</button>
                </form>
                </Modal>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect( mapStateToProps, { registerUser } )(withRouter(Register));