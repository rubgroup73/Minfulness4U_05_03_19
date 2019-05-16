import React from 'react';
import { StyleSheet, View, FlatList,Image,AsyncStorage,Text} from 'react-native';
import { ListItem , List} from 'react-native-elements';
import LoadingLogo from './LoadingLogo';

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
      backgroundColor:'#fff5dd',
      marginBottom:0,
      height:'100%',
      borderBottomWidth:20,
      borderBottomColor:'#ffedc1',
      
      
  },
  rightto:{
    textAlign:'right'
  },
  listItemStyle:{
    backgroundColor:'#fff5dd',
    borderBottomColor:'#ffedc1',
    borderBottomWidth : 3,
  
  },
  titleStyle:{
    fontSize:18,
    fontWeight:'500',
    color:'#2e3747',
    
  },
  subtitleStyle:{
    fontSize:15,paddingTop:10,
    fontWeight:'500',
    color:'#2e3747',
  },
  userNameHead:{
    textAlign:'center',
    fontSize:20,

    backgroundColor:'#2e3747',
    color:'white',
    fontWeight:'500',
    borderBottomWidth:10,
      borderBottomColor:'#ffedc1',

    
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
var classId = status; //if we found in the server that the classId is equal to -100 it's mean that all classes has finished
var classVersion = status // the same reason like classId

export default class Classlist extends React.Component{
constructor(props){
  super(props);
  this.currentClass;
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
    updateStates =  (id,fullname,username,groupId,groupVersion,classesArr,nextlesson,oldClasses,userinclass,userFeedback,classId,classVersion) =>{
    
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
  classVersion:classVersion,
  classId:classId,

  });
    }
    setAllClasses = (userInClassArr) =>{
      debugger;
      let counter = 0;//Indicates if all classess has finished
      for (var i=0; i<userInClassArr.length;i++){
        allUserclasses.push(userInClassArr[i].AppClass);
        if(userInClassArr[i].IsFinished != true){
          counter++;
          nextclass=userInClassArr[i].AppClass;
          userInThisClass=userInClassArr[i];
          this.currentClass=userInClassArr[i].AppClass.Title;
          classId = userInClassArr[i].AppClass.Id;
          classVersion = userInClassArr[i].AppClass.Version;
          break;
        }
      }
      if(counter == 0){
        nextclass = null;
        this.currentClass= 'סיימת את כל השיעורים'
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
  debugger;
  let id;
  let fullname;
  let username;
  let groupId;
  let groupVersion;
  let userFeedback;
  try{
    await AsyncStorage.setItem("requestToServer",JSON.stringify(true));
    await AsyncStorage.setItem("repeatSection",JSON.stringify(0));
     id = await AsyncStorage.getItem("userid");
     fullname = await AsyncStorage.getItem("fullname");
     username = await AsyncStorage.getItem("username");
     groupId = await AsyncStorage.getItem("groupId");
     groupVersion = await AsyncStorage.getItem("groupVersion");
     userFeedback = await AsyncStorage.getItem("sendfeedback");
  }catch(error){console.log(error);}

urluserInClass = userInClassFetch;
urluserInClass += id;

fetch(urluserInClass)
.then(response => response.json())
.then((response) => {
  userInClassArr = response;
  this.setAllClasses(userInClassArr);
  this.SetOldClasses(userInClassArr);
  this.updateStates(id,fullname,username,groupId,groupVersion,allUserclasses,nextclass,oldClasses,userInThisClass,userFeedback,classId,classVersion);
})

.catch((error=>{
  console.log(error);
}))

}
    render () {
      if(this.state.changed == false){
        return(
          <LoadingLogo></LoadingLogo>
);
      }
      //temp list of screens should be dynamic after test
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
                containerStyle = {styles.listItemStyle}
                title ='השיעור הבא'
                titleStyle={styles.titleStyle}
                subtitle ={this.currentClass}
                subtitleStyle={styles.subtitleStyle}
                numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:classesPic,height:heightPic,width:widthPic}}
                
             />  
              <ListItem
              onPress = {() => {this.loadPreviousClassesFromDB(appPages[1],this.state,allUserclasses);}}
              containerStyle = {styles.listItemStyle}
              title = 'שיעורים שביצעתי'
               subtitle ='רשימת השיעורים שסיימתי'
               titleStyle={styles.titleStyle}
               subtitleStyle={styles.subtitleStyle}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:finishClassesPic,height:heightPic,width:widthPic}}
             />  
              <ListItem
              containerStyle = {styles.listItemStyle}
              title = 'שיעורי בית'
               subtitle = 'שיעורי בית לשיעור הנוכחי'
               titleStyle={styles.titleStyle}
               subtitleStyle={styles.subtitleStyle}
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
               containerStyle = {styles.listItemStyle}
               title ='איך אני מרגיש'
               subtitle = 'שתף אותנו בהרגשתך'
               titleStyle={styles.titleStyle}
               subtitleStyle={styles.subtitleStyle}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:userFeelingPic,height:heightPic,width:widthPic}}
             />     
               <ListItem
                containerStyle = {styles.listItemStyle}
                title = 'פורום קבוצתי'
                subtitle = 'המקום שלך לדבר עם קבוצתך'
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
               numberOfLines={1}
               titleNumberOfLines={1}
               leftAvatar = {{source:chatPic,height:heightPic,width:widthPic}}
             />        
          </View>
         
        )
          }
      }
}

