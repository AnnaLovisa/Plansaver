import { SET_DISPLAYED_ITEM_IN_PROJECTVIEW, DISPLAY_PROJECTITEM } from "../actions/types";

const initialState = {
    projectIsViewed: false,
    projectItem: {} 
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DISPLAYED_ITEM_IN_PROJECTVIEW:
            return {
                ...state,                
                projectItem: action.payload
            }
        case DISPLAY_PROJECTITEM:
            return {
                ...state,
                projectIsViewed: action.payload
            }
        default:
            return state;
    }
}