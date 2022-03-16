import React, {useEffect} from 'react'
import TrackPlayer from 'react-native-track-player'
import {Button, Text, View} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { storage, getStorage, ref, getDownloadURL } from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";



const tracks = [
  {
    id: 1,
    url: require('../assets/music/2.mp3'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('../assets/music/1.mp3'),
    title: 'Blues Beat',
  },
  {
    id: 3,
    url: 'https://firebasestorage.googleapis.com/v0/b/waray-music-app.appspot.com/o/music%2FYou%20Are%20The%20Reason%20-%20Calum%20Scott%20-%20Cover%20by%20Daryl?alt=media&token=5f06bb28-97e7-472f-bc63-864f961b86cc',
    title: 'Blues Beat',
  },
  {
    id: 4,
    title: 'Awful',
   
    url: 'https://firebasestorage.googleapis.com/v0/b/spotify-clone-7a2ef.appspot.com/o/Ringtone%2FAudio%2FAwful%20-%20josh%20pan.mp3?alt=media&token=5b174d4c-be09-417c-9fb8-b384f3ce0ec2',
  },
];

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const MusicScreen = () => {

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
      // TrackPlayer.play()
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpTrackPlayer();

    // return () => TrackPlayer.destroy();
  }, []);

     const donwloadSong =  () =>{
       console.log('download')
       createAppDir = async                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
    
        const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED || granted === true;
    
        if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
            const assetsDirExists = await RNFetchBlob.fs.isDir(GlobalVars.APPDIR);
            if(!assetsDirExists) {
                RNFetchBlob.fs.mkdir(GlobalVars.APPDIR)
                                .then((res) => {console.log("App directory created..")})
                                .catch((err) => {console.log(err)})
            }
        }
    }
    

    
    }



    
  return (
    <View>

    <Button title="Play song"  onPress={() =>{ TrackPlayer.play() 
    return(
      console.log("play")
    )  
  }
    
  }/>
    <Button title="Pause song"  onPress={() => {TrackPlayer.pause()
     return(
      console.log("Pause")
    )  
    }}/>
    <Button title="Previous song"  onPress={() => {TrackPlayer.skipToPrevious()
     return(
      console.log("Previous")
    )  
    }}/>
    <Button title="Next song"  onPress={() => {TrackPlayer.skipToNext()
     return(
      console.log("Next")
    )  }}/>
    <Button title="Download Song" onPress={donwloadSong} />
    </View>

  )
}

export default MusicScreen



var storageRef = firebase.storage().ref("music/James Smith - Little love (lyrics).mp3");

storageRef.getDownloadURL((storage, 'music/My6OolA3QsJFk6kjzhv.mp'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });