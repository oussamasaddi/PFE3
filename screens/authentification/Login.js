import React, { Component } from 'react'
import { StyleSheet , View , Text , TextInput , Button , TouchableOpacity} from 'react-native'
import * as firebase from 'firebase';
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {facebook} from '../../0Auth/facebookLog'
import {signInAsync} from '../../0Auth/googleLog'







export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : "",
             password:""
        }
        this.onSignIn= this.onSignIn.bind(this);
        this.fbLogin= this.fbLogin.bind(this);
        this.googleLogin= this.googleLogin.bind(this);
       
        
    }



    
    async onSignIn(){
      const {email , password} = this.state;
      await firebase.auth().signInWithEmailAndPassword(email,password)
      .then(() => {
        const a =  firebase.auth().currentUser.emailVerified;
        if(a){
          alert("user is logged in");
        }else{
          firebase.auth().signOut();
          alert("your account is not verified");
        }
        
        
        
      }).catch((err) => {
        const b=JSON. stringify(err);
        const c = b.split(":")[2] .split(".")[0].split('"')[1];
        alert(c);
        
        

      })
    }
    async fbLogin(){
      facebook();
    
    }
    async googleLogin(){
      signInAsync();
    }
    

  
    render() {
        return (
         
           <View style={styles.container}>
              
               <Text style={styles.logo}> MY App </Text>
               
               <View style={styles.inputView}> 

                    <TextInput placeholder="E-mail" style={styles.inputText} onChangeText={(email) => {this.setState({email})}}/>
               
                </View>
                <View style={styles.inputView} >  
                    
                     <TextInput placeholder="Password"  secureTextEntry = {true} style={styles.inputText} onChangeText={(password) => {this.setState({password})}}/>
                    
                </View>
               
               <TouchableOpacity onPress={() => {this.props.navigation.navigate("ForgotPassword")}} >
                   <Text style={styles.forgot}>forget password ? </Text>
               </TouchableOpacity>
               <View>
               <TouchableOpacity  onPress={() => {this.onSignIn()}} >
                   <Text style={styles.loginBtn}>LOGIN</Text>
               </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={() => {this.props.navigation.navigate("Register")}} >
                   <Text style={styles.signup}>Sign UP</Text>
               </TouchableOpacity>
               
                 <TouchableOpacity onPress={() => {this.fbLogin()}}>

                   <View style={styles.FBbtnView}>
                   
                   <MaterialCommmunityIcons  name="facebook" color="white" size={26}>  
                   <Text style={{color:"white" , fontSize:20,}}> Login with Facebook</Text>
                   </MaterialCommmunityIcons></View>
                   
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => {this.googleLogin()}}>

                   <View style={styles.googlebtnView }>
                   
                   <MaterialCommmunityIcons  name="google" color="white" size={26}>  
                   <Text style={{color:"white" , fontSize:20,}}> Login google account </Text>
                   </MaterialCommmunityIcons></View>
                   
                 </TouchableOpacity>
                 

               

               
                 
               
              
                 

                                  

              

           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        
        marginBottom:40
      },
      forgot:{
        color:"white",
        fontSize:15
      },
      loginBtn:{
        width:130,
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        //height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10,
        padding:20,
        paddingLeft:40,
        fontWeight:"bold",
        fontSize:17,
        color:"white",

        
      },
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        fontSize:17,
        color:"white"
      },
      signup:{
        color:"white",
        fontSize:16,
        marginBottom:25,
      },
      FBbtnView:{
        
        flexDirection:"column-reverse",
        backgroundColor:'blue',
        padding:10,
        borderRadius:25,
        marginTop:25,
        width : 250,
      },
      googlebtnView:{
        
        flexDirection:"column-reverse",
        backgroundColor:'red',
        padding:10,
        borderRadius:25,
        marginTop:35,
        width : 250,
      },
     
  });
  
