import  firebase  from "@react-native-firebase/app";
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'


const firebaseConfig = {
    apiKey:'AIzaSyCTRVxnVxkv-TzzcRPdew1uzeBufPhm91w',
    databaseURL:'https://waray-music-app-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId:'waray-music-app',
    storageBucket: 'waray-music-app.appspot.com',
    messagingSenderId:'',
    appId: "1:574565545154:android:c02e1065150f5fe4f4375b",
    client_id: "574565545154-q5rsr2a7lqt7nvs6mfs2i4gtljd53f34.apps.googleusercontent.com",
    
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default () => {
    return {firebase, database, storage}
}

