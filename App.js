import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text,AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Login from './Login.js';
import Classlist from './ClassList';
import { Header } from 'react-native-elements';
import {createStackNavigator, createAppContainer,StackNavigator} from 'react-navigation';

var firstPage = 'loginPage';

const styles = StyleSheet.create({
  logPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:'90',
  },
});

const AppNavigator = createStackNavigator
(
  { 
    loginPage:{screen:Login,},
    classlist:{screen:Classlist,}
  },
  {
    initialRouteName: firstPage,
   
  }
) 

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() 
  {
    return <AppContainer />;
  }
}


