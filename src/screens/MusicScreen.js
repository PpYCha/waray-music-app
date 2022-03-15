import React from 'react'
import {Button} from 'react-native'
import SoundPlayer from 'react-native-sound-player'
// import { getStorage, ref, getDownloadURL } from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";

const MusicScreen = () => {
    const play =() =>{
        try {
            // play the file tone.mp3
            SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.playUrl("https://firebasestorage.googleapis.com/v0/b/waray-music-app.appspot.com/o/music%2FMoana%20-%20How%20Far%20I'll%20Go%20%5BBand%3A%20Boy%20Hero%5D%20(Punk%20Goe?alt=media&token=9f04e8a2-6207-4d19-b88d-8f2b4ad0e62d")
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }
  return (
    <Button title="Play song"  onPress={play}/>
  )
}

export default MusicScreen



var storageRef = firebase.storage().ref("music/James Smith - Little love (lyrics).mp3");
const storage = firebase.storage();
storageRef.getDownloadURL((storage, 'music/James Smith - Little love (lyrics).mp3'))
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