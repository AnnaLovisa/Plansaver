import { TOGGLE_MODAL, SET_CURRENT_MODAL_CONTENT } from "../actions/types";

const initialState = {
    isToggled: false,
    currentModalContent: {}
  };

export default function(state = initialState, action) {
    switch(action.type) {        
        case TOGGLE_MODAL:
            return {
                ...state,
                isToggled: action.isToggled
            }
        case SET_CURRENT_MODAL_CONTENT:
            return {
                ...state,
                currentModalContent: action.payload
            }           
        default:
            return state
    }
}