import React ,{useState} from 'react'
import { View , Text , TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase';

export default function ForgotPassword({navigation}) {
    const [email , setEmail] = useState("");
    


    const SendEmail = (email) =>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            
            
            alert('ayayay');
            navigation.navigate("Login");
            
            
            
        }).catch((err) => {
            
            const b=JSON. stringify(err);
            const c = b.split(":")[2] .split(".")[0].split('"')[1];
            alert(c);
           
        })        

    }
    return (
        <View style={styles.container}> 
            <Text style={styles.logo}> Forgot Password</Text>
            <Text style={styles.Text} > Write your email here...</Text>
            <View style={styles.inputView}>  
            <TextInput placeholder='E-mail' style={styles.inputText} onChangeText={(email) => {setEmail(email)}} />
            </View>
            <TouchableOpacity onPress={()=> SendEmail(email)}>
                <Text style={styles.loginBtn}> Send </Text>
            </TouchableOpacity>
        </View>
    )
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
     
      loginBtn:{
        width:130,
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        //height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
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
      },
      Text:{
        color:'white',
        marginBottom:20 , 
        fontSize:15,
      },
     
  });
  

