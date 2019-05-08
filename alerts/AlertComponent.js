import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class AlertComponent extends React.Component {

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
      'classlist'     
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
          title="הקורס הסתיים!"
          message="כל הכבוד סיימת את הקורס"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText = 'אישור'
          confirmButtonColor="#5ff424"
          confirmButtonStyle={styles.buttonStyle}
          messageStyle = {styles.messageStyle}
          titleStyle = {styles.titleStyle}
          confirmButtonTextStyle = {styles.confirmButtonTextStyle}
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
    backgroundColor: '#fff',
    
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
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
    fontSize:20
  },
  titleStyle:{
    fontSize:40
  }
});