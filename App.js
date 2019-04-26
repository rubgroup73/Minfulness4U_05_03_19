import React from 'react';
import {StyleSheet, View,Text,AsyncStorage,Button ,ScrollView} from 'react-native';
import Login from './Login.js';
import Classlist from './ClassList';
import ClassPreview from './ClassPreview';
import {createStackNavigator, createAppContainer,StackNavigator,NavigationActions} from 'react-navigation';


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
    loginPage:
    {
      screen:Login,
      navigationOptions:
      {
        title:"מסך כניסה",
        headerLeft:null
      }
    },
    classlist:
    {
      screen:Classlist,
      navigationOptions:
      {
        title:"מסך ראשי",
        headerLeft:null
      }
    },
      classpreview:
    {
      screen:ClassPreview,
      navigationOptions:
      {
       
        headerLeft:null
      }
    }
  },

  {
    initialRouteName:"loginPage",  
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


