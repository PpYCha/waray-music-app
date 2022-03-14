import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStup from '../setup';
import getDownloadURL from '@react-native-firebase/storage';
// import database from '@react-native-firebase/database';
// import storage from '@react-native-firebase/storage';

const HomeScreen = () => {
  const {storage, database} = firebaseStup();

  async function chooseFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      // const assets = [
      //   {
      //     name: '',
      //     type: '',
      //     uri: '',
      //     size: '',
      //   },
      // ];
      const [chooseFile] = res;
      // console.log('res:' + JSON.stringify(res));
      console.log('uri : ' + chooseFile.uri);
      console.log('Type : ' + chooseFile.type);
      console.log('File Name : ' + chooseFile.name);
      console.log('File Size : ' + chooseFile.size);
      //Setting the state to show single file attributes
      // this.setState({singleFile: res});
      const path = await normalizePath(chooseFile.uri);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      // console.log(result);
      uploadFile(result, chooseFile);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

    async function normalizePath(path) {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.subString(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (error) {
          console.log(error);
        }
      }
      return path;
    }
  }

  async function uploadFile(result, chooseFile) {
    const uploadTask = storage()
      .ref(`music/${chooseFile.name}`)
      .putString(result, 'base64', {contentType: chooseFile.type});

    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        console.log(error);
        // Handle unsuccessful uploads
      },

      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...

      // console.log('File available at', downloadURL);

      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          saveFileToRealTimeDatabase(downloadURL, chooseFile);
          console.log(downloadURL);
        });
      },
    );
  }

  function saveFileToRealTimeDatabase(downloadURL, chooseFile) {
    const uniqueKey = database().ref().push().key;
    database().ref(`music/${uniqueKey}`).update({
      fileName: chooseFile.name,
      fileType: chooseFile.type,
      fileURL: downloadURL,
    });
  }
  return (
    <View>
      <Button title="Select File" onPress={chooseFile} />
      <Button title="Upload File" onPress={uploadFile} />
    </View>
  );
};

export default HomeScreen;
