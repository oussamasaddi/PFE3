import firebase from 'firebase';
import {USER_STATE_CHANGE , USER_ANNONCE_STATE_CHANGE , CLEAR_DATA , USERS_ANNONCE_STATE_CHANGE , USERS_STATE_CHANGE } from '../constants/index';



export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser(){

    

    const id = firebase.auth().currentUser.uid;
    return (
    
     (dispatch) => {
                            fetch(`http://10.0.2.2:3000/user/${id}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if(responseJson != null){
                                data = responseJson[0];
                                dispatch({type : USER_STATE_CHANGE , currentUser: data})
                            }
                        
                        })
                        .catch((err) => {
                        console.log(err);
                        });
                    }

                
)
}




export function fetchUserAnnonce(){
    const id = firebase.auth().currentUser.uid;
    return (
    
     (dispatch) => {
                            fetch(`http://10.0.2.2:3000/annonce/${id}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if(responseJson != null){
                                data = responseJson;
                                dispatch({type : USER_ANNONCE_STATE_CHANGE , annonce: data})
                            }
                        
                        })
                        .catch((err) => {
                        console.log(err);
                        });
                    }

                
)
}

export function fetchAccuelAnnonce(){
    
    return (
    
     (dispatch) => {
                            fetch(`http://10.0.2.2:3000/annonce/`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if(responseJson != null){
                                data = responseJson;
                                dispatch({type : USERS_ANNONCE_STATE_CHANGE , annonces: data})
                            }
                        
                        })
                        .catch((err) => {
                        console.log(err);
                        });
                    }

                
)
}



export function fetchUsers(){

    
    return (
    
     (dispatch) => {
                            fetch(`http://10.0.2.2:3000/user/`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if(responseJson != null){
                                data = responseJson;
                                dispatch({type : USERS_STATE_CHANGE , users: data})
                            }
                        
                        })
                        .catch((err) => {
                        console.log(err);
                        });
                    }

                
)
}



