import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Login from './login.js';
import Meni from './classList';
import { Header } from 'react-native-elements';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return(
      
      /* <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Minfulness4U', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    /> */
     <Login  />
     
    );
  }

}

const styles = StyleSheet.create({
  logPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:'90',
  },
});