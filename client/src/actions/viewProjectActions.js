import  { SET_DISPLAYED_ITEM_IN_PROJECTVIEW, DISPLAY_PROJECTITEM  } from "./types";

// Set item to display in main view
export const setItemInProjectView = item => {
    console.log(item)
    return {
        type: SET_DISPLAYED_ITEM_IN_PROJECTVIEW,
        payload: item
    };
};

export const displayProjectItem = bool =>
    dispatch => {
        console.log('asd', bool)
        return dispatch({
            type: DISPLAY_PROJECTITEM,
            payload: bool
        })
    };
