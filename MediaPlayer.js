/**
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Asset, Audio, Font, Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import moment from "moment";

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}


//Const var to store all our's PlaylistiItem
//*******************************/

const ServerRequest1 = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UpdateDataUserInClassReact";
const ServerRequest2 = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UpdateDataUserRepeatSecReact";
const ServerRequest3 = "http://proj.ruppin.ac.il/bgroup73/test1/tar4/api/Fetch/UpdateClassStatuscReact";
const ICON_THROUGH_EARPIECE = 'speaker-phone';
const ICON_THROUGH_SPEAKER = 'speaker';

const ICON_PLAY_BUTTON = new Icon(require('./assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('./assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('./assets/images/stop_button.png'), 22, 22);
const ICON_FORWARD_BUTTON = new Icon(require('./assets/images/forward_button.png'), 33, 25);
const ICON_BACK_BUTTON = new Icon(require('./assets/images/back_button.png'), 33, 25);

const ICON_LOOP_ALL_BUTTON = new Icon(require('./assets/images/loop_all_button.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new Icon(require('./assets/images/loop_one_button.png'), 77, 35);

const ICON_MUTED_BUTTON = new Icon(require('./assets/images/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('./assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('./assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('./assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('./assets/images/thumb_2.png'), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;

//** 
//**Class StartTime Information
//** 
var holdingClassInstance = true;
const repeatSection = 1;



export default class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.theUserSectionData;
    this.shouldRender=false;
    this.setIntervarForStorage= null;
    this.setIntervarForFetch = null;
    this.startOnHold= null;
    this.classStartTime = null;
    this.userInThisClass = null;
    this.PLAYLIST= this.props.navigation.state.params.PLAYLIST;
    this.nextClass = this.props.navigation.state.params.nextClass;
    this.theUserSectionsDataArr=this.props.navigation.state.params.SectionFinishedFalse;
      
    
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,//Slider Position, at begining is NULL
      playbackInstanceDuration: null,//Slider Position, at begining is NULL
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
      
    };
  }

     componentDidMount() {
   
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        'cutive-mono-regular': require('./assets/fonts/CutiveMono-Regular.ttf'),
      });
      
     await this.updateUserDetails();
    })(); 
      
  }
     
    
  //************************************************************************************************************************ */
  //*work here please
  //************************************************************************************************************************ */
  //need to add somehow a vairable which indicates if to send put requests to the server.
  updateUserDetails = async () =>{
    let request;
    
    try{
    request = await AsyncStorage.getItem("requestToServer");
    this.theUserSectionData=await this.theUserSectionsDataArr[this.index];
    this.classStartTime =await new Date();
    this.theUserSectionData.Section_Start_Time = await moment(this.classStartTime).format("YYYY-MM-DD HH:mm:ss");
    this.userInThisClass = await AsyncStorage.getItem("userInThisClass");
    this.userInThisClass = await JSON.parse(this.userInThisClass);
    }
    catch(error){console.log(error);}
    this.theUserSectionData.Section_Is_Started=true;
    this.shouldRender = true;
    this.setState({fontLoaded: true }); 
    debugger;
    if( request == "true"){
    this.setIntervarForStorage = setInterval(() =>{
      AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
     },5000);

     this.setIntervarForFetch = setInterval(async () => {
     this._putToServer();
          }, 10000);
        }
    
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: this.PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: false,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };
    debugger;
    if (this.PLAYLIST[this.index].isVideo) {
      this._video.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      debugger;
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };
//The function: '_updateScreenForLoading' update the fields bellow when the song in the audio is finish.
  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: this.PLAYLIST[this.index].name,
        showVideo: this.PLAYLIST[this.index].isVideo,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    this.theUserSectionData.User_Last_Point =status.positionMillis;
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
      //Check if the audio player finish to play, if yes it's call to two function and pass the value TRUE to the function.
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight: DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width,
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`);
  };

  async _advanceIndex(forward) {    
    //Section is finished --> collecting all the relevant information, endTime, datediff
    clearInterval(this.setIntervarForStorage);
    clearInterval(this.setIntervarForFetch);
    let request;
    try{request= await AsyncStorage.getItem("requestToServer");}
    catch(error){console.log(error);}
    debugger;
    if ( request == "true"){
    let classEndTime = await new Date();
    let diff = await moment.duration(moment(classEndTime).diff(moment(this.classStartTime)));//calculate the section time
    let totalClassTimeS =await parseInt(diff.asSeconds()); ////calculate section in Sec
    this.theUserSectionData.Section_Total_Duration = totalClassTimeS.toString();//section total duration
    this.theUserSectionData.Section_End_Time = moment(classEndTime).format("YYYY-MM-DD HH:mm:ss");//section end time date format
    this.theUserSectionData.Section_Is_Finished=true;
    AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
    console.log(this.theUserSectionData);
    putResponse = await this._putToServer();
    }   
      
    if(this.index<this.PLAYLIST.length-1)
    Alert.alert(
      "להמשיך למקטע הבא?",
      "לחץ 'כן' כדי למשיך או 'לא' כדי להשאר באותו המקטע?",
     [
        {text:"כן",onPress:async()=>{
          await AsyncStorage.setItem("requestToServer",JSON.stringify(true));
          try{let r = await AsyncStorage.getItem("requestToServer");
          console.log(r);
        }catch(error){console.log(error);}
          this._putToServerRepeatedSection(this.theUserSectionData,forward);//need to do the fetch here or to move the function
            
        }},
        {text:"לא",onPress:async ()=>{
          let temp = await AsyncStorage.getItem("repeatSection");
          temp = await JSON.parse(temp)+repeatSection;
          await AsyncStorage.setItem("repeatSection",JSON.stringify(temp));//will save the number of time the user did the section
          await AsyncStorage.setItem("requestToServer",JSON.stringify(false));
          this.index = (this.index + (forward ? 0 : this.PLAYLIST.length + 0)) % this.PLAYLIST.length;
          this._updatePlaybackInstanceForIndex(true);      
        }},
    ]
    );
    else{  
      debugger;
      Alert.alert(
        "השיעור הסתיים!",
        "כל הכבוד! סיימת את השיעור השבועי!",
       [
          {text:"אישור",onPress:async ()=>{
       let theUserSectionDataPut;
       if(!this.userInThisClass.IsFinished)//When the user finish is first class
      {
        try{
        let classEndTime = await new Date();
        this.userInThisClass.EndTime =await moment(classEndTime).format("YYYY-MM-DD HH:mm:ss");
        this.userInThisClass.IsFinished= true;
        }catch(error){console.log(error);}
      }
        try{theUserSectionDataPut = await AsyncStorage.getItem("theUserSectionData");
        console.log(theUserSectionDataPut);}
        catch(error){console.log(error);}  
        this.updateClassInDB(theUserSectionDataPut);  
          }
       },  
      ]);    
    }
  }

updateClassInDB = (theUserSectionDataPut) => {
  let data1;
  let data2;  
        try{
          data1 =  {
            method: 'PUT',
            headers: {
              'Accept':'application/json',
              'Content-Type':'application/json',
            },
            body: data=theUserSectionDataPut//get the value from storage so don't need to stringify
          }
           data2 =  {
            method: 'PUT',
            headers: {
              'Accept':'application/json',
              'Content-Type':'application/json',
            },
            body: data=JSON.stringify(this.userInThisClass)
          }
        }  catch(error){console.log(error);}
     
              fetch(ServerRequest1, data1)
              .then(response => response.json())  // promise
              .then(async (response) =>{    
                console.log(response);         
                  fetch(ServerRequest3, data2)
                  .then(response => response.json())  // promise
                  .then((response) =>{
                   console.log(response);
                   this.navigateToAlert();
                  })
                  .catch((error=>{
                    console.log(error);
                  }))    
              })
              .catch((error=>{
                console.log(error);
              }))   
}

  navigateToAlert = ()=>{
    this.props.navigation.navigate(
      "alertComponentClassFinish",
      {userFullName:this.props.navigation.state.params.userFullName}
      )  
  }
//** 
//**will  be in action only in section which the user dose in the first time */
//**
  _putToServer = async()=>
  {
    let theUserSectionDataPut = await AsyncStorage.getItem("theUserSectionData");
      let data1 =  {
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: data=theUserSectionDataPut
      }
             fetch(ServerRequest1, data1)
              .then( (response) =>  response.json())  // promise
              .then( (response) =>{    
                console.log(response);})
              .catch((error=>{console.log(error);}))
  }
//** 
//**will update only the repeated section filed in SQL */
//**
  _putToServerRepeatedSection = async(sectionData,forward) =>
  {
    let temp
    let data1
    try
    {
      temp= await AsyncStorage.getItem("repeatSection");
      temp=await JSON.parse(temp);
      sectionData.Repeat_Section_Counter = await temp;
      data1 = await  {
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: data=JSON.stringify(sectionData)
      }
  }
    catch(error){console.log(error)}
    try{
      await fetch(ServerRequest2, data1)
      .then((response) => response.json())  // promise
      .then((response) =>{    
        console.log(response);
        this.index = (this.index + (forward ? 1 : this.PLAYLIST.length + 1)) % this.PLAYLIST.length;
        this._updatePlaybackInstanceForIndex(true); 
      })
      .catch((error=>{console.log(error);}))
    }catch(error){console.log(error)}
 
  }

  async _updatePlaybackInstanceForIndex(playing) {
    try{await this.updateUserDetails();}
    catch(error){console.log(error);}
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.theUserSectionData.Pause_Clicks++;
        this.startOnHold = new Date();
        this.playbackInstance.pauseAsync();
      } else {
        if(this.startOnHold != null){
         let finishPause = new Date();
         let diff = moment.duration(moment(finishPause).diff(moment(this.startOnHold)));
         let minutesDiff = parseInt(diff.asSeconds());
         this.theUserSectionData.Pause_Duration = parseInt(this.theUserSectionData.Pause_Duration);
         this.theUserSectionData.Pause_Duration += minutesDiff;
         console.log(this.theUserSectionData.Pause_Duration);
         console.log(diff);
      
        }
        this.theUserSectionData.Play_Clicks++;
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    this.theUserSectionData.Stop_Clicks++
    AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    this.theUserSectionData.Forward_Clicks++;
    AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    this.theUserSectionData.Backward_Clicks++;
    AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    
    if(!this.state.muted){
      this.theUserSectionData.Mute_Clicks++;
      AsyncStorage.setItem("theUserSectionData",JSON.stringify(this.theUserSectionData));
    }
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(this.state.loopingType !== LOOPING_TYPE_ONE);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&//need to start here**********
      this.state.playbackInstanceDuration != null
    ) {
      
      return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
    }//Video Slider Progress
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return '';
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece,
        })
    );
  };
//** 
//render the component
//** 
  render()
   
  {
    if(!this.shouldRender){
      return ( <View style={styles.emptyContainer} />)
    }
    else if((this.state.fontLoaded==true)&&(this.shouldRender==true)){
      return(  
        <View style={styles.container}>
        <View />
        <View style={styles.nameContainer}>
          <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
            {this.state.playbackInstanceName}
          </Text>
        </View>
        <View style={styles.space} />
        <View style={styles.videoContainer}>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
              },
            ]}
     
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
        </View>
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
          >
          <Slider
            style={styles.playbackSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this._getSeekSliderPosition()}//Show the video progress each second.
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text style={[styles.text, styles.buffering, { fontFamily: 'cutive-mono-regular' }]}>
              {this.state.isBuffering ? BUFFERING_STRING : ''}
            </Text>
            <Text style={[styles.text, styles.timestamp, { fontFamily: 'cutive-mono-regular' }]}>
              {this._getTimestamp()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_FORWARD_BUTTON.module} />
          </TouchableHighlight>
        </View>
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}>
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onMutePressed}>
              <Image
                style={styles.button}
                source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module}
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_2.module}
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onLoopPressed}>
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[this.state.loopingType].module}
            />
          </TouchableHighlight>
        </View>
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}>
            <View style={styles.button}>
              <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>Rate:</Text>
            </View>
          </TouchableHighlight>
          <Slider
            style={styles.rateSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this.state.rate / RATE_SCALE}
            onSlidingComplete={this._onRateSliderSlidingComplete}
          />
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPitchCorrectionPressed}>
            <View style={styles.button}>
              <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                PC: {this.state.shouldCorrectPitch ? 'yes' : 'no'}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onSpeakerPressed} underlayColor={BACKGROUND_COLOR}>
            <MaterialIcons
              name={this.state.throughEarpiece ? ICON_THROUGH_EARPIECE : ICON_THROUGH_SPEAKER}
              size={32}
              color="black"
            />
          </TouchableHighlight>
        </View>
        <View />
        {this.state.showVideo ? (
          <View>
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPosterPressed}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                    Poster: {this.state.poster ? 'yes' : 'no'}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onFullscreenPressed}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                    Fullscreen
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
            <View style={styles.space} />
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onUseNativeControlsPressed}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                    Native Controls: {this.state.useNativeControls ? 'yes' : 'no'}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
          </View>
        ):null}
         </View>
        )
      }
         else if(this.state.fontLoaded==true){
      return(
        <View style={styles.loadIconStyle}>       
              <Image source={require('./assets/images/Loading_2.gif')} />
       </View> 
       );
    }
    }
  }    

       
const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    minHeight: FONT_SIZE,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    textAlign: 'left',
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
   
  },
  centerView:{
    textAlign:'center',
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
  },
});
