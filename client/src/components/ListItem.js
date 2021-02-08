import React from 'react';


function ListItem(props) {

    const isChecked = props.item.checked
    /* console.log("is checked?", isChecked) */

    return (
        <li ref={props.providedProps.innerRef} {...props.providedProps.draggableProps} {...props.providedProps.dragHandleProps} className="listItem">
            <div className="item-container">
                <div className="round"><input type="checkbox" checked={isChecked} id="checkbox" onChange={props.testCheck} /><label htmlFor="checkbox">{props.item.text}</label></div>
            </div>
            <div className="btn-container">
                <button className="btn-no-style"><span><i className="fa fa-pencil" aria-hidden="true"></i></span>
                </button>
                <button className="btn-no-style" onClick={props.deleteListItem}><span><i className="fa fa-trash" aria-hidden="true"></i></span>
                </button>
            </div>
        </li>
    )
}

export default ListItem;