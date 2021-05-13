import * as Google from "expo-google-app-auth";
import * as firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import {Verif} from './Verif';

export const signInAsync = async () => {
  console.log("LoginScreen.js 6 | loggin in");
  try {
    const  result = await Google.logInAsync({
      iosClientId: `644074603814-p1kipvnpc2jo58q2ola4hg0hpieg9hfm.apps.googleusercontent.com`,
      androidClientId: `644074603814-6niq6fe6t30e2q9vomldlv62e1v14rnk.apps.googleusercontent.com`,
      
    });

    
    if (result.type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken)
     
     await firebase.auth().signInWithCredential(credential)
     .then(
       
      async(data) => {
            
        await fetch(`http://10.0.2.2:3000/user/${firebase.auth().currentUser.uid}`)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson[0] != undefined){
             console.log('existeeeee');
                 
            }else{
              console.log('nnnnnnnn existeeeee passs ');
               fetch('http://10.0.2.2:3000/user', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  fullName : data.additionalUserInfo.profile.name,
                  email : data.additionalUserInfo.profile.email,
                  phone : data.user.phoneNumber,
                  State : "",
                  CIN : "",
                  picture : data.additionalUserInfo.profile.picture,
                  Role : "Client",
                  job : "",
                  userID : data.user.uid,
                })
              }
        
              
              ).then(res => res.json())
              .catch(error => console.log(error))
              .then(response => console.log(response))
              
            }
        
        })
        .catch((err) => {
        console.log(err);
        });
        
       
        
          
         
     
        


      

    }
     )
     .catch((error) => {
      console.log(error)
      
    })
      


      // Then you can use the Google REST API
      
     //navigation.navigate("Profile", { user });
    
    }
  } catch (error) {
    console.log("LoginScreen.js 19 | error with login", error);
  }


  
};

