import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,ListItem } from 'react-native-elements';
import { Platform, StatusBar, StyleSheet, View,Text,AsyncStorage } from 'react-native';


const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey',
      alignItems: 'center',
      textAlign: 'center',
      
    },
    listStyle:{
        marginTop:70,
        textAlign:'right',
    },
    rightto:{

        textAlign:'right',
    }

  })
  const list = [
    {
      name: 'גברי זרקה',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'הדר ומני',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  
  ]

  export default class Classlist extends React.Component{

    render () {
        return (
            <View style = {styles.listStyle}>
            {
              list.map((l, i) => (
                <ListItem
                 
                  key={i}
                  leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={l.name}
                  subtitle={l.subtitle}
                  
                />
              ))
            }
          </View>
        )
      }
}



