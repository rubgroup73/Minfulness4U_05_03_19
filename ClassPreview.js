import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Card, Button} from 'react-native-elements';


export default class ClassPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            classesFromDB: this.props.navigation.state.params.userInfo

          };
      }

     
    render(props) {
        return (
 
      <View>
{
this.state.classesFromDB.map((l, i) => (
  <Card 
  key={i}
  style={{fontSize:22,fontWeight:"700"}}
    title={l.name}
    >
    <Image
    source={{ uri: l.image  }}
    style={{ width: '100%', height: 200 }}/>
    <Text style={{marginBottom: 10,fontSize:20,textAlign:"center",fontWeight:"700" }}>
      {l.content}
    </Text>
    <Button
     style={{fontSize:50}}
      backgroundColor='#03A9F4'
      buttonStyle={{borderRadius:5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='היכנס לשיעור' />
       
  </Card>
))
}
  </View>
 

      );
    }
  }

  