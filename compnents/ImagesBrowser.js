import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import {ImageBrowser} from 'expo-image-picker-multiple';

export default class ImageBrowserScreen extends Component {
  _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#0580FF'}/>
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => this._getHeaderLoader()
    });

    callback.then(async (photos) => {
      const cPhotos = [];
      for(let photo of photos) {
        
      
        cPhotos.push({
          uri: photo.uri,
         
        })
        
      }
      navigation.navigate('Addannonce', {photos: cPhotos});
    })
    .catch((e) => console.log(e));
  };



  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity >
      <Text onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Selected ${count} Image`,
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={5}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
