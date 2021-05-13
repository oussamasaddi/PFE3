import React, { Component , useState} from 'react'
import { StyleSheet , View , Text , TextInput , Button , TouchableOpacity, ScrollView} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import * as firebase from 'firebase';
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            

            //user parametre
             Name : "",
             CIN :"",
             phone:"",
             State:null,
             job:"",
             Email :"",
             Password:"",
             profilePicture:'../../assets/images/unknown.jpg',
             userID:"",
             Role:"Client",

             //found Error
             saveName: false,
             saveCIN: false,
             savePassword: false,
             savePhon: false,
             saveState: false,
             saveEmail: false,


              //Error Text
             NameErr : "",
             CINErr : "",
             phoneErr : "",
             PasswordErr : "",
             jobErr : "",
             StateErr:"",
             EmailErr:"",


             //page parametre
             show : false , 


             
             

        }
        this.onSignUp= this.onSignUp.bind(this);
        this.onPickpict= this.onPickpict.bind(this);
        
    }
    
    
     async  onSignUp() {
        const  {Name , CIN , phone , job , State , Email , Password , profilePicture , Role , userID } = this.state;
        const letters = /^[A-Za-z]+$/;
        const emailExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //check phone number
        
        if(isNaN(phone) ){
          await this.setState({
            savePhon : false,
            phoneErr :"the phone number must be just a numbers"
          }
            )
            
          
          
        }else if(phone.length>8){
          
         await this.setState({
            savePhon : false ,
            phoneErr :"the phone number must be 8 numbers"
          }
            )
        }else if(phone.length<8){
          
          await this.setState({
            savePhon : false,
            phoneErr :"the phone number must be 8 numbers"
          }
            )
        }else{
          await this.setState({
            savePhon:true,
            phoneErr :""
          }
          )
        }

        //check Name
        if(!Name.match(letters)){
         
          await this.setState({
            saveName:false,
            NameErr : "the Name must be only letters"
          })
        }else if(Name.length<3 ){
          await this.setState({
            saveName:false,
            NameErr : "the Name must be more than 3 letters"
          })
        }else {
          await this.setState({
            saveName:true,
            NameErr:"",
          })
        }

        //check CIN 
        if(isNaN(CIN)){
          await this.setState({
            saveCIN:false,
            CINErr:"CIN must be only numbers"
          })
        }else if(CIN.length != 8){
         await this.setState({
              saveCIN:false,
             CINErr:"CIN must be 8 number"

          })
        }else{
         await this.setState({
            saveCIN:true,
            CINErr : "",
          })
        }
        //check  State
        if(State == null){
         await this.setState({
          saveState:false,
            StateErr:"you need to pick a State"

         })
        }else{
          await this.setState({
            saveState:true,
            StateErr:"",

         })

        }
        //check Password
        if(!isNaN(Password) || Password.match(letters)){
         await this.setState({
            savePassword:false,
            PasswordErr:"the password must be mixed both of numbers and letters"
          })

        }else if(Password.length < 6){
         await this.setState({
            savePassword:false,
            PasswordErr:"the password must be more than 6 letters"
          })
        }else{
         await this.setState({
          savePassword:true,
            PasswordErr:"",
          })
        }

        //check email 
        if(! Email.match(emailExpression)){
       await   this.setState({
            saveEmail:false,
            EmailErr:"Email not valid"
          })
        }else{
         await this.setState({
            saveEmail:true,
            EmailErr:""
          })
        }
          
         

          if(this.state.saveCIN &&this.state.saveName &&this.state.savePassword &&this.state.saveEmail &&this.state.savePhon &&this.state.saveState){
                await firebase.auth().createUserWithEmailAndPassword(Email,Password)
                .then(async(user) => {
                      console.log(user.user.uid);
                        await fetch('http://10.0.2.2:3000/user', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          fullName : Name,
                          email : Email,
                          phone : phone,
                          State : State,
                          CIN : CIN,
                          picture : profilePicture,
                          Role : Role,
                          job : job,
                          userID : user.user.uid,

                        })
                      }).then(res => res.json())
                      .catch(error => console.log(error))
                      .then(response => console.log(response))
                  const userr = firebase.auth().currentUser;
                  userr.sendEmailVerification().then(function(){
                  alert("verification sent");

                  firebase.auth().signOut();
                }).catch(
                  (err) => {
                  alert("Errr")
                  }
                )
                })
                .catch(err => {
                  const b=JSON. stringify(err);
                  const c = b.split(":")[2] .split(".")[0].split('"')[1];
                  this.setState({
                    EmailErr : c ,
                  })
                  
                })
                  
                
              
              
                
          }else{
            console.log("ccccccccccc")
          }
   
      
        
        
    }
    onPickpict(){
      this.setState({
        show : true,
      })
    }
    
     
    
    render() {
      const disable = !this.state.Name || !this.state.CIN || !this.state.phone ||  !this.state.Email || !this.state.Password || !this.state.State ;
      
        return (
            
           <View style={styles.container}>
               <Text style={styles.logo}> MY App </Text>
               <ScrollView>
               
                    <View style={styles.inputView}> 

                            <TextInput placeholder="Full Name" style={styles.inputText}  maxLength={25} onChangeText={(Name) => {this.setState({Name})}}/>

                     </View>

                     {this.state.NameErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.NameErr }</Text>) 
                     : null }


                     <View style={styles.inputView}> 

                            <TextInput placeholder="CIN" style={styles.inputText} maxLength={8} keyboardType = 'numeric' onChangeText={(CIN) => {this.setState({CIN})}}/>

                     </View>

                     {this.state.CINErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.CINErr }</Text>) 
                     : null }

                     <View style={styles.inputView}> 

                            <TextInput placeholder="phone" maxLength={8} style={styles.inputText} keyboardType = 'numeric'  onChangeText={(phone) => {this.setState({phone})}}/>
                            
                     </View>
                     {this.state.phoneErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.phoneErr }</Text>) : null }

                    

                     <View style={styles.inputView}> 

                            <TextInput placeholder="job" style={styles.inputText} maxLength={30} onChangeText={(job) => {this.setState({job})}}/>

                     </View>
                     <View style={styles.selectView}>
                        <RNPickerSelect
                             
                             items={[
                                        { label: 'Tunis', value: 'Tunis'  },
                                        { label: 'Sfax', value: 'Sfax'  },
                                        { label: 'Nabeul', value: 'Nabeul'  },
                                        { label: 'Sousse', value: 'Sousse' },
                                        { label: 'Ben Arous	', value: 'Ben Arous'  },
                                        { label: 'Ariana', value: 'Ariana'  },
                                        { label: 'Bizerte', value: 'Bizerte'  },
                                        { label: 'Kairouan', value: 'Kairouan'  },
                                        { label: 'Monastir', value: 'Monastir'  },
                                        { label: 'Médenine', value: 'Médenine'  },
                                        { label: 'Kasserine', value: 'Kasserine'  },
                                        { label: 'Sidi Bouzid', value: 'Sidi Bouzid'  },
                                        { label: 'Mahdia', value: 'Mahdia'  },
                                        { label: 'Jendouba', value: 'Jendouba'  },
                                        { label: 'Manouba', value: 'Manouba'  },
                                        { label: 'Gabès', value: 'Gabès'  },
                                        { label: 'Gafsa', value: 'Gafsa'  },
                                        { label: 'Béja', value: 'Béja'  },
                                        { label: 'Kef', value: 'Kef' },
                                        { label: 'Siliana', value: 'Siliana'  },
                                        { label: 'Zaghouan', value: 'Zaghouan'  },
                                        { label: 'Kébili', value: 'Kébili'  },
                                        { label: 'Tataouine', value: 'Tataouine' },
                                        { label: 'Tozeur', value: 'Tozeur'  },
                                        
                                        

                                
                                    ]}
                             onValueChange={(value) =>this.setState({State : value})}
                        />
                     </View>

                     {this.state.StateErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.StateErr }</Text>) : null }

                     <View style={styles.inputView}> 

                            <TextInput placeholder="E-mail" style={styles.inputText} onChangeText={(Email) => {this.setState({Email})}}/>

                     </View>

                     {this.state.EmailErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.EmailErr }</Text>) : null }


                     <View style={styles.inputView}> 

                            <TextInput placeholder="Password" style={styles.inputText} secureTextEntry = {true} onChangeText={(Password) => {this.setState({Password})}}/>

                     </View>

                     {this.state.PasswordErr != "" ? 
                     (<Text style={styles.textErr}> { this.state.PasswordErr  }</Text>) : null }
                     <TouchableOpacity onPress={() => {this.onPickpict()}}>

                        <MaterialCommmunityIcons  name="image" color="white" size={50} > 
                             <View style={styles.inputView2}>
                                      <TextInput style={styles.inputText2} value={this.state.profilePicture} editable={false} />
                              </View>
                              { this.state.profilePicture != null ? (
                                  <MaterialCommmunityIcons name="check" color="#19A53E" size={35} /> 
                              ): null}
                                   
                         </MaterialCommmunityIcons>  

                     </TouchableOpacity>

                     


                      
                     <View style={{ flex: 1,alignItems: 'center',justifyContent:'center'}}>
                     <TouchableOpacity disabled={disable } onPress={() => {this.onSignUp()}} >
                        <Text style={styles.loginBtn}>SIGN UP</Text>
                    </TouchableOpacity>
                    </View>
               </ScrollView>

               
               

           </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
    inputView:{
        width:350,
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
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40,
        marginTop:40
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
        paddingLeft:33,
        fontWeight:"bold",
        fontSize:17,
        color:"white"

        
      },
      selectView :{
        backgroundColor:"#fb5b5a" ,
        borderRadius:8,
        marginBottom:20,
        color:'red',
        width:"50%"

      },
      textErr:{
        color:"red",
        fontWeight:"bold",
        marginBottom:20,
      },
      inputText2:{
        height:50,
        fontSize:17,
        color:"black"
      },
      inputView2:{
        width:100,
        //backgroundColor:"#465881",
        backgroundColor:'white',
        height:40,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        borderRadius:8,

      },
})

export default Register
