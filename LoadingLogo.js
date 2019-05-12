import React from 'react';
import { View,Dimensions,Image} from 'react-native';
import { Spinner } from 'nachos-ui';



const img=require('./assets/images/Mindfulness4ULogo.png');
const ex={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
    };
export default class LoadingLogo extends React.Component {
    render() {
      return (
         <View style={{flex:1,backgroundColor:'#2e3747'}}>
        <Image
        style={{height:250, width:ex.width,justifyContent:'center',alignItems:'center',backgroundColor:'#2e3747',marginTop:120}}
        source={require('./assets/images/Mindfulness4ULogo.png')}
        resizeMode="contain"
      />
      <View style={{ transform: [{ rotate: '-90deg'}],marginTop:150}}>
      <Spinner duration={500} color='#ECA627' size={50} ></Spinner>
      </View>
     </View>

      );}
}

/* <Image
        style={{height:250, width:ex.width,justifyContent:'center',alignItems:'center',backgroundColor:'#2e3747',marginTop:120}}
        source={require('./assets/images/Ellipsis-3.4s-200p.gif')}
        resizeMode="contain"
      /> */
          