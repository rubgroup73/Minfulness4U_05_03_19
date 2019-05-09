import React from 'react';
import { StyleSheet, Text, View , Image,ScrollView} from 'react-native';
import { Card, Button} from 'react-native-elements';

const ServeregetUserInSection = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/GetUserInSectionReact?userId=";
const ServerclassVersion = "&classVersion=";
const ServerclassId = "&classId=";
const gifUri = 'https://media.giphy.com/media/AZ1PPDF8uO9MI/giphy.gif';
const pageToNavigate =  'mediaplayer';
var userInThisSectionObj = null;



export default class NextClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            userInThisClass:this.props.navigation.state.params.userInfo.userInThisClass, //The userInclass instance for this specific class
            nextClass: this.props.navigation.state.params.nextClass
          };
      }  
      NavigateToUserClass = (userInThisSectionObj) =>{
        debugger;
      
      this.props.navigation.navigate(
        pageToNavigate, 
        {
          userInThisClass:this.state.userInThisClass,
          nextClass:this.state.nextClass,
          userInThisSectionObj:userInThisSectionObj //Instance of the current section the user should do
        }
        );
    }
      getUserInSection = (userinThisClass,nextclass) =>{
        let userId = userinThisClass.UserId;
        let classId = nextclass.Id;
        let classVersion = nextclass.Version;
        let url = ServeregetUserInSection+userId+ServerclassVersion+classVersion+ServerclassId+classId;

        fetch(url)
        .then(response => response.json())
        .then((response) => {
          debugger;
          userInThisSectionObj = response;
          console.log(userInThisSectionObj);
          this.NavigateToUserClass(userInThisSectionObj);
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
        console.log(this.state.userInThisClass.UserId);
        this.getUserInSection(this.state.userInThisClass,this.state.nextClass); //get user in section array for this specific class from DB 
     
      }}
      />      
  </Card>
  </ScrollView>
        
      );
    }
  
  
}