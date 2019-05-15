import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView,AsyncStorage} from 'react-native';
import { Card, Button} from 'react-native-elements';
import moment from "moment";


const gifUri = 'https://media.giphy.com/media/AZ1PPDF8uO9MI/giphy.gif';
const pageToNavigate =  'mediaplayer';
var NextSectionsArr = [];

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

export default class NextClass extends React.Component {
    constructor(props) {
        super(props);
          
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            userInThisClass:this.props.navigation.state.params.userInfo.userInThisClass, //The userInclass instance for this specific class
            nextClass: this.props.navigation.state.params.nextClass,
            userFullName:this.props.navigation.state.params.userFullName
          };
      } 
      
      GetNextSectionsArr =(res) =>{
        for(var i=0; i<res.length;i++){
          if(res[i].Section_Is_Finished==false){
            NextSectionsArr.push(res[i]);
            PLAYLIST.push(new PlaylistItem(res[i].Section_Title,res[i].File_Path,false,res[i].Class_Id,res[i].Section_Id));
          }
        }
        debugger;
      
      }
      NavigateToUserClass = async (NextSectionsArr,userInThisClass) =>{
        let userInClassData;
        try{
          userInClassData = await AsyncStorage.getItem("userInThisClass");
          userInClassData = await JSON.parse(userInClassData);
          debugger;
          if(!userInClassData.IsStarted){
            userInClassData.StartTime=await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          }     
          await AsyncStorage.setItem("userInThisClass",JSON.stringify(userInClassData));
        }
        catch(error){console.log(error);}
        
      this.props.navigation.navigate(
        pageToNavigate, 
        {
          userInThisClass:userInThisClass,
          nextClass:this.state.nextClass,
          SectionFinishedFalse:NextSectionsArr, //Instance of the current section the user should do
          userFullName:this.state.userFullName,
          PLAYLIST:PLAYLIST
        }
        );
    }

    componentDidMount = async ()=>
    {
      try{await AsyncStorage.setItem("userInThisClass",JSON.stringify(this.props.navigation.state.params.userInfo.userInThisClass));}
      catch(error){console.log(error);}
    }

      getUserInSection = (userinThisClass,nextclass) =>{
        let userId = userinThisClass.UserId;
        let classId = nextclass.Id;
        let classVersion = nextclass.Version;
        let userInThisClass = this.state.userInThisClass;
        let url = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetUserInSectionReact?userId=";
        url += userId;
        url += "&classVersion="+classVersion;
        url += "&classId="+classId;

        fetch(url)
        .then(response => response.json())
        .then((response) => {
           this.GetNextSectionsArr(response);
           this.NavigateToUserClass(NextSectionsArr,userInThisClass);
        })
        .catch((error=>{
          console.log(error);
        }))
      } 
    render(props) {
     
        return (            
      <ScrollView>
  <Card 
  style={{fontSize:22,fontWeight:"700"}}
    title={this.state.nextClass.Title}>
    <Image
    source={{ uri:gifUri}}
    style={{ width: '100%', height: 200 }}/>
    <Text style={{marginBottom: 10,fontSize:20,textAlign:"center",fontWeight:"700" }}>
      {this.state.nextClass.Description}
    </Text>
    <Button
     style={{fontSize:50}}
      backgroundColor='#03A9F4'
      buttonStyle={{borderRadius:5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title={<Text>היכנס לשיעור</Text>} 
      onPress= { () => {
        this.getUserInSection(this.state.userInThisClass,this.state.nextClass); //get user in section array for this specific class from DB 
      }}
      />      
  </Card>
  </ScrollView>
        
      );
    }
  
  
}