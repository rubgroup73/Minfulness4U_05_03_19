import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView,Dimensions,AsyncStorage} from 'react-native';
import { Card, Button} from 'react-native-elements';

const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };
const gifUri = 'http://proj.ruppin.ac.il/bgroup73/test1/tar4/mediaFiles/touch.jpg';
const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor:'#2e3747'
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
      marginBottom:8,
    height:55,
    },
  titleStyle:
  {fontSize:22,
    fontWeight:'700',
    color:'black'
  },
  buttonStyle:
  { color:'#b2810a',
    borderRadius:5, 
    marginLeft: 0,
     marginRight: 0, 
     marginBottom: 0,
     backgroundColor:'#ffedc1',
     elevation:2},
     titleStyle2:{fontSize:22,fontWeight:"700",height:70,textAlign:'center'}
  });


  class PlaylistItem {
    constructor(name, uri, isVideo,Class_Id,Section_Id) {
      this.name = name;
      this.uri = uri;
      this.isVideo = isVideo;
      this.Class_Id=Class_Id;
      this.Section_Id= Section_Id;
    }
  }
  var PLAYLIST = [];

export default class ClassPreview extends React.Component {
    constructor(props) {
        super(props);
        this.classesFromDB =this.props.navigation.state.params.userInfo.oldClasses
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            classList:this.props.navigation.state.params.userInfo
          };
      }
       componentDidMountAsync = async () =>{
        var PLAYLIST = [];
      }
      oldClassesPlayer = (classObject) =>{
        
        classObject.Sections.map((res) => {
        PLAYLIST.push(new PlaylistItem(res.Title,res.FilePath,false,res.ClassId,res.Id));
       
        })
        debugger;
       this.props.navigation.navigate('mediaPlayerOldClasses',
       {PLAYLIST:PLAYLIST});
      }

      didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            console.log('didFocus', payload);
            this.componentDidMountAsync(); 
        }
      );
  
    render(props) {
      console.log(this.props.navigation.state.params.userInfo);
        return (        
      <ScrollView style={styles.outerContainer}>
{
this.classesFromDB.map((l, i) => (
  <Card 
    key={i}
    containerStyle={styles.cardStyle}
    title={<Text numberOfLines={2} style={styles.titleStyle2}>{l.Title}</Text>}
    >
    <Image
    source={{ uri:this.state.classList.oldClasses[i].Class_File_Path}}
    style={styles.imageStyle}
    resizeMode="cover"/>
    <Text style={styles.descriotion}>
      {l.Description}
    </Text>
    <Button
     onPress = {()=> {debugger; this.oldClassesPlayer(l);}}
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

  