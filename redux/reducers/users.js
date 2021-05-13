import { USERS_STATE_CHANGE, USERS_ANNONCE_STATE_CHANGE , CLEAR_DATA } from "../constants/index"


const initialState = {
    users: [] ,
    annonces: [],
    
}

export const users = (state = initialState , action) => {

    switch(action.type){

        case USERS_STATE_CHANGE:
            return{
                ...state,
                users: action.users,
                }
        case USERS_ANNONCE_STATE_CHANGE:
            return{
                ...state,
                annonces: action.annonces,
                 }  
        case CLEAR_DATA : 
             return initialState
                     
                 
        default :
            return state;       
    }


}