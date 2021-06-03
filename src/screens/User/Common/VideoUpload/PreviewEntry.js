import React, {useCallback, useEffect,useContext, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Layout, Text,Button
} from '@ui-kitten/components';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { StyleSheet, BackHandler, Image, View } from 'react-native';

// prettier-ignore
import { LocaleContext } from 'src/contexts';
import { GeneralTextField } from 'src/components/FormFields/index';
import { Platform } from 'react-native';
import axios from '../../../../services/api/index'



const PreviewEntry = (props) => {
  const { editorResult, imageUri } = props.route.params;
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);
    const [form, setFormValues] = useState({
        caption: '',
      });

    const t = useContext(LocaleContext);
    // Remove File Prefix from Path

    const normalizePath = async (path) => {
      console.log("file path", path)
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const filePrefix = 'file://';
        if (path.startsWith(filePrefix)) {
          path = path.substring(filePrefix.length);
          try {
            path = decodeURI(path)
          } catch (e) {}
        }
      }
      return path
    }
    const upLoadEntries = (url) => {
      setLoading(true);
      const data = {
        mediaURL: url,
        entryTypes : ['story'],
        description: form.caption
      };
      axios.post(`entries`, data, {headers: {Authorization: token}})
      .then(res => {
        console.log(res)
        setLoading(false);
      }
        )
      .catch(err => {
        console.log(err.response)
        setLoading(false);
      })
    }
    const uploadFileToFirebase = async (videoUri, video, type ) => {
      if (editorResult === null) {
        const uploadTask = storage().ref(`allFiles/${'image'}`).
        putString(videoUri, 'base64', {contentType: 'jpg'});
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            upLoadEntries(downloadURL, type)
          });
        }
      );
      }else {
        const uploadTask = storage().ref(`allFiles/${'femmy222'}`).
        putString(videoUri, 'base64', {contentType: 'video/mp4'});
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            upLoadEntries(downloadURL, type)
          });
        }
      );
      }
    }

    const getVideoUri = async (type = 'video') => {
      setLoading(true)
      const video = editorResult.uri;
      const filePath = await normalizePath(video)
      const videoUri = await RNFetchBlob.fs.readFile(filePath, 'base64');
      // console.log('videoUri', videoUri);
      uploadFileToFirebase(videoUri, video, type)
    }
    const getImageUri = async (type = "image") => {
      setLoading(true)
      const image = imageUri;
      // const filePath = normalizePath(video)
      const realPath = await RNFetchBlob.fs.readFile(image, 'base64');
      // console.log('videoUri', videoUri);
      uploadFileToFirebase(realPath, image, type)
    }

    useEffect(()=> {
      AsyncStorage.getItem('USER_AUTH_TOKEN').then(
        res => {
          setToken(res)
        }
      ).catch(
        err => err
      )
      const firebaseConfig = {
        apiKey: "AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8",
        authDomain: "woozeee-d7f6c.firebaseapp.com",
        databaseURL: "https://woozeee-d7f6c.firebaseio.com",
        projectId: "woozeee-d7f6c",
        storageBucket: "woozeee-d7f6c.appspot.com",
        messagingSenderId: "979696525592",
        appId: "1:979696525592:web:ec27a203184d23e0dcfe6d",
        measurementId: "G-XQKMT94R9R"
      };
    
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
      // if (editorResult === null) {
      //   getImageUri()
      // }else {
      //   getVideoUri()
      // }
    }, [])
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
           props.navigation.goBack()
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );
    console.log("editor", editorResult)
    const handleVideoRef = useCallback(
        (ref) => {
          const videoComp = ref;
    
          (async () => {
            try {
              await videoComp?.loadAsync({ uri: editorResult.uri });
            } catch (e) {
              const msg = e;
            }
          })();
        },
        [editorResult],
      );
    
      const VideoPreview = useCallback(
        () => (
          <View
            style={{
            //   flex: 1,
              paddingTop: 10,
              paddingHorizontal: 15,
              marginBottom: 20,
            }}
          >
            <Video
              ref={handleVideoRef}
              useNativeControls
              resizeMode="cover"
              style={{ height: 300, width: '100%' }}
            />
          </View>
        ),
        [handleVideoRef],
      );


    return (
        <Layout level="6" style={{ flex: 1, padding: 25 }}>
            {imageUri === null ? 
             <VideoPreview />: 
             <Image style= {{height: 300, width: '100%', resizeMode: 'cover'}} source= {{uri: imageUri}} />
        }
            <View style={{ marginHorizontal: 5, marginBottom: 10, marginVertical: 20 }}>
                <GeneralTextField
                  type="caption"
                  label={`Caption`}
                  placeholder={'AddCaption'}
                  setFormValues={setFormValues}
                  multiline
                  height={100}
                  value= {form.caption}
                  // maxHeight={150}
                />
              </View>
              <View style={{ paddingHorizontal: 15, marginVertical: 30 }}>
              {imageUri === null ? 
                     <Button
                     onPress = {() => getVideoUri()}
                     disabled={isLoading}
                     status="danger"
                   >
                     <Text status="control" category="h6">
                       {`Post`}
                     </Text>
                   </Button>
                  :<Button
                  onPress = {() => getImageUri()}
                  disabled={isLoading}
                  status="danger"
                >
                  <Text status="control" category="h6">
                    {`Post`}
                  </Text>
                </Button>       
            }
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({

})

export default PreviewEntry