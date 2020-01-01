import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, 
  TouchableOpacity, Dimensions,
   ActivityIndicator, Alert, FlatList, Platform } from "react-native";
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';
import { Layout, List } from '@ui-kitten/components';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const { height, width } = Dimensions.get("screen");
class LiveStream extends Component {
      constructor(props) {
        super(props);

        this.state = {
            statusLive: "stopped", //stopped
            startingLive: false,
            stoppingLive: false,
            refLive: null,
            stream_details: null,
            artist: undefined,
            cameraId: 1,
            user_in_room: 0,
            show: "",
            messages: [],
            platformLive: false,
        }

        /* this.socket = io(URL_SERVER_SOCKET, {
            transports: ['websocket'],
        }); */
    }
  componentDidMount() {

    }

_startLive() {
      this.refLive.startBroadcast();
      this.setState({ startingLive: true })
  }
  _onBroadcastStarted() {
    this.setState({ statusLive: "started", startingLive: false, platformLive: true });
}

_onBroadcastStopped() {
    this.setState({ statusLive: "stopped", stoppingLive: false, platformLive: false });
}

_onBroadcastIdReceived(broadcasteId) {
    const { show } = this.state;

    this.props.changeStatusLiveTo(this.collection, "DIRECTO");
    notifyUsersPerSms(show);
    setUrlOnStream(broadcasteId, show.stream_name);
}

__onStreamHealthUpdate(streamhealth) {
    console.log(streamhealth)
}

_switchCameraIconSide() {
    this.refLive.switchCamera();
}

__onStreamHealthUpdate(streamhealth) {
  console.log(streamhealth)
}
  startMyBroadCast = () => {
    console.log("stopp start")
    this.myBroadcasterRef.startBroadcast();
    console.log("starting")
  }
  render() {
    const { statusLive, user_in_room, startingLive, stoppingLive, show, messages } = this.state;
    return (
      <Layout level="6" style={{ flex: 1 }}>
          <TopNavigationArea
          title={`Live Broadcast`}
          navigation={this.props.navigation}
          screen="auth"
      />
                  <SafeAreaView style={styles.contentWrapAll}>
                <View style={styles.wrapVideo}>

                    <View style={styles.contentLiveInfo}>
                        {
                            statusLive == "started" ?
                                <Fragment>
                                    <View style={styles.horizontalAlign}>
                                        <LiveSignal style={{ marginRight: 7 }} texto="Em Directo" />
                                        <Viewers viewers={formatNumbers(user_in_room.length)} />
                                    </View>
                                    {
                                        stoppingLive ? <ActivityIndicator style={styles.buttonStreamStop} size="small" color="#ff2a00" /> :
                                            <TouchableOpacity
                                                activeOpacity={.8}
                                                style={styles.buttonStreamStop}
                                                onPress={() => this._stopLive(show.id)}
                                            >
                                                <Text style={[styles.textBranco, { fontWeight: "bold", fontSize: 17 }]}>Terminar</Text>
                                            </TouchableOpacity>
                                    }
                                </Fragment> : null
                        }
                    </View>
                    {
                        show === "" ? <ActivityIndicator style={styles.loading} size="large" color="#ff2a00" /> :
                        <RNBambuserBroadcaster
                        style= {{flex: 1, backgroundColor: 'black'}}
                        audioQuality= {"audioQualityHigh"}
                        author= "NONE"
                        title = "Hello"
                        ref={ref => { this.refLive = ref; }}
                        aspect={{ width: 9, height: 16 }}
                        audioQuality={RNBambuserBroadcaster.AUDIO_QUALITY.HIGH}
                        onBroadcastStarted={() => this._onBroadcastStarted()}
                        onBroadcastIdReceived={ broadcastId => this._onBroadcastIdReceived(broadcastId)}
                        onBroadcastError={(errorCode, errorMessage) => {
                            console.log('Error with code ' + errorCode, errorMessage);
                        }}
                        onStartBroadcastNotReady={() => {
                            console.log('Broadcast not ready yet')
                        }}
                        onBroadcastStopped={() => this._onBroadcastStopped()}
                        onStreamHealthUpdate={this._onStreamHealthUpdate}
                        applicationId={'JpW2TKHoR9MlbgsWaChADw'}
              />
                    }
                    {
                        startingLive ? <ActivityIndicator style={styles.loading} size="large" color="#ff2a00" /> :
                            <View style={styles.contentControlsLive}>
                                {
                                    statusLive == "started" ?

                                        <TouchableOpacity style={styles.buttonSwitchCamera} />
                                        :
                                        <>
                                            <TouchableOpacity activeOpacity={.8} onPress={() => this.props.context.setState({ goLive: false })} style={styles.buttonSwitchCamera}>
                                              <Text>Hey</Text>
                                                {/* <Leave width={38} height={38} /> */}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={.8}
                                                style={styles.buttonStream}
                                                onPress={() => this._startLive()}
                                            />
                                        </>
                                }
                                <TouchableOpacity activeOpacity={.8} onPress={() => this._switchCameraIconSide()} style={styles.buttonSwitchCamera}>
                                    {/* <SwitchCameraIcon width={38} height={38} /> */}
                                    <Text>Hey</Text>
                                </TouchableOpacity>
                            </View>
                    }
                    {statusLive != "started" ? null :
                        <View style={styles.wrapAllMessagesChat}>
                            <View style={styles.contentSentMessage}>
                                <FlatList
                                    data={messages}
                                    inverted
                                    extraData={this.state}
                                    showsVerticalScrollIndicator={false}
                                    ref={(ref) => { this.flatListRef = ref }}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.wrapSentMessage}>
                                                {/* <View style={styles.contentFoto}>
                                                    {item.picProfile ? <Image source={{ uri: item.picProfile }} style={styles.fotoPerfil} resizeMode={"contain"} /> : <Foto width={24} height={24} />}
                                                </View> */}
                                                <View style={styles.contentSentMessage}>
                                                    <Text style={[styles.textBranco, { fontWeight: "bold" }]}>{item.nome}</Text>
                                                    <Text style={styles.textBranco}>{item.message}</Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </View>}
                </View>
            </SafeAreaView>
      {/* <RNBambuserBroadcaster title= "Woozee Broadcast" applicationId={"erEJmaJQzzubKcp0xewaoQ"} /> */}
      {/* <RNBambuserBroadcaster
      
      style={{ flex: 1 }}
      ref={ref => {myBroadcasterRef = ref; }} applicationId={"erEJmaJQzzubKcp0xewaoQ"} /> */}

<TouchableOpacity onPress= {this.startMyBroadCast}>
    <Text>Start Broadcast</Text>
</TouchableOpacity>
      </Layout>
  )
  }

}

const styles = StyleSheet.create({
  wrapVideo: {
      flex: 1,
  },
  camera: {
      flex: 1
  },
  contentControlsLive: {
      position: "absolute",
      bottom: 0,
      width,
      flexDirection: "row",
      justifyContent: "space-between",
  },
  buttonStream: {
      backgroundColor: "#ff2a00",
      borderRadius: 60,
      height: 60,
      width: 60,
      alignSelf: "center",
  },
  startButtonLive: {
      backgroundColor: "#555",
      padding: 5,
      marginBottom: 20,
      alignSelf: "center",
  },
  loading: {
      marginBottom: 20,
      alignSelf: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
  },
  buttonStreamStop: {
      padding: 5,
  },
  contentLiveInfo: {
      padding: 10,
      position: "absolute",
      width,
      alignItems: "center",
      zIndex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
  },
  buttonSwitchCamera: {
      padding: 20
  },
  wrapSentMessage: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 20,
      justifyContent: "flex-end",
  },
  contentSentMessage: {
      flex: 1,
      padding: 4,
      justifyContent: "flex-end"
  },
  wrapAllMessagesChat: {
      position: "absolute",
      bottom: 0,
      width: wp("75%"),
      height: hp("50%")
  },
  contentFoto: {
      borderRadius: 100,
      padding: 12,
      width: 48,
      height: 48,
      marginRight: 5,
      backgroundColor: "#2F2F2F",
  },
  fotoPerfil: {
      width: 48,
      height: 48,
  },
  contentWrapAll: {
    flex: 1,
    backgroundColor: "#111",
},
contentVideoWrap: {
    height,
},
contentWrapPadding: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16
},
textBranco: {
    color: "#fff"
},
textCinza: {
    color: "#999"
},
horizontalAlign: {
    flexDirection: "row",
    alignItems: "center"
},
horizontalAlignJustify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
},
flexJustify: {
    flex: 1,
    justifyContent: 'space-between',
},
flexSimple: {
    flex: 1,
},
titleModal: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff"
},
iconButtons: {
    padding: 16
},
inputs: {
    color: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    padding: Platform.OS === "ios" ? 16 : null,
    borderRadius: 10,
    backgroundColor: "#333",
    marginTop: 12,
    marginBottom: 12
},

})

export default LiveStream;