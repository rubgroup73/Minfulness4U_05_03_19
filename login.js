import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';

var firstPage = '';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuthentic= this.checkAuthentic.bind(this);
    this.state = {
      username: '',
      password: '',
      personFromDB:'',
      feedback:false
    };
  }
   /*************************************************/
  /*Check if the User credentials are True or False*/
  /*************************************************/
  checkAuthentic(){
        if(this.state.personFromDB.Credentials1 == true){
        
      AsyncStorage.setItem("username",JSON.stringify(this.state.personFromDB.UserName));
      AsyncStorage.setItem("password",JSON.stringify(this.state.personFromDB.Password));
      AsyncStorage.setItem("login",JSON.stringify(this.state.personFromDB.Credentials1));
      AsyncStorage.setItem("userid",JSON.stringify(this.state.personFromDB.Id));
      AsyncStorage.setItem("fullname",JSON.stringify(this.state.personFromDB.FullName));
      AsyncStorage.setItem("groupId",JSON.stringify(this.state.personFromDB.Group_Id));
      AsyncStorage.setItem("groupVersion",JSON.stringify(this.state.personFromDB.Group_Version));
      AsyncStorage.setItem("sendfeedback",JSON.stringify(this.state.feedback));
      alert("ברוך הבא");  
      this.props.navigation.navigate(
        'classlist',
        username= AsyncStorage.getItem("username")
        );
      }
    else{alert("השם משתמש או הסיסמא אינם נכונים");}
      }
  testfunc = async () =>{
   
    try{
    let user = await AsyncStorage.getItem("login");
    alert(user);
    }
    catch(error){
      alert("Not Success");
    }
  
  }
      /*************************************************/
      /*Fetch request to DB - return True or False*/
      /*************************************************/

  onLogin() {
    url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=";
    url+= this.state.username;
    url+= "&password=";
    url+=this.state.password;
    return fetch(url)
    .then(response => response.json())
    .then((response => this.setState({  
      personFromDB:response
  })))
  .then(()=>{
    this.checkAuthentic();
  })

      
    .catch((error)=>{
      console.log(error);
    })

    const { username, password } = this.state;
  }
  testFunc = async ()=>{
    try{
      let test = await AsyncStorage.getItem("login");
      alert(test)
    }
    catch(error){
      alert("dfdfdf");
    }
  }
  /*************************************************/
  // componentWillMount = async () => {
  //   // await AsyncStorage.removeItem("username")
  //   // await AsyncStorage.removeItem("password")
  //   // await AsyncStorage.removeItem("login")
  //   firstPage = await AsyncStorage.getItem("login");
  //   if(firstPage=='true')
  //   this.props.navigation.navigate('classlist');
  // }


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
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
          <Button
          title='test buton'
          
          onPress={this.testFunc}
        />
      </View>
    );
  }
}

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

export default Login;