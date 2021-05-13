import React from 'react'
import {View , Text , TouchableOpacity , StyleSheet , Dimensions , Image} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function AnnoncePost(props ) {
   
    
    return (
        <View style={styles.container1}>
            <View style ={styles.container2}>
                <View  >
                    <Image source={{uri : props.annonce.eventPictures[0]}} style= {styles.Image} />
                </View>
                <View style={{flexDirection:'column'}}>

                <Text style={styles.eventName}> {props.annonce.eventName}</Text>
                <View style={styles.InformationView1}>
                   
                        <View style={styles.InformationView2}>
                                
                                <Text style={styles.eventDP}> Place</Text>
                                <Text style={styles.eventDP}> XXXX-XX-XX</Text>
                        </View>
                        <View style={styles.PrixView}>
                                    <Text style={styles.eventPrix}>Prix</Text>
                        </View>
                    

                     </View> 
                     <TouchableOpacity onPress={() => {props.navigation.navigate("Detail" , {annonce : props.annonce}) }}>
                         <View style = {styles.Button}>
                                 <Text style = {styles.ButtonTitle}>Details</Text>
                            <View style={styles.cercle}>
                            <MaterialCommmunityIcons name="chevron-double-right" color="#19A53E" size={60} /> 
                            </View>
                         </View>
                     </TouchableOpacity>
                     
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container1:{
        flex:1 , 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#C3E8E9'
        
    },
    container2 : {
        backgroundColor: 'rgba(234, 243, 235, 0.7)',
        borderWidth:3 , 
        borderColor: 'white',
        width:windowWidth- 40,
        height : windowHeight / 4.4 ,
        borderRadius:40,
        flexDirection: 'row',
        marginVertical:20,
    },
    Image:{
        height : windowHeight / 5.2 ,
        width : windowWidth/ 3.2 , 
        //borderWidth : 3 , 
        //borderColor : 'red',
        borderRadius : 33,
        marginVertical : windowHeight /77,
        marginHorizontal : windowWidth / 90,
    },
   
    InformationView1:{
        flexDirection : 'row'
    },
    InformationView2:{
        flexDirection : 'column'

    },
    eventName : {
        marginVertical:15,
        fontWeight:'bold',
        fontSize:22

    },
    eventDP : {

    },
    eventPrix : {
       fontSize:30,
       fontWeight:'bold',
       color:"#722D6E"


    },
    PrixView:{
        padding : 10,
        width: windowWidth / 6.5,
        height : windowHeight * (1 / 18),
        borderRadius:33,
        marginLeft:windowWidth * (20 / 100),
        //backgroundColor  : 'white',
        justifyContent:"center"

    },
    Button :{
        alignItems:'center',
        marginTop: 10,
        width:200,
        marginLeft:70,
        //borderWidth:3, 
        //borderColor:"red",
        paddingVertical:5,
        borderRadius:35,
        flexDirection:'row',
        backgroundColor:"green"
        


    },
    ButtonTitle :{
        fontSize:22, 
        fontWeight:'bold' , 
        marginLeft:40,
        color:"white"
        

    },
    cercle:{
        height:60,
        width:60,
        //borderWidth:3,
        //borderColor:"black",
        borderRadius:33,
        marginLeft:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }


})
