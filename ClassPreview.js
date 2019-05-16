import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView,Dimensions} from 'react-native';
import { Card, Button} from 'react-native-elements';


const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };
const gifUri = 'http://proj.ruppin.ac.il/bgroup73/test1/tar4/mediaFiles/touch.jpg';
const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor:'#ffffff'
  },
  cardStyle:{
    borderRadius:10,
    elevation: 8,
    backgroundColor:'#fff5dd',
    marginBottom:8
  },
  imageStyle:{ 
    width: '100%',
     height: ex.height*0.2 ,
     borderRadius:5
    },
    descriotion:{marginBottom: 10,
      fontSize:20,
      textAlign:"center",
      fontWeight:"700",
      marginTop:3,
      marginBottom:3 
    },
  titleStyle:
  {fontSize:22,
    fontWeight:'700',
    color:'black'
  },
  buttonStyle:{borderRadius:5, 
    marginLeft: 0,
     marginRight: 0, 
     marginBottom: 0,
     backgroundColor:'#ffedc1',
     elevation:2},
     titleStyle2:{fontSize:22,fontWeight:"700"}
  });

export default class ClassPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            classesFromDB: this.props.navigation.state.params.userInfo.oldClasses,
            classList:this.props.navigation.state.params.userInfo


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
  containerStyle={styles.cardStyle}
    title={l.Title}
    titleStyle={styles.titleStyle2}
    >
    <Image
    source={{ uri:this.state.classList.oldClasses[i].Class_File_Path}}
    style={styles.imageStyle}
    resizeMode="cover"/>
    <Text style={styles.descriotion}>
      {l.Description}
    </Text>
    <Button
     titleStyle={styles.titleStyle}
     buttonStyle={styles.buttonStyle}
     title='היכנס לשיעור' 
      />
       
  </Card>
))
}
  </ScrollView>
 

      );
    }
  }

  