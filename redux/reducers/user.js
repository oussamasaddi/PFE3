import { USER_STATE_CHANGE , USER_ANNONCE_STATE_CHANGE , CLEAR_DATA } from "../constants/index"


const initialState = {
    currentUser : null ,
    annonce: [],
    
}

export const user = (state = initialState , action) => {

    switch(action.type){

        case USER_STATE_CHANGE:
            return{
                ...state,
                currentUser: action.currentUser,
                }
        case USER_ANNONCE_STATE_CHANGE:
            return{
                ...state,
                annonce: action.annonce,
                 }  
        case CLEAR_DATA : 
             return initialState
                     
                 
        default :
            return state;       
    }


}