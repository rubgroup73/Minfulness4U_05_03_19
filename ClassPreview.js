import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView} from 'react-native';
import { Card, Button} from 'react-native-elements';

const gifUri = 'https://media.giphy.com/media/AZ1PPDF8uO9MI/giphy.gif';

export default class ClassPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            classesFromDB: this.props.navigation.state.params.userInfo.oldClasses

          };
      }
  
    render(props) {
      console.log(this.props.navigation.state.params.userInfo);
        return (        
      <ScrollView>
{
this.state.classesFromDB.map((l, i) => (
  <Card 
  key={i}
  style={{fontSize:22,fontWeight:"700"}}
    title={l.Title}
    >
    <Image
    source={{ uri:gifUri}}
    style={{ width: '100%', height: 200 }}/>
    <Text style={{marginBottom: 10,fontSize:20,textAlign:"center",fontWeight:"700" }}>
      {l.Description}
    </Text>
    <Button
     style={{fontSize:50}}
      backgroundColor='#03A9F4'
      buttonStyle={{borderRadius:5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title={<Text>היכנס לשיעור </Text>}
      />
       
  </Card>
))
}
  </ScrollView>
 

      );
    }
  }

  