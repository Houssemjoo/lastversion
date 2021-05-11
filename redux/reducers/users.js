import { USERS_STATE, REMOVE_USER } from '../constants';

const initialState = {
    users: null,
}

export const users = (state=initialState, action) => {
    switch(action.type){
        case USERS_STATE:
            return {
                ...state,
                users: action.users,
            }
        case REMOVE_USER:
            const { users } = state
            const indexId = users.map((user) => user.userId).indexOf(action.userId)
            users.splice(indexId, 1)
            return {
                ...state,
                users: users,
            }
        default:
            return state;    
    }
}