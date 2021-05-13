import * as Facebook from 'expo-facebook'
import * as firebase from 'firebase';
import {Verif} from './Verif'
 

export const facebook = async () => {
 
    try {
    await Facebook.initializeAsync(
      {
        autoLogAppEvents: true,
        appId: "214722496787236",
      }
    );

    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync( {
      permissions: ['public_profile' , 'email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      await firebase.auth().signInWithCredential(credential)
      .then(() => {

        fetch(`http://10.0.2.2:3000/user/${id}`)
.then((response) => response.json())
.then((responseJson) => {
    if(responseJson[0] !=undefined){
      //existe
        console.log(existe)
    }else{
      fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
      .then(response => response.json())
      .then( 
        async(data) => {
          
        await fetch('http://10.0.2.2:3000/user', {
                                                   
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName : data.name,
            email : data.email,
            phone : "",
            State : "",
            CIN : "",
            picture : data.picture.data.url,
            Role : "Client",
            job : "",
            userID : firebase.auth().currentUser.uid,
          })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(response => console.log(response)) 
                                                   
          
      }
      )
      .catch(e => console.log(e))

    }

})
.catch((err) => {
console.log(err);
});


        
         
      
    
     

       
      })
      .catch((error) => {
        console.log(error)
      })
    
      
          
        

      
        

     
    } else {
      console.log('didnt success');
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    console.log(message);
  }
}




