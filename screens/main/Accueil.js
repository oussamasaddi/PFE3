import React from 'react'
import {View , Text , FlatList} from 'react-native'
import AnnoncePost from '../../compnents/AnnoncePost'
import { connect } from 'react-redux'

 function Accueil(props) {
     const annanceAccueil = [];
     
     if(props.annonces[0] != undefined ){
        for( let i = 0 ; i < props.annonces.length ; i++){
             if (props.annonces[i].Verif == "true"){
                 annanceAccueil.push(props.annonces[i]);
             }
        }
     }
    return (
        <View style={{flex : 1 , justifyContent:'center' , backgroundColor:'#C3E8E9'}} >
            <FlatList 
            numColumns={1}
            data={annanceAccueil}
            renderItem={({item}) => (
                 <AnnoncePost annonce = {item} navigation ={props.navigation}/>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
           
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    annonce : store.userState.annonce,
    annonces : store.usersState.annonces,
    users : store.usersState.users,
   
})
export default connect( mapStateToProps , null)(Accueil);