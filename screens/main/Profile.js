import React from 'react'
import {View , Text , Button , Image} from 'react-native'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

//import components
import ProfileHeader from '../../compnents/ProfileHeader'
import yourAnnonce from '../../compnents/yourAnnonce'
import AnnonceBooking from '../../compnents/AnnonceBooking'
import attractedAnnonce from '../../compnents/attractedAnnonce'
export  function Profile(props) {
    console.log(props.route.params)
    return (
        <View style={{flex : 1 , justifyContent:'center'}}>
            <ProfileHeader user = {props.currentUser} />

            <Tab.Navigator>

                    <Tab.Screen name="your Annoce" component={yourAnnonce} />

                    <Tab.Screen name="Annonce reserved" component={AnnonceBooking} />

                    <Tab.Screen name="Annonce Attracted" component={attractedAnnonce} />

            </Tab.Navigator>
            
           
           
          
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
   
})
export default connect( mapStateToProps , null)(Profile);

