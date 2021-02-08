import React, { useState, useEffect, useRef } from 'react';
import ListItem from './ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import api from '../api';

function ListItemsByList(props) {

        const [isChecked, setChecked] = useState(false);
        const [itemsL, updateItems] = useState(props.viewedList);

        //const toggleCheckbox = () => setChecked(!isChecked);


        useEffect(() => {
            updateItems(props.viewedList);
        }, [props.viewedList])

        function handleOnDragEnd(result) {
            if(!result.destination) return;
            const items = Array.from(itemsL);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            updateItems(items);
        }

        function deleteListItem(itemId) {
            api.deleteListItemById(itemId)
        }

        async function selectAndCheck(item) {
            //console.log("ITEM", item)
            //if(item !== {}) {
                //item.checked = isChecked;
                //updateState(isChecked)
                //toggleCheckbox()
                setChecked(!isChecked);
                console.log("isChecked", isChecked)
                console.log(item)
                item.checked = !item.checked;
                //let toggleChecked = !item.checked
                /* api.updateListItemById(item._id, { body: payload }).then(res => {
                    console.log("updated", res)
                }) */
                await fetch(`http://localhost:8000/api/listitems/listitem/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        checked: item.checked
                    })
                }).then(response => response.json())
                  .then((json) => {
                      console.log(json);
                  });
            }
        


        const listItems = itemsL.map((item, index) => {
            console.log("item after check", item)
            return (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                        <ListItem providedProps={provided} item={item} deleteListItem={() => deleteListItem(item._id)} testCheck={() => selectAndCheck(item)} />
                    )}
                </Draggable>
            )
        })

        return (
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="listItems">
                {(provided) => (
                    <ul className="listItems" {...provided.droppableProps} ref={provided.innerRef}>
                        {listItems}
                        {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
        )
    
}

export default ListItemsByList;

