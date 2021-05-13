import React, { Component } from 'react'
import {View , Text, TouchableOpacity} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase'

//reduc import
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUser , clearData , fetchUserAnnonce , fetchAccuelAnnonce , fetchUsers} from '../redux/actions/index'



//import Screen : 
import ProfileScreen from './main/Profile';
import MapScreen from './main/Map';
import AccueilScreen from './main/Accueil';
import AddannonceScreen from './main/Addannonce';
import NotificationScreen from './main/Notification';



const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return(<View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
        <Text>
            hello  word
        </Text>
    </View>);
}

export  class Main extends Component {

    componentDidMount(){
        //my function here from redux/actions/index
        
        this.props.fetchUser();
        this.props.fetchUserAnnonce();
        this.props.fetchUsers();
        this.props.fetchAccuelAnnonce();

        this.props.clearData();
       
        

    }


    render() {
        const { currentUser} = this.props;
        if(currentUser==undefined){
            return(

                <View style={{flex:1 , justifyContent:'center'}}> 
                <TouchableOpacity >
                    <Text> currentUser undefined </Text>
                </TouchableOpacity>
                
                </View>
            )
        }
        return (
            <Tab.Navigator initialRouteName="Accueil" labeled={false}
            activeColor="white"
            inactiveColor="#9CA7B1"
            barStyle={{ backgroundColor: '#1283F0' }}
            >
            <Tab.Screen name="Accueil" component={AccueilScreen} 
            options={{
               tabBarIcon : ({color , size}) => (
                   <MaterialCommmunityIcons name = "home" color={ color} size={26}/>
               ),
            }}
            />
             <Tab.Screen name="Map" component={MapScreen} 
            options={{
               tabBarIcon : ({color , size}) => (
                   <MaterialCommmunityIcons name = "google-maps" color={ color} size={26}/>
               ),
            }}
            />
             <Tab.Screen name="Add annonce" component={EmptyScreen} 
                 listeners={({navigation}) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Addannonce")
                    }
                })} 
            options={{
               tabBarIcon : ({color , size}) => (
                   <MaterialCommmunityIcons name = "plus-box" color={ color} size={26}/>
               ),
            }}
            />
             <Tab.Screen name="Notification" component={NotificationScreen} 
            options={{
               tabBarIcon : ({color , size}) => (
                   <MaterialCommmunityIcons name = "bell" color={ color} size={26}/>
               ),
            }}
            />
             <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
               tabBarIcon : ({color , size}) => (
                   <MaterialCommmunityIcons name = "book-open-variant" color={ color} size={26}/>
               ),
            }}
            listeners={({navigation}) => ({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Profile", {uid : firebase.auth().currentUser.uid})
                }
            })}
            />  

            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser , fetchUserAnnonce , clearData , fetchAccuelAnnonce ,fetchUsers },dispatch)

export default connect( mapStateToProps, mapDispatchProps)(Main);

