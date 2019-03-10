import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Login from './login.js';
import Classlist from './classList';
import { Header } from 'react-native-elements';
import {createStackNavigator, createAppContainer} from 'react-navigation';


// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false,
//   };

//   render() {
//     return(
      
//       /* <Header
//       leftComponent={{ icon: 'menu', color: '#fff' }}
//       centerComponent={{ text: 'Minfulness4U', style: { color: '#fff' } }}
//       rightComponent={{ icon: 'home', color: '#fff' }}
//     /> */
    
//      <AppNavigator/>
      
     
     
//     );

//   }
  
//}
 
const AppNavigator = createStackNavigator({
  
  Classlist: {screen: Classlist},
  Login: {screen: Login},
});

const App = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  logPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:'90',
  },
});

export default App