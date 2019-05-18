import React from 'react';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity,AsyncStorage,Platform } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'; 

const REACTIONS = [
  { label: "מודאג", src: require('./assets/images/worried.png'), bigSrc: require('./assets/images/worried_big.png') },
  { label: "עצוב", src: require('./assets/images/sad.png'), bigSrc: require('./assets/images/sad_big.png') },
  { label: "חזק", src: require('./assets/images/ambitious.png'), bigSrc: require('./assets/images/ambitious_big.png') },
  { label: "שמח", src: require('./assets/images/smile.png'), bigSrc: require('./assets/images/smile_big.png') },
  { label: "מופתע", src: require('./assets/images/surprised.png'), bigSrc: require('./assets/images/surprised_big.png') },
];
const WIDTH = 320;
const DISTANCE =  WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;
const ServerStatus = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UserFeelingsReact";
const navigatePage = "alertComponentStateOfMind";

var userId;
var classId;
var classVersion;
var userFullName;
var UserInClassObj;

export default class StateOfMind extends React.Component {
  constructor(props) {
    super(props);
    this._pan = new Animated.Value(2 * DISTANCE);
    this.state = {
      stateOfMind:"חזק",
      toLoad:false
    }
  }

  componentWillMount() {
    userId = this.props.navigation.state.params.userId;
    classId = this.props.navigation.state.params.classId;
    classVersion = this.props.navigation.state.params.classVersion;
    userFullName = this.props.navigation.state.params.userFullName;
    
    console.log(userId);
    console.log(classId);
    console.log(classVersion);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

        this.updatePan(offset);
      }
    });
  }

  //** 
  //Need to do a fetch (post) to our's server and then to activate the alert component.
  //** 
  updatePan(toValue,lable) {
if(lable==null){
  this.setState({stateOfMind:"חזק"});
}
    Animated.spring(this._pan, { toValue, friction: 7 }).start();
    this.setState({stateOfMind:lable});
   
    }

    UpdateStateOfMind = (UserId,ClassId,ClassVersion,User_Feeling) => {
      // this.props.navigation.navigate(navigatePage,{userFullName:userFullName});
      UserId = JSON.parse(UserId);
      UserInClassObj = {
        UserId:UserId,
        ClassId:ClassId,
        ClassVersion:ClassVersion,
        User_Feeling:User_Feeling
      }
      debugger;
      console.log(UserInClassObj)
      let data = {
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: data=JSON.stringify(UserInClassObj)
      }
      return fetch(ServerStatus, data)
              .then(response => response.json())  // promise
              .then((response) =>{    
                console.log(response);         
                this.props.navigation.navigate(navigatePage,{userFullName:userFullName});
              })
              .catch((error=>{
                console.log(error);
              }))
    }
  render() {
    if(Platform.OS==='ios'){
    return (
      <View style={styles.outerdiv}>
      <Text h1 style={styles.header}>איך אתה מרגיש עכשיו?</Text>
      <View style={styles.container}>
        <View style={styles.wrap}>
        <Text style={styles.welcome}>
                  אנא בחר את הרגשתך ולסיום לחץ על 'שליחה'
                  </Text>
          
          <View style={styles.line} />

          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u-20, u, u+20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];

              if (u-20 < 0) {
                inputRange = [u, u+20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u+20 > END) {
                inputRange = [u-20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }


              return (
                <TouchableOpacity onPress={() => this.updatePan(u,reaction.label)} activeOpacity={0.9} key={idx}>
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[styles.smiley, {
                        transform: [{
                          scale: this._pan.interpolate({
                            inputRange,
                            outputRange: scaleOutputRange,
                            extrapolate: 'clamp',
                          })
                        }]
                      }]}
                    />
                  </View>

                  <Animated.Text style={[styles.reactionText, {
                    top: this._pan.interpolate({
                      inputRange,
                      outputRange: topOutputRange,
                      extrapolate: 'clamp',
                    }),
                    color: this._pan.interpolate({
                      inputRange,
                      outputRange: colorOutputRange,
                      extrapolate: 'clamp',
                    })
                  }]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View {...this._panResponder.panHandlers} style={[styles.bigSmiley, {
              transform: [{
                translateX: this._pan.interpolate({
                  inputRange: [0, END],
                  outputRange: [0, END],
                  extrapolate: 'clamp',
                })
              }]
            }]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[styles.bigSmileyImage, {
                      opacity: this._pan.interpolate({
                        inputRange,
                        outputRange,
                        extrapolate: 'clamp',
                      })
                    }]}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
        <AwesomeButtonRick style={styles.okbtn} onPress={() => {this.UpdateStateOfMind(userId,classId,classVersion,this.state.stateOfMind)}} backgroundColor="#3f96bf" backgroundDarker="#2b83ad" borderColor="black" borderWidth={1} width={140} height={70}  backgroundShadow="transparent"><Text style={styles.centerdText}>שליחה</Text></AwesomeButtonRick>
      </View>
      </View>
    );
            }
            /***************************************************Android***************************************************/
            else{
              return(
              <View style={styles2.outerdiv2}>
                <Text h1 style={styles2.header2}>איך אתה מרגיש עכשיו?</Text>
              <View style={styles2.container2}>
                <View style={styles2.wrap2}>
                  <Text style={styles2.welcome2}>
                  אנא בחר את הרגשתך ולסיום לחץ על 'שליחה'
                  </Text>
                  
                  <View style={styles2.line2} />
        
                  <View style={styles2.reactions2}>
                    {REACTIONS.map((reaction, idx) => {
                      const u = idx * DISTANCE;
                      let inputRange = [u-20, u, u+20];
                      let scaleOutputRange = [1, 0.25, 1];
                      let topOutputRange = [0, 10, 0];
                      let colorOutputRange = ['#999', '#222', '#999'];
        
                      if (u-20 < 0) {
                        inputRange = [u, u+20];
                        scaleOutputRange = [0.25, 1];
                        topOutputRange = [10, 0];
                        colorOutputRange = ['#222', '#999'];
                      }
        
                      if (u+20 > END) {
                        inputRange = [u-20, u];
                        scaleOutputRange = [1, 0.25];
                        topOutputRange = [0, 10];
                        colorOutputRange = ['#999', '#222'];
                      }
        
        
                      return (
                        <TouchableOpacity onPress={() => this.updatePan(u,reaction.label)} activeOpacity={0.9} key={idx}>
                          <View style={styles2.smileyWrap2}>
                            <Animated.Image
                              source={reaction.src}
                              style={[styles2.smiley2, {
                                transform: [{
                                  scale: this._pan.interpolate({
                                    inputRange,
                                    outputRange: scaleOutputRange,
                                    extrapolate: 'clamp',
                                  })
                                }]
                              }]}
                            />
                          </View>
        
                          <Animated.Text style={[styles2.reactionText2, {
                            top: this._pan.interpolate({
                              inputRange,
                              outputRange: topOutputRange,
                              extrapolate: 'clamp',
                            }),
                            color: this._pan.interpolate({
                              inputRange,
                              outputRange: colorOutputRange,
                              extrapolate: 'clamp',
                            })
                          }]}>
                            {reaction.label}
                          </Animated.Text>
                        </TouchableOpacity>
                      );
                    })}
                    <Animated.View {...this._panResponder.panHandlers} style={[styles2.bigSmiley2, {
                      transform: [{
                        translateX: this._pan.interpolate({
                          inputRange: [0, END],
                          outputRange: [0, END],
                          extrapolate: 'clamp',
                        })
                      }]
                    }]}>
                      {REACTIONS.map((reaction, idx) => {
                        let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
                        let outputRange = [0, 1, 0];
        
                        if (idx == 0) {
                          inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                          outputRange = [1, 0];
                        }
        
                        if (idx == REACTIONS.length - 1) {
                          inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                          outputRange = [0, 1];
                        }
                        return (
                          <Animated.Image
                            key={idx}
                            source={reaction.bigSrc}
                            style={[styles2.bigSmileyImage2, {
                              opacity: this._pan.interpolate({
                                inputRange,
                                outputRange,
                                extrapolate: 'clamp',
                              })
                            }]}
                          />
                        );
                      })}
                    </Animated.View>
                  </View>
                </View>
                <AwesomeButtonRick style={styles2.okbtn2} onPress={() => {this.UpdateStateOfMind(userId,classId,classVersion,this.state.stateOfMind)}} backgroundColor="#3f96bf" backgroundDarker="#2b83ad" borderColor="black" borderWidth={1} width={140} height={70}  backgroundShadow="transparent"><Text style={styles2.centerdText}>שליחה</Text></AwesomeButtonRick>
              </View></View>);
            }    
  }
}

 const size = 42;
/******************************************** IOS Operating System Srtles **********************************************/
const styles = StyleSheet.create({
  outerdiv:{
    padding:20,
    flex: 1,
    backgroundColor: '#fff5dd'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor:'black',
  },
  header:{
    fontSize:40,
    fontWeight:'600',
    textAlign:'center',
    
      },
  wrap: {
    width: WIDTH,
    marginBottom: 50,
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    color: '#777',
    fontWeight: '700',
    marginBottom:20
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#c7ced3',
  },
  centerdText:{
    fontSize:20,
  textAlign:'center',
  width:120,
  color: 'black',
  fontWeight: '600',
  
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  okbtn:{
    justifyContent: 'center',
    width:120,
    marginTop:20
    
  },
 
  reactionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    fontWeight: '600',
    fontFamily: 'Avenir',
    marginTop: 5,
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  }
});
          

  
/******************************************** Androind Operating System Srtles **********************************************/

const styles2 = StyleSheet.create({
  outerdiv2:{
    padding:20,
    flex: 1,
    backgroundColor: '#fff5dd',
  },
  container2: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  

  },
  wrap2: {
    width: WIDTH,
    marginBottom: 50,
  },
  header2:{
fontSize:40,
fontWeight:'600',
textAlign:'center',
marginBottom:20

  },
okbtn2:{
  justifyContent: 'center',
  width:120,
  marginTop:20
  
},
centerdText:{
  fontSize:20,
textAlign:'center',
width:120,
color: 'black',
fontWeight: '600',

},
  welcome2: {
    fontSize: 24,
    textAlign: 'center',
    color: '#777',
    fontWeight: '700',
    marginBottom:20
    
  },

  reactions2: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap2: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley2: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley2: {
  
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage2: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText2: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    fontWeight: '600',
    
    marginTop: 5,
  },
  line2: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  }
});
          
