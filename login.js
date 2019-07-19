import React, { Component } from 'react';
import {TextInput, View, StyleSheet,AsyncStorage,Text,Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'; 
// import registerForPushNotificationsAsync from './registerForPushNotificationsAsync.js';
import { Permissions, Notifications } from 'expo';

const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };

const nextPage = 'alertComponentLogin';
const wrongPassword = "השם משתמש או הסיסמא אינם נכונים";
const loginUrl = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=";
const userPassword = "&password=";
const welcome = "ברוך הבא";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:ex.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5dd',
  },
  input: {
    width: 280,
    height: 70,
    padding: 10,
    borderWidth: 1,
    borderColor: '#a37911',
    marginBottom: 10,
    fontSize:25,
fontWeight:'500'
  },
  inputText:{
fontSize:25,
fontWeight:'500'
  },
  header1:{
    fontSize:35,
    fontWeight:'500',
    marginBottom:5,
  },
  header2:{
    fontSize:24,
    fontWeight:'500',
    marginBottom:20,
  textAlign:'center'},
  
});

var personFromDBObj;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuthentic= this.checkAuthentic.bind(this);
    this.pushToken = null;
    this.state = {
      username: null,
      password: null,
      personFromDB:null,
     
    };
  }
  /*************************************************/
  /*****Create New Token For Push Notification******/
  /*************************************************/
  createUserTokenForPush = async(user,token)=>{
   let res;
   let url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch/createToken?username=";
   url += user.UserName;
   url+= "&token="+token;
   fetch(url)
   .then((response) =>{
     res = response.json();
     console.log(res);
   })
  }
    //  await registerForPushNotificationsAsync().then((tok)=>{
      //     this.pushToken=tok;
      //     this.createUserTokenForPush(personFromDBObj,this.pushToken)
      //   })
   /*************************************************/
  /*Check if the User credentials are True or False*/
  /*************************************************/
 async checkAuthentic(){
    debugger;
        if(personFromDBObj.Credentials1 == true){

        try{
      await AsyncStorage.setItem("username",JSON.stringify(personFromDBObj.UserName));
      await AsyncStorage.setItem("password",JSON.stringify(personFromDBObj.Password));
      await AsyncStorage.setItem("login",JSON.stringify(personFromDBObj.Credentials1));
      await AsyncStorage.setItem("userid",JSON.stringify(personFromDBObj.Id));
      await AsyncStorage.setItem("fullname",JSON.stringify(personFromDBObj.FullName));
      await AsyncStorage.setItem("groupId",JSON.stringify(personFromDBObj.Group_Id));
      await AsyncStorage.setItem("groupVersion",JSON.stringify(personFromDBObj.Group_Version));
        }catch(error){console.log(error);}
        debugger;
      this.props.navigation.navigate(
        nextPage,
        {userFullName: personFromDBObj.FullName}
        );
      }
    else{alert(wrongPassword);}
      }
  testfunc = async () =>{
    let user;
    try{ user = await AsyncStorage.getItem("login");}
    catch(error){console.log(error);}
    alert(user);
  }
      /*************************************************/
      /*Fetch request to DB - return True or False*/
      /*************************************************/
  onLogin = () => {
    url = loginUrl;
    url+= this.state.username;
    url+= userPassword;
    url+=this.state.password;
    debugger;
    return fetch(url)
    .then(response => response.json())
    .then((response)=>{
      debugger;
      personFromDBObj = response;
      this.checkAuthentic();
    })
  .then((response)=>{
    console.log(response);
  })    
    .catch((error)=>{
      console.log(error);
    })
  }
  testFunc = async ()=>{
    try{
      let test = await AsyncStorage.getItem("login");
      alert(test)
    }
    catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header1}>ברוך הבא</Text>  
      <Text style={styles.header2}>אנא הכנס שם משתמש וסיסמה</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'שם משתמש'}
          style={styles.input}
        />
        <TextInput
          style={styles.inputText}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'סיסמה'}
          secureTextEntry={true}
          style={styles.input}
        />
        <AwesomeButtonRick onPress={() =>{this.onLogin(this)}}  backgroundColor="#f9d886" backgroundDarker="#f4d077" borderColor="black" borderWidth={1} width={140} height={70}  backgroundShadow="transparent" style={styles.btnText} >היכנס</AwesomeButtonRick>
      </View>
    );
  }
}

 async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
      return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  console.log(finalStatus);
  //alert(token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return (
      token
      // fetch(PUSH_ENDPOINT, {
      //     method: 'POST',
      //     headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //         token: {
      //             value: token,
      //         },
      //         user: {
      //             username: 'Brent',
      //         },
      //     }),
      // })
  );
}

export default Login;