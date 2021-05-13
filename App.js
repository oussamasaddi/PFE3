import React, { Component } from 'react'
import { View , Text,LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


//cofiguration for Navigation
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

//fire base config
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCkEhYYKPzoaHZuQFJ1b6kkZSe5jk8RlA0",
  authDomain: "projetfinetude-ad03b.firebaseapp.com",
  projectId: "projetfinetude-ad03b",
  storageBucket: "projetfinetude-ad03b.appspot.com",
  messagingSenderId: "1004003505290",
  appId: "1:1004003505290:web:0ab202453f04e0765b6973",
  measurementId: "G-E66SLZH3P1"
};
if(firebase.apps.length ===0){
  firebase.initializeApp(firebaseConfig);
}


//Redux import 
import { Provider } from 'react-redux';
import {createStore , applyMiddleware} from 'redux';

import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';


const store = createStore(rootReducer , applyMiddleware(thunk));

//import Screeens
import LoginScreen from './screens/authentification/Login'
import RegisterScreen from './screens/authentification/Register'
import ForgotPasswordScreen from './screens/authentification/ForgotPassword'
import MainScreen from './screens/Main'
import AddannonceScreen from './screens/main/Addannonce';
import DetailScreen from './screens/main/Detail';


//Selection multiple Picture
import ImagesBrowser from './compnents/ImagesBrowser'





export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loaded : false
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
        loggedIn : false,
        loaded : true,
                   })
      }
      else {
        this.setState({
          loggedIn : true,
          loaded : true ,
        })
        //console.log(user.providerData)
      }
    })
  }

  
  render() {
    const {loggedIn , loaded} = this.state;
    if(!loaded){
      return(
        <View style={{flex:1 , justifyContent :'center'}}> 
          <Text > it s still loaded</Text>
        </View>
      )
    }
     if(!loggedIn){
        return (
      <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen  name="Login" component={LoginScreen} options ={{headerShown : false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} navigation={this.props.navigation} options ={{headerShown : false}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}  navigation={this.props.navigation} options ={{headerShown : false}} />
          </Stack.Navigator>
      </NavigationContainer>

      
    );
        }
    return(
      <Provider store = {store}> 
     <NavigationContainer>
       <Stack.Navigator>
       <Stack.Screen  name="Main" component={MainScreen} navigation={this.props.navigation} options ={{headerShown : false}}/>
       <Stack.Screen  name="Addannonce" component={AddannonceScreen} navigation={this.props.navigation} />
       <Stack.Screen name="ImageBrowser" component={ImagesBrowser} navigation={this.props.navigation}/>
       <Stack.Screen name="Detail" component={DetailScreen} navigation={this.props.navigation}/>

       </Stack.Navigator>
     </NavigationContainer>
     </Provider>
    )
  
  }
}



export default App
