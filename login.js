import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'; 

const nextPage = 'alertComponentLogin';
const wrongPassword = "השם משתמש או הסיסמא אינם נכונים";
const loginUrl = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=";
const userPassword = "&password=";
const welcome = "ברוך הבא";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

var personFromDBObj;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuthentic= this.checkAuthentic.bind(this);
    this.state = {
      username: null,
      password: null,
      personFromDB:null,
     
    };
  }
   /*************************************************/
  /*Check if the User credentials are True or False*/
  /*************************************************/
  checkAuthentic(){
    debugger;
        if(personFromDBObj.Credentials1 == true){
        
      AsyncStorage.setItem("username",JSON.stringify(personFromDBObj.UserName));
      AsyncStorage.setItem("password",JSON.stringify(personFromDBObj.Password));
      AsyncStorage.setItem("login",JSON.stringify(personFromDBObj.Credentials1));
      AsyncStorage.setItem("userid",JSON.stringify(personFromDBObj.Id));
      AsyncStorage.setItem("fullname",JSON.stringify(personFromDBObj.FullName));
      AsyncStorage.setItem("groupId",JSON.stringify(personFromDBObj.Group_Id));
      AsyncStorage.setItem("groupVersion",JSON.stringify(personFromDBObj.Group_Version));
     
      this.props.navigation.navigate(
        nextPage,
        {userFullName: personFromDBObj.FullName}
        );
      }
    else{alert(wrongPassword);}
      }
  testfunc = async () =>{
   
    try{
    let user = await AsyncStorage.getItem("login");
    alert(user);
    }
    catch(error){
     console.log(error);
    }
  
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
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <AwesomeButtonRick onPress={() =>{this.onLogin(this)}} type="primary">Login</AwesomeButtonRick>
        {/* <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        /> */}
      </View>
    );
  }
}

export default Login;