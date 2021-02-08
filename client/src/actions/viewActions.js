import  { SET_DISPLAYED_ITEM_IN_VIEW, SET_DISPLAYED_ITEM_TYPE_IN_VIEW, DISPLAY_ITEM  } from "./types";

// Set item to display in main view
export const setDisplayedItemInView = (item) => {
    return {
        type: SET_DISPLAYED_ITEM_IN_VIEW,
        payload: item
    };
};

export const displayItem = bool =>
    dispatch => {
        console.log('asd', bool)
        return dispatch({
            type: DISPLAY_ITEM,
            payload: bool
        })
    };

// Set item to display in main view
export const setDisplayedItemTypeInView = (type) => {
    return {
        type: SET_DISPLAYED_ITEM_TYPE_IN_VIEW,
        payload: type
    };
};

