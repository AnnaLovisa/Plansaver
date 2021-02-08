import { TOGGLE_MODAL, SET_CURRENT_MODAL_CONTENT } from "./types";

export const openToggleModal = bool => 
    dispatch => {
        return dispatch({ 
            type: TOGGLE_MODAL,
            isToggled: bool
        })
    };

export const setCurrentModalContent = modalData => {
    return {
        type: SET_CURRENT_MODAL_CONTENT,
        payload: modalData
    };
};