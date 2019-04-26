import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList} from 'react-native';
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
},{ name: 'שיעור מספר 2',
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
        'Amy Farha',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
      page:'classpreview'
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      page:'classpreview'
    },
    {
      name: 'Amanda Martin',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      subtitle: 'CEO',
      page:'classpreview'
    },
    // {
    //   name: 'Christy Thomas',
    //   avatar_url:
    //     'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    //   subtitle: 'Lead Developer'
    // },
    // {
    //   name: 'Melissa Jones',
    //   avatar_url:
    //     'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
    //   subtitle: 'CTO'
    // }
  
  ]

  export default class Classlist extends React.Component{
constructor(props){
  super(props);
}

    loadClassesFromDB = (page,userInfo) =>{      
      this.props.navigation.navigate(
        page,
        {userInfo:userInfo}

        );
    }

    render () {
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
                 
                  subtitle={l.subtitle}
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



