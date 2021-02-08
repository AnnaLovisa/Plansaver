import { SET_DISPLAYED_ITEM_IN_VIEW, SET_DISPLAYED_ITEM_TYPE_IN_VIEW, DISPLAY_ITEM } from "../actions/types";

const initialState = {
    isViewed: false,
    item: {},
    type: ""
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DISPLAYED_ITEM_IN_VIEW:
            return {
                ...state,                
                item: action.payload
            }
        case DISPLAY_ITEM:
            return {
                ...state,
                isViewed: action.payload
            }
        case SET_DISPLAYED_ITEM_TYPE_IN_VIEW:
            return {
                ...state,
                type: action.payload
            }
        default:
            return state;
    }
}