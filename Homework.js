import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView,AsyncStorage,Dimensions} from 'react-native';
import { Card, Button} from 'react-native-elements';
import moment from "moment";
import LoadingLogo from './LoadingLogo';

const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };
const pageToNavigate =  'mediaPlayerHomework';
var NextSectionsArr = [];
const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor:'#2e3747'
  },
  cardStyle:{
    paddingTop:1,
    borderRadius:10,
    elevation: 8,
    backgroundColor:'#fff5dd',
    marginBottom:20,
  },
  imageStyle:{ 
    width: '100%',
     height: ex.height*0.4 ,
     borderRadius:5
    },
    descriotion:{marginBottom: 10,
      fontSize:20,
      textAlign:"center",
      fontWeight:"700",
      marginTop:3,
      marginBottom:3,
      minHeight:95 
    },
  titleStyle:
  {
    color:'#b2810a',
    fontSize:36,
    fontWeight:'900',
    textShadowColor:'#585858',
  textShadowRadius:5,},
  buttonStyle:{borderRadius:5, 
    marginTop:15,
    marginLeft: 0,
     marginRight: 0, 
     marginBottom: 0,
     backgroundColor:'#ffedc1',
     elevation:2},
     titleStyle2:{fontSize:30,fontWeight:"700",height:150,textAlign:'center'}
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
const PLAYLIST = [];
export default class Homework extends React.Component {
    constructor(props) {
        super(props);
          this.userInHomeWorkData;
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            userFullName:this.props.navigation.state.params.userFullName,
            classId:this.props.navigation.state.params.classId,
            classVersion:this.props.navigation.state.params.classVersion,
            userId:this.props.navigation.state.params.userId,
            currentDay:this.props.navigation.state.params.currentDay,
            isLoad:false
          };
      } 
      GetNextSectionsArr =(res) =>{
        
          if(res.Is_Finished==false){
            NextSectionsArr.push(res);
            PLAYLIST.push(new PlaylistItem(res.HomeWork_Name,res.HomeWork_Audio,false,res.Class_Id,res.HomeWorkId));
          }
       this.setState({isLoad:true})
       console.log(PLAYLIST);
        }
    
    componentWillMount = async () =>{
        console.log(this.state.userFullName);
        console.log(this.state.userId);
        console.log(this.state.currentDay);
        console.log(this.state.classVersion);
        console.log(this.state.classId);
        ServerGetHomework = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/returnhomeworkforuser?userId="+this.state.userId;
         fetch(ServerGetHomework)
                .then(response => response.json())  // promise
                .then(async (response) =>{
                  debugger;
                    if(response.IsHomeWork!=false) {   
                  console.log(response);
                  this.userInHomeWorkData = response;
                  this.GetNextSectionsArr(response);//one object of homework, sections not exists            
                    } 
                    else{
                        console.log("No homework were found for this user in DB");
                        this.props.navigation.navigate('alertComponentNoHomework');
                    }                 
                })
                .catch((error=>{
                  console.log(error);
                }))
    }
    navigationToPlayer = async (NextSectionsArr,userInThisClass)=>{
        try{this.userInHomeWorkData.Start_Time= await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");}
        catch(error){console.log(error);}
        let url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/userStartHomeWork";
        let data1;
        data1 =  {
          method: 'PUT',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: data=JSON.stringify(this.userInHomeWorkData)//get the value from storage so don't need to stringify
        }
  
            fetch(url, data1)
            .then(response => response.json())  // promise
            .then(async (response) =>{    
              console.log(response); 
              this.props.navigation.navigate(
                'MediaPlayerHomework', 
                {
                  userInThisClass:userInThisClass,//HomeWork object
                  nextClass:this.state.nextClass,
                  SectionFinishedFalse:NextSectionsArr, //Instance of the current section the user should do
                  userFullName:this.state.userFullName,
                  PLAYLIST:PLAYLIST,
                  beforeClass:true,
                  userId:this.props.navigation.state.params.userId,
                  classId:this.props.navigation.state.params.classId,//update to the correct ClassId
                  classVersion:this.props.navigation.state.params.classVersion,
                  userFullName:this.props.navigation.state.params.userFullName
                }
                );
                debugger; 
            })
            .catch((error=>{
              console.log(error);
            }))   
    }
    render(props) {
      if(!this.state.isLoad){
        return( <LoadingLogo></LoadingLogo> );
      }
      else{
        return (            
      <ScrollView style={styles.outerContainer}>
  <Card containerStyle={styles.cardStyle}
  title={<Text numberOfLines={2} style={styles.titleStyle2}>שיעורי בית</Text>}>
    <Image
    source={{ uri:'http://proj.ruppin.ac.il/bgroup73/test1/tar4/mediafiles/meditate2.jpg'}}
    style={styles.imageStyle}
    resizeMode="cover"
    />
    <Button
     titleStyle={styles.titleStyle}
     buttonStyle={styles.buttonStyle}
     title='היכנס לשיעור' 
     onPress= { () => {
        this.navigationToPlayer(NextSectionsArr,this.userInHomeWorkData);  //get user in section array for this specific class from DB 
      }}
      />      
  </Card>
  </ScrollView>
        
      );}
    }
  
  
}