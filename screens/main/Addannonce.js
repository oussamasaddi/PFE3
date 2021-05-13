import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView, TextInput , StyleSheet , TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase';

require("firebase/firebase-storage");


export default class AddannonceScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //event paramtre
      photos: [],
      eventName:"",
      eventPlaceFrom:"",
      eventPlaceTo:"",
      eventDateFrom:"",
      eventDateTo:"",
      eventGenre:null,
      eventDescription:"",
      phone:"",
      TicketPrice:"",
      NumberTicket:"",
      
      
      //ERR
      
      eventNameErr:"",
      eventPlaceFromErr:"",
      eventPlaceToErr:"",
      eventDateFromErr:"",
      eventDateToErr:"",
      eventGenreErr:null,
      eventDescriptionErr:"",
      phoneErr:"",
      TicketPriceErr:"",
      NumberTicketErr:"",

      
      
    }
    this.onSend= this.onSend.bind(this);
  }

  componentDidUpdate() {
    const {params} = this.props.route;
   
    if (params) {
      const {photos} = params;
      if (photos) this.setState({photos});
     
      
      delete params.photos;
      

    }
  }

  async onSend(){
    const{
      photos,
      eventName,
      eventPlaceFrom,
      eventPlaceTo,
      eventDateFrom,
      eventDateTo,
      eventGenre,
      eventDescription,
      phone,
      TicketPrice
    } = this.state;
    const expDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
      //check phone number
        
      if(isNaN(phone) || phone.length != 8){
        await this.setState({
          
          phoneErr :"phone number is invalide must be 8 number"
        })
         }
         //CHeck date
         if(!eventDateFrom.match(expDate) || eventDateFrom.split("-")[1] > 12 || eventDateFrom.split("-")[1] > 31 ){
          await this.setState({
          
            eventDateFromErr :"date invalid"
          })
         }else{
          await this.setState({
          
            eventDateFromErr :""
          })

         }
         if(!eventDateTo.match(expDate) || eventDateTo.split("-")[1] > 12 || eventDateTo.split("-")[1] > 31 ){
          await this.setState({
          
            eventDateToErr :"date invalid"
          })
         }else{
          await this.setState({
          
            eventDateToErr :""
          })

         }
         // fetch Pictureq
         const pictures = [];
    
         
         for(let i = 0 ; i < photos.length ; i++){
             const response =  await fetch(photos[i].uri);
             const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
             console.log(childPath);
             const blob = await response.blob();
             const task = firebase
             .storage()
             .ref()
             .child(childPath)
             .put(blob);
             const taskProgress = (snapshot) => {
                 console.log(`transferred : ${snapshot.bytesTransferred}`)
             }
             const taskCompleted = async () => {
                    await task.snapshot.ref.getDownloadURL().then((snapshot) => {
                           
                           pictures.push(snapshot)
                           if(pictures.length == photos.length) {
                            
                            save(pictures);
                           }
                           
                         
                     })
             }
             const taskError = (snapshot) => {
                 console.log(snapshot);
             }
             task.on("state_changed",taskProgress , taskError, taskCompleted);
         }

         console.log("lool",pictures)
         //save POST :
        const save = async (pictures) => {await fetch('http://10.0.2.2:3000/annonce', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          eventName : this.state.eventName,
                          eventDateFrom : this.state.eventDateFrom,
                         eventDateTo : this.state.eventDateTo,
                          eventGenre : this.state.eventGenre,
                          eventPlaceFrom: this.state.eventPlaceFrom,
                          eventPlaceTo : this.state.eventPlaceTo,
                          eventDescription : this.state.eventDescription,
                         phone : this.state.phone,
                          eventPictures : pictures,
                          Verif : "false",
                          userID : firebase.auth().currentUser.uid,
                            
                        })
                      }).then(res => res.json())
                     .catch(error => console.log(error))
                      .then(response => console.log(response))
                      
                    }


  }

  renderImage (item, i) {
    
    
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    
    

    return (
      <View style={styles.container}>
        
        <Text style={styles.logo}> Add Annonce</Text>
        <ScrollView>
                <View style={styles.inputView}> 

                          <TextInput placeholder="Event Name" style={styles.inputText} onChangeText={(name) => {this.setState({eventName : name})}}/>

                </View>
                <Text style={styles.label}> genre : </Text>
                <View style={styles.selectView}>
                  
                  
                        <RNPickerSelect
                        
                             
                             items={[
                                        { label: 'Randonnee', value: 'Randonnee'  },
                                        { label: 'Festival Traditional', value: 'Festival Traditional'  },
                                        { label: 'Concert de music', value: 'Concert de music'  },
                                        { label: 'game', value: 'game' },
                                        { label: 'Sport	', value: 'Sport'  },
                                        { label: 'Autre', value: 'Autre'  },
                                        
                                     
                                        

                                
                                    ]}
                             onValueChange={(value) =>this.setState({eventGenre : value})}
                        />
                     </View>
                     <Text style={styles.textdate}>From:</Text>
                      <View style={styles.inputView}> 

                          <TextInput placeholder="Adress Gouvernorat-ville-Regions" style={styles.inputText} onChangeText={(adr) => {this.setState({eventPlaceFrom : adr})}}/>

                      </View>
                      <Text style={styles.textdate}>To: (optional)</Text>
                      <View style={styles.inputView}> 

                              <TextInput placeholder="Adress Gouvernorat-ville-Regions" style={styles.inputText} onChangeText={(adr ) => {this.setState({eventPlaceTo : adr})}}/>

                      </View>
                       <View style={styles.inputView}> 

                            <TextInput placeholder="phone" style={styles.inputText} keyboardType = 'numeric'  maxLength={8} onChangeText={(phone) => {this.setState({phone})}}/>
                            
                        </View>
                        <Text style={{color: 'red' , fontSize:15 , marginBottom: 10 , marginLeft:20}}>{this.state.phoneErr}</Text>

                        
                        <Text style={styles.label} > Date : </Text>
                        <View style={{flexDirection:'row',marginTop:20 ,}}>
                          <View style={{}}>
                            <Text style={styles.textdate}> from : </Text>
                            <View style={styles.inputView2}>
                              <TextInput placeholder="YYYY-MM-DD" onChangeText={(date) => {this.setState({eventDateFrom : date})}} />
                            </View>
                            <Text style={{color: 'red' , fontSize:15 , marginBottom: 10 , marginLeft:20}}>{this.state.eventDateFromErr}</Text>
                            
                          </View>
                          <View>
                          <Text style={styles.textdate}> to : (optional)</Text>
                          <View style={styles.inputView2}>
                              <TextInput placeholder="YYYY-MM-DD" onChangeText={(date) => {this.setState({eventDateTo : date})}}/>
                            </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {navigate('ImageBrowser')}}>
                              <View style={{marginBottom:20} }>
                              <MaterialCommmunityIcons  name="image" color="white" size={50} > 
                              {this.state.photos[0] != null ? (
                                <Text style={{fontSize:25}}>{this.state.photos.length} picture are uploaded</Text>
                              ):<Text style={{fontSize:25}}>Click Here for upload</Text>}
                                 
                                    { this.state.photos[0] != null ? (
                                    
                                      
                                        <MaterialCommmunityIcons name="check" color="#19A53E" size={35} /> 
                                    
                                    ): null}
                                    
                  
                                </MaterialCommmunityIcons>  
                                </View>
                        </TouchableOpacity>
                        <View style={styles.inputView2}>
                              <TextInput placeholder="Ticket Price (Dinar TN)" keyboardType="numeric" onChangeText={(prix) => {this.setState({TicketPrice : prix})}}/>
                            </View>
                            <View style={styles.inputView2}>
                              <TextInput placeholder="Nombre of ticket" keyboardType="numeric" onChangeText={(prix) => {this.setState({NumberTicket : prix})}}/>
                            </View>
                        <View style={styles.inputView3}>
                          <TextInput multiline={true} numberOfLines={10} style={styles.inputText} placeholder="write your event program here....." 
                          onChangeText = {(description) => {this.setState({eventDescription : description})}}/>
                        </View>

          

    
                        <View style={{ flex: 1,alignItems: 'center',justifyContent:'center'}}>
                     <TouchableOpacity  onPress={() => {this.onSend()}} >
                        <Text style={styles.loginBtn}>Send</Text>
                    </TouchableOpacity>
                    </View>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
        </ScrollView>
        
      </View>
    );
  }
}

const styles= StyleSheet.create({
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
    marginTop:70 , 
    marginBottom:40
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
  label:{
    color:'white',
    fontSize:18,
    marginBottom:10,

  },
  selectView :{
    backgroundColor:"#fb5b5a" ,
    borderRadius:8,
    marginBottom:20,
    color:'red',
    width:"50%"

  },
  inputView2:{
    width:200,
    backgroundColor:"#465881",
    borderRadius:25,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    marginLeft:10
  },
  textdate:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:5,
    color:'white'
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
    paddingLeft:47,
    fontWeight:"bold",
    fontSize:17,
    color:"white"

    
  },
  inputView3:{
    width:350,
    backgroundColor:"#465881",
    borderRadius:25,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    padding:50
  },
})
