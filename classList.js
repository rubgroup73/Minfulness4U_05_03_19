import React from 'react';
import { StyleSheet, View, FlatList,Image,AsyncStorage,Text} from 'react-native';
import { ListItem , List} from 'react-native-elements';

const classesPic =  require('./assets/images/classes.jpg');
const finishClassesPic = require('./assets/images/finishedClasses.png');
const homeWorkPic = require('./assets/images/homework.jpg');
const userFeelingPic = require('./assets/images/myFeeling.png');
const chatPic = require('./assets/images/Chat_bubbles.png')
const heightPic = 80;
const widthPic = 100;
const loadIcon = require('./assets/images/Loading_2.gif');
const userInClassFetch = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetUserInClassReact?userId=";


const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',paddingLeft: 10,paddingTop: 5
  },
  ratingImage: {
    height: 19.21,width: 200
  },
  ratingText: {
    paddingLeft: 10,color: 'grey',alignItems: 'center',textAlign: 'center',
  },
  listStyle:{
      textAlign:'right',
  },
  rightto:{
    textAlign:'right'
  },
  listItemStyle:{
    borderBottomColor:'#e3e4e5',borderBottomWidth : 1.25
  },
  subtitleFont:{
    fontSize:13,paddingTop:10
  },
  userNameHead:{
    textAlign:'center',fontSize:20,borderWidth:2
  },
  loadIconStyle:{
    flexDirection: 'column', justifyContent: 'center',alignItems: 'center',
  }
});

const appPages = 
[
    'classlist',
    'classpreview',
    'nextclass',
    'mediaplayer',
    'stateofmind',
    'alertComponent'
]
const status = -100;
var userInClassArr =[];//All userInClass array for all classes
var allUserclasses =[];//All classes array with the user's version  
var nextclass ;//Next class for the user-(*)
var userInThisClass; //The userInclass instance for this (*) class
var oldClasses=[];//Previous classes-The user has already done these classes.
var userFinishAllClasses=false;
var currentClass = null;
var classId = status; //if we found in the server that the classId is equal to -100 it's mean that all classes has finished
var classVersion = status // the same reason like classId

export default class Classlist extends React.Component{
constructor(props){
  super(props);
  this.state = {
    fullName:"",
    classVersion:-1,
    userId:-1,
    userName:"",
    classesArr:[],//all classes and section with the relevant version for a specific user 
    nextLesson :null,
    groupId:null,
    groupVersion:null,
    changed:false,
    oldClasses:null,
    userInThisClass:null,
    currentClass:"כל השיעורים בוצעו",//the name(string) of the next class
    classVersion:status,
    classId:status
  
  }
}
loadPreviousClassesFromDB =(page,userInfo,allclasses) =>{   

  this.props.navigation.navigate(
    page,
    {userInfo:userInfo,
     allclasses:allclasses
    }
    
    );
}
    loadClassesFromDB = (page,userInfo,nextclass) =>{   
     
      if(nextclass != null){
      this.props.navigation.navigate(
        page,
        {userInfo:userInfo,
         nextClass:nextclass,
         userFullName:JSON.parse(this.state.fullName)
        });
      }
       else{userFinishAllClasses = true;}
      }
    
//********************************* 
    updateStates =  (id,fullname,username,groupId,groupVersion,classesArr,nextlesson,oldClasses,userinclass,userFeedback,currentClass,classId,classVersion) =>{
    
   this.setState({
  userId: id,
  fullName: fullname,
  userName:username,
  groupId:groupId,
  groupVersion:groupVersion,
  classesArr:classesArr,
  nextLesson:nextlesson,
  changed:true,
  oldClasses:oldClasses,
  userInThisClass:userinclass,
  userFeedback:userFeedback,
  currentClass:currentClass,
  classVersion:classVersion,
  classId:classId,

  });
    }
    setAllClasses = (userInClassArr) =>{
      let counter = 0;//Indicates if all classess has finished
      for (var i=0; i<userInClassArr.length;i++){
        allUserclasses.push(userInClassArr[i].AppClass);
        if(userInClassArr[i].IsFinished != true){
        
          counter++;
          nextclass=userInClassArr[i].AppClass;
          userInThisClass=userInClassArr[i];
          currentClass=userInClassArr[i].AppClass.Title;
          classId = userInClassArr[i].AppClass.Id;
          classVersion = userInClassArr[i].AppClass.Version;
          break;
        }
      }
      if(counter == 0){
        nextclass = null;
      }
    }
    SetOldClasses=(userInClass)=>{
      debugger;
      for(var i=0; i<userInClass.length;i++){
        if(userInClass[i].IsFinished==true){
          oldClasses.push(userInClass[i].AppClass);
        }
      }
    }
componentDidMount = async () => {
 await AsyncStorage.setItem("requestToServer",JSON.stringify(true));
 await AsyncStorage.setItem("repeatSection",JSON.stringify(0));
 let id = await AsyncStorage.getItem("userid");
 let fullname = await AsyncStorage.getItem("fullname");
 let username = await AsyncStorage.getItem("username");
 let groupId = await AsyncStorage.getItem("groupId");
 let groupVersion = await AsyncStorage.getItem("groupVersion");
 let userFeedback = await AsyncStorage.getItem("sendfeedback");

urluserInClass = userInClassFetch;
urluserInClass += id;

fetch(urluserInClass)
.then(response => response.json())
.then((response) => {
  userInClassArr = response;
  this.setAllClasses(userInClassArr);
  this.SetOldClasses(userInClassArr);
  this.updateStates(id,fullname,username,groupId,groupVersion,allUserclasses,nextclass,oldClasses,userInThisClass,userFeedback,currentClass,classId,classVersion);
})

.catch((error=>{
  console.log(error);
}))

}
    render () {
      if(this.state.changed == false){
        return(
          <View style={styles.loadIconStyle}>       
                <Image source={loadIcon} />
         </View> 
);
      }
      else{
        return (
   
            <View style = {styles.listStyle}>
            <Text style={styles.userNameHead}>שלום {JSON.parse(this.state.fullName)}</Text>
            <ListItem
              onPress = {() => 
                {
                  this.loadClassesFromDB(appPages[2],this.state,this.state.nextLesson);
                  if(userFinishAllClasses==true){
                    this.props.navigation.navigate(appPages[5]);
                  }
                }}
              style = {styles.listItemStyle}
               title = {<Text>השיעור הבא</Text>}
               subtitle = {<Text style={styles.subtitleFont}>{this.state.currentClass}</Text>}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:classesPic,height:heightPic,width:widthPic}}
                
             />  
              <ListItem
              onPress = {() => {this.loadPreviousClassesFromDB(appPages[1],this.state,allUserclasses);}}
              style = {styles.listItemStyle}
               title = {<Text>שיעורים שביצעתי</Text>}
               subtitle =  {<Text style={styles.subtitleFont} >כמה שיעורים עשיתי</Text>}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:finishClassesPic,height:heightPic,width:widthPic}}
             />  
              <ListItem
              style = {styles.listItemStyle}
               title = {<Text>שיעורי בית</Text>}
               subtitle =  {<Text style={styles.subtitleFont} >חזרה על השיעור</Text>}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:homeWorkPic,height:heightPic,width:widthPic}}
             />    
              <ListItem
              onPress = {()=>{
                this.props.navigation.navigate(
                  appPages[4],
                  {userId:this.state.userId,classId:this.state.classId,classVersion:this.state.classVersion,
                    userFullName:JSON.parse(this.state.fullName)}
                  )}}
              style = {styles.listItemStyle}
               title = {<Text>איך אני מרגיש</Text>}
               subtitle =  {<Text style={styles.subtitleFont} >שתף אותנו</Text>}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:userFeelingPic,height:heightPic,width:widthPic}}
             />     
               <ListItem
               style = {styles.listItemStyle}
               title = {<Text>פורום קבוצתי</Text>}
               subtitle =  {<Text style={styles.subtitleFont} >בוא נדבר</Text>}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:chatPic,height:heightPic,width:widthPic}}
             />        
          </View>
         
        )
          }
      }
}

