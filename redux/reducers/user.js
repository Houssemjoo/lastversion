import { USER_STATE_CHANGE, TOGGLE_LOAD, USER_ERRORS } from '../constants';

const initialState = {
    currentUser: null,
    loading: false,
    errors: null,
}

export const user = (state=initialState, action) => {
    switch(action.type){
        case TOGGLE_LOAD:
            return {
                ...state,
                loading: !state.loading,
            }
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                loading: false,
            }
        case USER_ERRORS:
            return {
                ...state,
                errors: action.errors,
                loading: false,
            }
        default:
            return state;    
    }
}