import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class AlertComponentNoClasses extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: true };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.props.navigation.navigate(
      'classlist',
      {comeFrom: 'AlertComponentNoClasses'}     
    )
  };

 
  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>

        <AwesomeAlert
          alertContainerStyle = {styles.boxStyle}
          show={showAlert}
          showProgress={false}
          title="אין שיעורים שביצעת"
          message= "לחץ 'אישור' וגש ל'השיעור הבא'"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText = 'אישור'
          confirmButtonColor="#2e3747"
          confirmButtonStyle={styles.buttonStyle}
          messageStyle = {styles.messageStyle}
          titleStyle = {styles.titleStyle}
          confirmButtonTextStyle = {styles.confirmButtonTextStyle}
          closeOnTouchOutside = {false}
          onConfirmPressed={() => {
          this.hideAlert();
          }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e3747',
    
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#2e3747",
  },
  text: {
    backgroundColor:'#fff5dd',
    textAlign:'center',
    color: '#fff',
    fontSize: 15
  },
  boxStyle:{
    
    flex:2,
    width:500,
    height:400
  },
  buttonStyle:{
    width:80,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonTextStyle:{
    fontSize:20
  },
  messageStyle:{
    
    fontSize:20,
   
  },
  titleStyle:{
  
    fontSize:40,
    textAlign:'center',
  }
});