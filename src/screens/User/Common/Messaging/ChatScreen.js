import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput, FlatList, Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Layout, List, Text, Divider,
  } from '@ui-kitten/components';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { SendMessage, RecieveMessage } from '../../../../services/Firebase/Message';
import Firebase from '../../../../services/Firebase/firebaseConfig';

import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { AddUser } from 'src/services/Firebase/Users';

class ChatScreen extends Component {
    state = {
        message: '',
        guestUid: '',
        currentUid: '',
        allMessages: [],
        image: ''
    }

    async componentDidMount() {
        const currentUid = await AsyncStorage.getItem('userid');
        console.log(currentUid)
        const {guestUid, name} = this.props.route.params;
        this.setState({ currentUid: currentUid, guestUid: guestUid });
        try {
            Firebase.database().
                ref('messages').
                child(currentUid).
                child(guestUid).
                on("value", (dataSnapshot) => {
                    let message = [];

                    dataSnapshot.forEach((data) => {
                        message.push({
                            sendBy: data.val().messege.sender,
                            recieveBy: data.val().messege.reciever,
                            msg: data.val().messege.msg,
                            image: data.val().messege.image,
                            date: data.val().messege.date,
                            time: data.val().messege.time,
                        });
                        console.log('fff', data.val().messege.image)
                    })
                    this.setState({ allMessages: message.reverse() });
                    console.log('allMessages', this.state.allMessages)
                })
        } catch (error) {
            alert(error);
        }
    }

    // openGallery() {
    //     launchImageLibrary('photo', (response) => {
    //         this.setState({ loader: true });
    //         ImgToBase64.getBase64String(response.uri)
    //             .then(async (base64String) => {
    //                 let source = "data:image/jpeg;base64," + base64String;
    //                 SendMessage(this.state.currentUid, this.state.guestUid, "", source).
    //                     then((res) => {
    //                         this.setState({ loader: false })
    //                     }).catch((err) => {
    //                         alert(err)
    //                     })

    //                 RecieveMessage(this.state.currentUid, this.state.guestUid, "", source).
    //                     then((res) => {
    //                         this.setState({ loader: false })
    //                     }).catch((err) => {
    //                         alert(err)
    //                     })
    //             })
    //             .catch(err => this.setState({ loader: false }));
    //     })
    // }

    sendMessage = async () => {
        const {guestUid, name} = this.props.route.params;
        if (this.state.message) {
            SendMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
                then((res) => {
                    console.log(res);
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err)
                })

            RecieveMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
                then((res) => {
                    console.log(res);
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err)
                })

            AddUser(name, guestUid).
                then(async () => {
                    this.setState({ loader: false });
                    // await AsyncStorage.setItem('UID', userUID);
                    // this.props.navigation.navigate('Login');
                }).
                catch((error) => {
                    // this.setState({ loader: false });
                    alert(error);
                })
        }
    }


    render() {
        const {name} = this.props.route.params;
        return (
            <Layout
            level="6"
            style={{
            //   marginVertical: 5,
              paddingHorizontal: 10,
            //   paddingVertical: 5,
              flex: 1
            }}
          >
            <TopNavigationArea
                    title={name}
                    navigation={this.props.navigation}
                    screen="auth"
                />
                {/* <AppHeader title={this.props.navigation.getParam('UserName')} navigation={this.props.navigation} onPress={() => this.logOut()} /> */}
                <FlatList
                    inverted
                    style={{ marginBottom: 60 }}
                    data={this.state.allMessages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 10, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                            <View style={{ borderRadius: 20, backgroundColor: this.state.currentUid === item.sendBy ? 'rgba(4, 63, 124, 0.1)' : 'rgba(4, 63, 124, 1)' }}>
                                {item.image === "" ? <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold', color: this.state.currentUid === item.sendBy ? 'black': 'white' }}>
                                    {item.msg} {"   "} 
                                </Text> :
                                    <View>
                                        <Image source={{ uri: item.image }} style={{ width: Dimensions.get('window').width / 2 + 10, height: 150, resizeMode: 'stretch', borderRadius: 30 }} />
                                        <Text style={{ fontSize: 12,position:'absolute',bottom:5,right:5 }}>{item.time}</Text>
                                    </View>
                                }
                            </View>
                            <Text style={{ fontSize: 12, textAlign: 'right', justifyContent: 'flex-end', alignItems: 'flex-end' }}>{item.time}</Text>
                        </View>
                    )}
                />
                <View style={{ bottom: 0, height: 50, width: '100%', position: 'absolute', flexDirection: 'row', paddingHorizontal: '5%' }}>
                    {/* <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} onPress={() => null}>
                        <Icons name="camera" size={30} color="#fff" />
                    </TouchableOpacity> */}
                    <View style={{ width: '90%', justifyContent: 'center' }}>
                        <TextInput value={this.state.message} onChangeText={(text) => this.setState({ message: text })} placeholder="Enter Message" placeholderTextColor="#000" style={{ height: 40, borderRadius: 20, backgroundColor: 'rgba(4, 63, 124, 0.1)', paddingHorizontal: 20 }} />
                    </View>
                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={() => this.sendMessage()}>
                        <Icons name="send" size={30} color="#043F7C" />
                    </TouchableOpacity>
                </View>
            </Layout>
        )
    }
}




export default ChatScreen;