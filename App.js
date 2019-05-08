import React from 'react';
import {StyleSheet,AsyncStorage,View,Image} from 'react-native';
import Login from './login';
import Classlist from './classList';
import ClassPreview from './ClassPreview';
import NextClass from './NextClass';
import MediaPlayer from './MediaPlayer';
import StateOfMind from './StateOfMind';
import AlertComponent from './alerts/AlertComponent';
import AlertComponentStateOfMind from './alerts/AlertComponentStateOfMind'
import {createStackNavigator, createAppContainer,StackNavigator,NavigationActions} from 'react-navigation';

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
      
    },
    nextclass:
    {
      screen:NextClass,
    }, 
    mediaplayer:
    {
      screen:MediaPlayer, 
    },
    stateofmind:
    {
      screen:StateOfMind, 
    },
    alertComponent:{
      screen:AlertComponent,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentStateOfMind:{
      screen:AlertComponentStateOfMind,
      navigationOptions:
      {headerLeft:null}
    },
    
  },
  {
    initialRouteName:"loginPage",  
  }
) 

const AppNavigatorLogged = createStackNavigator
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
     
    },
    nextclass:
    {
      screen:NextClass,
    }, 
    mediaplayer:
    {
      screen:MediaPlayer,
     
    },
    stateofmind:
    {
      screen:StateOfMind, 
    }, 
    alertComponent:{
      screen:AlertComponent,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentStateOfMind:{
      screen:AlertComponentStateOfMind,
      navigationOptions:
      {headerLeft:null}
    },
  },
  {
    initialRouteName:"classlist",  
  }
) 

const AppContainer = createAppContainer(AppNavigator);
const AppContainerLogged = createAppContainer(AppNavigatorLogged);

export default class App extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      isLoad:false,
      isLogged:false
    }  
  } 

  componentDidMount = async ()=>{
    
    //  await AsyncStorage.removeItem("username")
    // await AsyncStorage.removeItem("password")
    // await AsyncStorage.removeItem("login")
    // await AsyncStorage.removeItem("sendfeedback")
   let temp = await AsyncStorage.getItem("login");
   if(temp != null){
    if(temp == "true")
    {
     this.setState( {
      isLoad:true,
      isLogged:true
     });
    }
    else{
      this.setState ({
        isLoad:true,
      });
    }
  }
  else{
    this.setState ({
      isLoad:true,
    });
  }
}

  render() 
  
 {
    if(this.state.isLoad == false)
    {
      return(
        <View style={{ flexDirection: 'column', justifyContent: 'center',alignItems: 'center',}}>       
              <Image source={require('./assets/images/Loading_2.gif')} />
       </View> 
);
}
else if(this.state.isLogged == false)
    {
    return <AppContainer />;
    }
    else{
      return <AppContainerLogged/>
    }
  }
}

// const styles = StyleSheet.create({
//   logPage: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     marginTop:'90',
//   },
// });
