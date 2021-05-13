import { Assets } from '@react-navigation/stack';
import React , {useState} from 'react'
import {View , TouchableOpacity , Text , Image , StyleSheet,Dimensions} from 'react-native'
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export  default function DetailPicture(props ) {
    const [picture , setPicture] = useState(props.annonce.eventPictures[0]);
    let pictLength = props.annonce.eventPictures.length;
    const [next , setNext] = useState(0);
    
    const onRighht =   () => {
       if((next+1) < pictLength){
        
            
            
          setPicture(props.annonce.eventPictures[next +1 ]);
            setNext(next + 1);
           
           console.log(next);
           

       }else{
        setNext(0)
        setPicture(props.annonce.eventPictures[0]);
        console.log(next);
       }

    }
    const onLeft = () => {
        if((next-1) >= 0){
            
            setPicture(props.annonce.eventPictures[next-1]);
           setNext(next -1);
        
    }else{
        setNext(pictLength-1)
        setPicture(props.annonce.eventPictures[pictLength-1]);
        console.log(next);
       }

    }
    
    return (
        <View style={styles.container1}>
            <View style={styles.container2}>
                <View style={styles.Left}>
                    <TouchableOpacity onPress={() => {onLeft()}}>
                    
                    <MaterialCommmunityIcons name="chevron-double-left" color="#FAFAFA" size={60} /> 
                
            
                </TouchableOpacity>
                </View>
                
                <Image style ={styles.image} source={{uri : picture}} />
                <View style={styles.Left}>
               <TouchableOpacity onPress={() => {onRighht()}}>
                   
                                    <MaterialCommmunityIcons name="chevron-double-right" color="#050505" size={60} /> 

                
               </TouchableOpacity>
               </View> 
               

            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
        

    },
    container2: {
       // borderWidth:3 ,
        
        //borderColor:'red',
        width:windowWidth,
        height:400,
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        flexDirection:'row',
        justifyContent:'center'

    },
    image:{
            width:windowWidth / 1.5 ,
            height:400,
    },
    Left:{
        justifyContent:'center',
        marginHorizontal:20,

    },
    Right:{
        justifyContent:'center',
        marginHorizontal:20,
    },
})
