import React from 'react'
import { View , Text , Dimensions , Image , StyleSheet} from 'react-native'
import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileHeader(props) {
    return (
        
              <View style={styles.header}>
            <View style={styles.headerContent}>
                <MaterialCommmunityIcons 
                style={{marginLeft : windowWidth - 100}}
                 name = "account-settings" color='black' size={32}
                 />

                <Image style={styles.avatar}
                  source={{uri: props.user.picture}}/>

                <Text style={styles.name}>{ props.user.fullName} </Text>
                <Text style={styles.userInfo}>{ props.user.email}  </Text>
                <Text style={styles.userInfo}>{ props.user.State} </Text>
            </View>
          </View>
           
        
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#C3E8E9',
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
})
