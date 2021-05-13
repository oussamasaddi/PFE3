import React, { Component } from 'react'
import {View , Text} from 'react-native'
import DetailPicture from '../../compnents/DetailPicture'

export default class Detail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {annonce} = this.props.route.params;
        
        return (
            <View style={{justifyContent:'center' , flex:1}}>
                    <DetailPicture annonce = {annonce}/>
                    <Text> Detaile </Text>
            </View>
        )
    }
}
