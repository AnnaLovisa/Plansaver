import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends Component {
    constructor(props) {
      super(props);
      this.containerEl = document.createElement('div');
      this.containerEl.className = "backdropStyle"
      // Create a div that we'll render the modal into. Because each
      // Modal component has its own element, we can render multiple
      // modal components into the modal container.
      this.el = document.createElement('div');
      this.el.className = "modalStyle"

      this.containerEl.appendChild(this.el)
      
    }
  
    componentDidMount() {
      // Append the element into the DOM on mount. We'll render
      // into the modal container element (see the HTML tab).
      modalRoot.appendChild(this.containerEl);
    }
  
    componentWillUnmount() {
      // Remove the element from the DOM when we unmount
      modalRoot.removeChild(this.containerEl);
      
    }
    
    render() {

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
        return null;
      }
      
      // Use a portal to render the children into the element
      return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        this.props.children,
        // A DOM element
        this.el
      );
    }
  }

  export default Modal

