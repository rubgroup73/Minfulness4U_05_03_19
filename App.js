import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Login from './login.js';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return(
    <View>
      <Text>fdgd</Text>
      <Login />
    </View>
    );
  }

}