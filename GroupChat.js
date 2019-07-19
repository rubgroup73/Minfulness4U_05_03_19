import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LoadingLogo from './LoadingLogo';
import moment from "moment";

import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import "prop-types";

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});


export default class GroupChat extends Component {
    constructor(props){
        super(props);
        this.id = this.props.navigation.state.params.userInChat.UserId;
        this.Full_Name = this.props.navigation.state.params.userInChat.Full_Name;
        this.userInChat;
        this.messagesDb;
        this.messageArr=[];
    
  this.state = {
    changed:false,
    messages: [],
  };
}
  
  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
              provider={PROVIDER_GOOGLE}
              style={[styles.mapView]}
              region={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker
                coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
                }}
              />
            </MapView>
        </View>
      );
    }
    return null
  }
  buildChat =async  (messagesDb) =>{
    let messageArr=[];
    if(!messagesDb.length){
        this.setState({ messages:[
            {
             _id: Math.round(Math.random() * 1000000),
             text: 'זכית לרשום את ההודעה הראשונה...',
             createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
             system: true
          }],
          changed:true
        })
    }
    else{
        
      await messagesDb.map((message)=>{
            
            console.log(Math.round(Math.random() * 1000000));
            console.log(message.Content);
            console.log(message.Full_Name);
            console.log(message.SentDate);
            console.log(message);
            if(message.UserId==this.userInChat.UserId){
            messageArr.push({
                _id: Math.round(Math.random() * 1000000),
                text:message.Content,
                createdAt:message.SentDate,
                user:{_id:message.UserId,name:message.Full_Name},
                
            });
        }
        else{
            messageArr.push({
                _id: Math.round(Math.random() * 1000000),
                text:message.Content,
                createdAt:message.SentDate,
                user:{_id:message.UserId,name:message.Full_Name},
                sent: true,
                received: true
            });
        }
        })
        console.log(messageArr);
         this.setState({messages:messageArr,changed:true});
    }
  }

  componentWillMount = async () => {
  debugger;
  this.userInChat = this.props.navigation.state.params.userInChat;
  let messageUrl ="http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetAllMessagesDb?";
  messageUrl += "groupId="+this.userInChat.Group_Id+"&groupVersion="+this.userInChat.Group_Version;
  debugger;
  fetch(messageUrl)
  .then(response => response.json())
  .then(async (response) => {
    this.buildChat(response);
   
  })
  .catch((error=>{
    console.log(error);
  }))

  }

  onSend(messages = []) {
      messageUrl = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UpdateMessagesDb";
      this.userInChat.Content=messages[0].text;
      this.userInChat.SentDate = messages[0].createdAt;
      let data = {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: data=JSON.stringify( this.userInChat)
      }
      return fetch(messageUrl, data)
              .then(response => response.json())  // promise
              .then((response) =>{    
                console.log(response);
                this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
                  }));
                                   
              })
              .catch((error=>{
                console.log(error);
              }))
  }
  
  //  https://stackoverflow.com/a/54550286/1458375
  render() {
    // if(!this.state.changed){
    //     return( <LoadingLogo></LoadingLogo> );
    //   }
    //   else{

    return (
      <>
      {this.state.messages.length === 0 && (
        <View style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 50
          }]}>
          <Image 
            source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: 'contain'
            }}
          />
      </View>
      )}
      <GiftedChat

       messages={this.state.messages}
       onSend={(messages) => this.onSend(messages)}
       renderCustomView={this.renderCustomView}
       user={{
         _id: this.id,/*לפה שולחים דינאמית את היוזר אידי של המשתמש הנוכחי*/
         name:this.Full_Name,//לפה להביא דינמית את שם המשתמש
       }}
       parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: 'lightgreen' },
            onPress: props => alert(`press on ${props}`),
          },
        ]}
     />
     </>
    );
    //   }
  }
}