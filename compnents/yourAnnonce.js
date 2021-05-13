import React from 'react'
import {View , Text} from 'react-native'
import { connect } from 'react-redux'
export function yourAnnonce(props) {
    console.log(props.annonce)
    return (
        <View>
            <Text> your annonce</Text>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    annonce : store.userState.annonce,
   
})
export default connect( mapStateToProps , null)(yourAnnonce);
