import React from 'react';
import { View,Dimensions,Image,StyleSheet} from 'react-native';
import { Spinner } from 'nachos-ui';
const ex={
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
  };
const styles = StyleSheet.create({
  imageStyle:{height:250, width:ex.width,justifyContent:'center',alignItems:'center',backgroundColor:'#2e3747',marginTop:120,zIndex:3},
  viewStyle:{flex:1,backgroundColor:'#2e3747'},
  imageStyle2:{height:250, width:ex.width,justifyContent:'center',alignItems:'center',backgroundColor:'#2e3747',marginTop:-30,zIndex:0},
  spinner:{ transform: [{ rotate: '-90deg'}],marginTop:180,zIndex:3},
 

 })

const img=require('./assets/images/Mindfulness4ULogo.png');

export default class LoadingLogo extends React.Component {
  constructor(props){
    super(props);
    this.loadVersion=props.loadVersion;
  }
    render(props) {
      if(this.loadVersion==123){
      return (
         <View style={styles.viewStyle}>
        <Image
        style={styles.imageStyle}
        source={require('./assets/images/Mindfulness4ULogo.png')}
        resizeMode="contain"
      />
      {<Image
        style={styles.imageStyle2}
        source={require('./assets/images/FreeYour.gif')}
        resizeMode="contain"
      />}
      
     </View>

      )}
      
      else{
        return( <View style={styles.viewStyle}>
          <Image
          style={styles.imageStyle}
          source={require('./assets/images/Mindfulness4ULogo.png')}
          resizeMode="contain"
        />
        <View style={styles.spinner}>
        <Spinner duration={500} color='#ECA627' size={50} ></Spinner>
        </View>
       </View>)
      }
      ;}
}

/* <Image
        style={{height:250, width:ex.width,justifyContent:'center',alignItems:'center',backgroundColor:'#2e3747',marginTop:120}}
        source={require('./assets/images/Ellipsis-3.4s-200p.gif')}
        resizeMode="contain"
      /> */