import React from 'react';
import {StyleSheet,AsyncStorage,View,Image} from 'react-native';
import Login from './login';
import Classlist from './classList';
import ClassPreview from './ClassPreview';
import NextClass from './NextClass';
import MediaPlayer from './MediaPlayer';
import StateOfMind from './StateOfMind';
import StateOfMindAfter from './StateOfMindAfter';
import AlertComponent from './alerts/AlertComponent';
import AlertComponentStateOfMind from './alerts/AlertComponentStateOfMind';
import AlertComponentLogin from './alerts/AlertComponentLogin';
import AlertComponentClassFinish from './alerts/AlertComponentClassFinish';
import AlertComponentNoClasses from './alerts/AlertComponentNoClasses';
import LoadingLogo from './LoadingLogo';
import MediaPlayerOldClasses from './MediaPlayerOldClasses';
import AlertComponentCloseClass from './alerts/AlertComponentCloseClass';
import AlertComponentNoHomework from './alerts/AlertComponentNoHomework';
import Homework from './Homework';
import MediaPlayerHomework from './MediaPlayerHomework';
import GroupChat from './GroupChat';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const AppNavigator = createStackNavigator
(
  { 
    loginPage:
    {
      screen:Login,
    
      navigationOptions:
      {
        title:"מסך כניסה",
        headerLeft:null,
           headerStyle: {
          backgroundColor:'#fff5dd'
        },
        headerTitleStyle: { 
         textAlign:'center',
          flex:1 },
         
        
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
      title:"מסך",
      screen:ClassPreview,
      navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"שיעורים שביצעתי",
       headerLeftColor:'#2e3747',
      }
    
      
    },
    nextclass:{screen:NextClass,
      navigationOptions:
     {    headerStyle: {
       backgroundColor:'#fff5dd'
     },
     headerTitleStyle: { 
      
       flex:1 },
       title:"השיעור הבא",
      headerLeftColor:'#2e3747',
     }}, 
    mediaplayer:
    {
      screen:MediaPlayer, 
      navigationOptions:
      {
       
        headerLeft:null
      }
    },
    mediaPlayerOldClasses:{
      screen:MediaPlayerOldClasses, 
      
    },
    stateofmind:
    {
      screen:StateOfMind, 
      navigationOptions:
      {headerLeft:null}
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
    alertComponentLogin:{
      screen:AlertComponentLogin,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentClassFinish:{
      screen:AlertComponentClassFinish,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentNoClasses:{
      screen:AlertComponentNoClasses,
      navigationOptions:
      {headerLeft:null}
    },
    LoadingLogo:{
      screen:LoadingLogo,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentCloseClass:{
      screen:AlertComponentCloseClass,
      navigationOptions:
      {headerLeft:null}
    },
    stateOfMindAfter:{
      screen:StateOfMindAfter,
      navigationOptions:
      {headerLeft:null}
    },
    Homework:{
      screen:Homework,
      navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"שיעורי בית",
       headerLeftColor:'#2e3747',
      }
    }
    ,
    alertComponentNoHomework:{
      screen:AlertComponentNoHomework,
      navigationOptions:
      {headerLeft:null}
    },
    MediaPlayerHomework:{
      screen:MediaPlayerHomework,
      
    },
    GroupChat:{
      screen:GroupChat,
      navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"פורום קבוצתי",
       headerLeftColor:'#2e3747',
      }},
  },
  {initialRouteName:"loginPage", }
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
        headerLeft:null,
           headerStyle: {
          backgroundColor:'#fff5dd'
        },
        headerTitleStyle: { 
         textAlign:'center',
          flex:1 },
        } 
    },
    classlist:
    {
      screen:Classlist,
      navigationOptions:
      { title:"מסך ראשי",
        headerLeft:null}
    },
    classpreview:
    {screen:ClassPreview,
      navigationOptions:
      {headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: {  
        flex:1 },
        title:"שיעורים שביצעתי",
       headerLeftColor:'#2e3747',
      }
    },
    nextclass:{screen:NextClass,
       navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"השיעור הבא",
       headerLeftColor:'#2e3747',
      }}, 
    mediaplayer:{screen:MediaPlayer,navigationOptions:
      { headerLeft:null}},
    mediaPlayerOldClasses:{screen:MediaPlayerOldClasses,},
    stateofmind:
    {
      screen:StateOfMind, 
      navigationOptions:
      {headerLeft:null}
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
    alertComponentLogin:{
      screen:AlertComponentLogin,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentClassFinish:{
      screen:AlertComponentClassFinish,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentNoClasses:{
      screen:AlertComponentNoClasses,
      navigationOptions:
      {headerLeft:null}
    },
    LoadingLogo:{
      screen:LoadingLogo,
      navigationOptions:
      {headerLeft:null}
    },
    alertComponentCloseClass:{
      screen:AlertComponentCloseClass,
      navigationOptions:
      {headerLeft:null}
    },
    stateOfMindAfter:{
      screen:StateOfMindAfter,
      navigationOptions:
      {headerLeft:null}
    },
    Homework:{
      screen:Homework,
      navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"שיעורי בית",
       headerLeftColor:'#2e3747',
      }},
      alertComponentNoHomework:{
      screen:AlertComponentNoHomework,
      navigationOptions:
      {headerLeft:null}
    },
    MediaPlayerHomework:{
      screen:MediaPlayerHomework,
     
    },
    GroupChat:{
      screen:GroupChat,
      navigationOptions:
      {    headerStyle: {
        backgroundColor:'#fff5dd'
      },
      headerTitleStyle: { 
       
        flex:1 },
        title:"פורום קבוצתי",
       headerLeftColor:'#2e3747',
      }},
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
     this.timeOutTemp=0;

    this.state = {
      isLoad:false,
      isLogged:false,
      timeOut:0,

    }  
  } 

  componentDidMount = async ()=>{  
   let interval= setInterval(LoadPage=()=>{
      this.timeOutTemp++;
      if(this.timeOut==5){
        clearInterval(interval);
      }
      this.setState( {
       timeOut:this.timeOutTemp
      });
    }, 1000);
  
    //  await AsyncStorage.getAllKeys()
    //  .then(keys => AsyncStorage.multiRemove(keys))
    //  .then(() => alert('success'));
 
    let temp
    try{temp= await AsyncStorage.getItem("login");}
    catch(error){console.log(error);}
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
   if(this.state.isLoad == false || this.state.timeOut<5)
   {
     return(
     <LoadingLogo  loadVersion='123'></LoadingLogo>
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
