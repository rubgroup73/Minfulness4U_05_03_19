import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList,Image,AsyncStorage} from 'react-native';
import { ListItem , List} from 'react-native-elements';
import ClassPreview from './ClassPreview';

const ClassList2 = [
  {
     name: 'שיעור מספר 1',
     content: 'שיעור הרמת גבה',
     image:'https://media.giphy.com/media/AZ1PPDF8uO9MI/giphy.gif'
  },
 { name: 'שיעור מספר 2',
 content: 'שיעור חיוך לרוחב',
image:'https://i.gifer.com/5nc.gif'
},
{ name: 'שיעור מספר 2',
content: 'שיעור חיוך לרוחב',
image:'https://i.gifer.com/5nc.gif'
}
  
 ];

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
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',
      page:'classpreview'
    },
    {
      name: 'שיעורים שביצעתי',
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',   
      page:'classpreview'
    },
    {
      name: 'שיעורי בית',
      avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpIFGtQf4Fmkg-i6zmCmTrg5lRnBYYFVcZ2FDyEPTR6FW9oANWg',
      page:'classpreview'
    },
    {
      name: 'פורום קבוצתי',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    },
    // {
    //   name: 'Melissa Jones',
    //   avatar_url:
    //     'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
    //   subtitle: 'CTO'
    // }
  
  ]

  class listOfClass {
    constructor(Description,Title,Position,Score){
      this.Description = Description;
      this.Title=Title;
      this.Position=Position;
      this.Score=Score;
    }
  }

  const LIST = [];

  export default class Classlist extends React.Component{
constructor(props){
  super(props);
  this.state = {
    fullName:"",
    classVersion:-1,
    userId:-1,
    userName:"",
    classesArr:[],
    nextLesson :null,
    changed:false,
    groupId:null,
    groupVersion:null,
    nextClasseArr:[]


  }
}

componentDidMount = async () => {
  debugger;
  let id = await AsyncStorage.getItem("userid");
  let fullname = await AsyncStorage.getItem("fullname");
 let username = await AsyncStorage.getItem("username");
 let groupId = await AsyncStorage.getItem("groupId");
 let groupVersion = await AsyncStorage.getItem("groupVersion");

this.setState({
  userId: id,
  fullName: fullname,
  userName:username,
  groupId:groupId,
  groupVersion:groupVersion
  });
  
 // let allUserclasses = await AsyncStorage.getItem("allUserclasses");
 
urlClasses="http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetClassVersionReact?userId=";
urlClasses += id;
urlNextClass = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetUserInClassReact?userId=";
urlNextClass += id;

 fetch(urlClasses)
    .then(response => response.json())
    .then((response => this.setState({  
      classesArr:response
  })))
  .then(()=>{
    this.crateClassList();
  })  
    .catch((error)=>{
      console.log(error);
    })

    
     fetch(urlNextClass)
    .then(response => response.json())
    .then((response => this.setState({  
      nextClasseArr:response

  })))
 
    .catch((error)=>{
      console.log(error);
    })

}

crateClassList = () =>{
  this.state.classesArr.map((c) => {
    console.log(c);
    LIST.push(new listOfClass(c.Description,c.Title,c.Position,c.Score));
  })
}
   
    loadClassesFromDB = (page,userInfo) =>{      
      this.props.navigation.navigate(
        page,
        {userInfo:userInfo}

        );
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
                  onPress= {() => this.loadClassesFromDB(l.page,ClassList2)}
                
                  
                />
              ))
            }
          </View>
         
        )
          }
      }
}



