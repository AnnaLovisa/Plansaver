import React, { Component } from 'react'
import ProjectCreate from "./ProjectCreate";
import api from '../api'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openToggleModal, setCurrentModalContent } from "../actions/modalActions";
import { displayProjectItem, setItemInProjectView } from "../actions/viewProjectActions";

class Projects extends Component {
    //constructor(props) {
        state = {
            projects: [],
            isLoading: false,
            userId: this.props.auth.user.id,
            modalData: { name: "insertProjectsData" },
            lists: []
            //viewProjectData: { name: null }
        }
    //}

    openModal = () => {
        this.props.setCurrentModalContent(this.state.modalData.name)
        this.props.openToggleModal(true);       
    }

    displayProjectView = (proj) => {
        console.log(proj)
        this.props.setItemInProjectView(proj)
        this.props.displayProjectItem(true)
        //this.getListsByViewedProject(item)

    }

    getListsByViewedProject = (proj) => {
        api.getListsByProjectId(proj._id).then(lists => {
            console.log("lists", lists)
            /* this.setState(({
                lists: lists.data.data
            })) */
            //this.props.setItemInProjectView()  
            const viewObj = {
                project: proj,
                lists: lists
            }
            console.log(viewObj.project.projectName)
            this.displayProjectView(viewObj)          
        })

        
        //this.props.setItemInProjectView(viewObj)
        //this.props.displayProjectItem(true)
    }

    componentDidMount = async () => {        
        this.setState({ isLoading: true })
        //this.props.setCurrentModalContent(this.state.modalData.name)
        await api.getProjectsByUserId(this.state.userId).then(projects => {
            this.setState({
                projects: projects.data.data,
                isLoading: false
            })
        })       
    }

    renderData() {
        console.log(this.state.lists)
        return this.state.projects.map((project) => {
            const { projectName, _id } = project
            return (
                <li key={_id}>
                    <i className="fa fa-folder"></i>
                    <button className="btn-link" onClick={() => this.getListsByViewedProject(project)}>{projectName}</button>
                </li>
            )
        })
    }

    render() {

        return (
            <section className="projects">
                <div className="projects__createNew-box">
                    <h4>MINA PROJEKT</h4>
                    <button onClick={this.openModal}><span><i className="fa fa-plus" aria-hidden="true"></i></span></button>                                                      
                </div>
                {this.props.modal.currentModalContent === "insertProjectsData" && <ProjectCreate />} 
                <ul>
                    {this.renderData()}
                </ul> 
            </section>
        )
    }
}

Projects.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, modal } = state;
    return {
        auth,
        modal     
    }
};

export default connect(mapStateToProps, { openToggleModal, setCurrentModalContent, displayProjectItem, setItemInProjectView })(Projects)