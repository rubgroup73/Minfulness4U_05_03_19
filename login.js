import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      personFromDB:[]
    };
  }
  
  onLogin() {
    url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=";
    url+= this.state.username;
    return fetch(url)
    .then(response => response.json())
    .then((response)=>{
      debugger
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
    const { username, password } = this.state;
  }
  
  // componentDidMount(){
  //   url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=gavri1411";
 
  //   return fetch("http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/fetch?username=geeeveeer")
  //   .then((response) => response.json())
    
  //   .then((response)=>{
  //     debugger
  //     console.log(response);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   })
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