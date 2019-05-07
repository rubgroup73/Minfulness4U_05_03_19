import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList,Image,AsyncStorage,Text} from 'react-native';
import { ListItem , List} from 'react-native-elements';



const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 200
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey',
      alignItems: 'center',
      textAlign: 'center',
    },
    listStyle:{
        textAlign:'right',
    },
    rightto:{
        textAlign:'right'
    }
  })
  const list = [
    {
      name:
        'השיעור הבא',
        description:null,
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',
      page:'nextclass'
    },
    {
      name: 'שיעורים שביצעתי',
      description:"כמה הספקתי?",
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',   
      page:'classpreview'
    },
    {
      name: 'שיעורי בית',
      description:"חזרה על על השיעור",
      avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',
      page:'classpreview'
    },
    {
      name: 'פורום קבוצתי',
      description:"מה אני חושב",
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
        page:'classpreview'
    }
  
  ]

  const stateofmind = 'stateofmind';
  var userInClassArr =[];//All userInClass array for all classes
  var allUserclasses =[];//All classes array with the user's version  
  var nextclass ;//Next class for the user-(*)
  var userInThisClass; //The userInclass instance for this (*) class
  var oldClasses=[];//Previous classes-The user has already done these classes.



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
    userFeedback:null


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
//** 
//Next time need to start from this point!
//** 
    loadClassesFromDB = (page,userInfo,nextclass) =>{   
     debugger;
      if(nextclass != null){
      this.props.navigation.navigate(
        page,
        {userInfo:userInfo,
         nextClass:nextclass
        });
      }
      else if(nextclass == null){
       
        if(this.state.userFeedback == 'false'){
        
         this.props.navigation.navigate(
           stateofmind
         );
       }
       else{
         alert("סיימת את הקורס! כל הכבוד!")
       }

      }
    }

    
      
     
    
//********************************* 
    updateStates =  (id,fullname,username,groupId,groupVersion,classesArr,nextlesson,oldClasses,userinclass,userFeedback) =>{
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
  userFeedback:userFeedback
  });
    }

    setAllClasses = (userInClassArr) =>{
      let counter = 0;//Indicates if all classess has finished
      for (var i=0; i<userInClassArr.length;i++){
        allUserclasses.push(userInClassArr[i].AppClass);
        if(userInClassArr[i].IsFinished != true){
         debugger;
         counter++;
          nextclass=userInClassArr[i].AppClass;
          userInThisClass=userInClassArr[i];

        }
      }
      if(counter == 0){
        nextclass = null;
      }
    }

    SetOldClasses=(userInClass)=>{
      for(var i=0; i<userInClass.length;i++){
        if(userInClass[i].IsFinished==true){
          oldClasses.push(userInClass[i].AppClass);
        }
      }
    }

componentDidMount = async () => {
  
 let id = await AsyncStorage.getItem("userid");
 let fullname = await AsyncStorage.getItem("fullname");
 let username = await AsyncStorage.getItem("username");
 let groupId = await AsyncStorage.getItem("groupId");
 let groupVersion = await AsyncStorage.getItem("groupVersion");
 let userFeedback = await await AsyncStorage.getItem("sendfeedback");

urluserInClass = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetUserInClassReact?userId=";
urluserInClass += id;

fetch(urluserInClass)
.then(response => response.json())
.then((response) => {
  userInClassArr = response;
  this.setAllClasses(userInClassArr);
  this.SetOldClasses(userInClassArr);
  this.updateStates(id,fullname,username,groupId,groupVersion,allUserclasses,nextclass,oldClasses,userInThisClass,userFeedback);
})

.catch((error=>{
  console.log(error);
}))

}
    render () {
      if(this.state.changed == false){
        return(
          <View style={{ flexDirection: 'column', justifyContent: 'center',alignItems: 'center',}}>       
                <Image source={require('./assets/images/Loading_2.gif')} />
         </View> 
);
      }
      else{
        return (
   
            <View style = {styles.listStyle}>
            <Text style={{textAlign:'center'}}>שלום {this.state.fullName}</Text>
            {
              list.map((l, i) => (
                <ListItem 
                  
                  key={i}          
                  leftAvatar={                
                    {
                      source: { uri: l.avatar_url},
                      height:80,
                      width:100
                    }
                  
                  }    
                  title={ l.name}
                  numberOfLines={1}
                 
                  titleNumberOfLines={1}
                  // pageInfo={l.page}
                  onPress= {() => {
                    if(l.page == 'classpreview')
                    this.loadPreviousClassesFromDB(l.page,this.state,allUserclasses);
                    else if(l.page=='nextclass')
                    this.loadClassesFromDB(l.page,this.state,this.state.nextLesson);
                  }}
                
                  
                />
              ))
            }
          </View>
         
        )
          }
      }
}

 // let allUserclasses = await AsyncStorage.getItem("allUserclasses");

// urlClasses="http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetClassVersionReact?userId=";
// urlClasses += id;

// crateClassList = (classArr) =>{
//   classArr.map((c) => {
//     console.log(c);
//     LIST.push(new listOfClass(c.Description,c.Title,c.Position,c.Score,this.state.nextClasseArr[this.state.nextClasseArr.length-1],"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg"));
//   });
//   console.log(this.state.nextClasseArr);
//   console.log(LIST);
// }

//*************************************************************************/
// Promise.all([
//   fetch(urlClasses),
//   fetch(urlNextClass)
// ])
// .then(([Classes,NextClass])=>Promise.all([Classes.json,NextClass.json]))
// .then(([Classes,NextClass]) => this.setState({
//   classesArr:Classes,
//   nextClasseArr:NextClass,
//   nextClass:this.state.nextClasseArr.pop(),
//   changed:true
// }))
// .then(()=>{
//   console.log(this.state.classesArr);
//   console.log(this.state.nextClasseArr);
//   console.log(this.state.nextClasseArr);
// })
// .catch((error=>{
//   console.log(error);
// }))

// fetch(urlClasses)
  //   .then(response => response.json())
  //   .then(response=>{
  //     classesArr = response;
  //   })
 
  // .then(()=>{
  //   console.log(classesArr);
    
  // }) 
  // .then(()=>{
  //   fetch(urlNextClass)
  //   .then(response => response.json())
  //   .then(response=>{
  //     nextclassarr = response;
  //     changed = true;
  //     this.updateStates(id,fullname,username,groupId,groupVersion,classesArr,nextclassarr,changed);
  //   })

  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // })
  
  //   .catch((error)=>{
  //     console.log(error);
  //   });
 //*************************************************************************/