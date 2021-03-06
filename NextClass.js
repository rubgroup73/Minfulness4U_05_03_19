import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView,AsyncStorage,Dimensions} from 'react-native';
import { Card, Button} from 'react-native-elements';
import moment from "moment";

const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };

const ServerUpdateRequest = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UpdateClassStartedReact";
const pageToNavigate =  'stateofmind';
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
     height: ex.height*0.55 ,
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
     titleStyle2:{fontSize:30,fontWeight:"700",maxHeight:100,textAlign:'center'}
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
        debugger;
        PLAYLIST = [];
        for(var i=0; i<res.length;i++){
          if(res[i].Section_Is_Finished==false){
            let index= res[i].File_Path.lastIndexOf("\\")+1;
            res[i].File_Path="http://proj.ruppin.ac.il/bgroup73/test1/tar4/files/"+res[i].File_Path.substring(index);
            NextSectionsArr.push(res[i]);
            PLAYLIST.push(new PlaylistItem(res[i].Section_Title,res[i].File_Path,false,res[i].Class_Id,res[i].Section_Id));
          }
        }
      }
      NavigateToUserClass = async (NextSectionsArr,userInThisClass) =>{
        debugger;
        let userInClassData;
        try{
          userInClassData = await AsyncStorage.getItem("userInThisClass");
          userInClassData = await JSON.parse(userInClassData);
          debugger;
          if(!userInClassData.IsStarted){//if != false =>enter
            try{userInClassData.StartTime=await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");}
            catch(error){console.log(error);}

            let data = {
              method: 'PUT',
              headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
              },
              body: data=JSON.stringify(userInClassData)
            }
            return fetch(ServerUpdateRequest, data)
                    .then(response => response.json())  // promise
                    .then(async (response) =>{    
                      console.log(response);
                      try{await AsyncStorage.setItem("userInThisClass",JSON.stringify(userInClassData));}
                      catch(error){console.log(error);} 
                      this.navigationToPlayer(NextSectionsArr,userInThisClass);                    
                    })
                    .catch((error=>{
                      console.log(error);
                    }))
          } 
        else
        this.navigationToPlayer(NextSectionsArr,userInThisClass) 
        }
        catch(error){console.log(error);}     
    }
    navigationToPlayer = (NextSectionsArr,userInThisClass)=>{
      this.props.navigation.navigate(
        pageToNavigate, 
        {
          userInThisClass:userInThisClass,
          nextClass:this.state.nextClass,
          SectionFinishedFalse:NextSectionsArr, //Instance of the current section the user should do
          userFullName:this.state.userFullName,
          PLAYLIST:PLAYLIST,
          beforeClass:true,
          userId:this.props.navigation.state.params.userId,
          classId:this.props.navigation.state.params.classId,
          classVersion:this.props.navigation.state.params.classVersion,
          userFullName:this.props.navigation.state.params.userFullName
        }
        );
    }

    componentDidMount = async ()=>
    {
      debugger;
      console.log(this.state.nextClass.Class_File_Path);
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
        debugger;
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
  
      //Need to continue from here.
  didBlurSubscription = this.props.navigation.addListener(
  'didFocus',
  payload => {
    (async () =>{
    let firstClass = await AsyncStorage.getItem('firstClass');
    })(); 
  }
);

    render(props) {
     
        return (            
      <ScrollView style={styles.outerContainer}>
  <Card containerStyle={styles.cardStyle}
  title={<Text numberOfLines={2} style={styles.titleStyle2}>{this.state.nextClass.Title}</Text>}>
  
    <Image
    source={{ uri:this.state.nextClass.Class_File_Path}}
    style={styles.imageStyle}
    resizeMode="cover"
    />
    
    <Button
     titleStyle={styles.titleStyle}
     buttonStyle={styles.buttonStyle}
     title='היכנס לשיעור' 
     onPress= { () => {
        this.getUserInSection(this.state.userInThisClass,this.state.nextClass); //get user in section array for this specific class from DB 
      }}
      />      
  </Card>
  </ScrollView>
        
      );
    }
  
  
}