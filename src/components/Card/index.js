import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { List, Text } from '@ui-kitten/components';

function index({
  data,
  handlePress,
  extraWidth,
  COLUMN_COUNT,
  IS_PORTRAIT,
  width,
  index,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 185,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={handlePress}
      >
        {data[index].items[0].type === 'photo' ? (
          <FastImage
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,
            }}
            source={{
              uri: data[index].items[0].srcURL,
              priority: FastImage.priority.cover,
            }}
          />
        ) : (
          <Video
            source={{ uri: data[index].items[0].srcURL }}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,
            }}
            volume={0}
            resizeMode="cover"
            shouldPlay={true}
            isMuted={true}
            isLooping={true}
          />
        )}

        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 35,
            width: 35,
            borderRadius: 17.5,
            alignItems: 'center',
            justifyContent: 'center',
            right: 33,
            bottom: 180,
            zIndex: 1000,
          }}
        >
          <FastImage
            source={{
              uri: data[index].userImageURL,
              priority: FastImage.priority.cover,
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 30 / 2,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            padding: 5,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 50,
          }}
        >
          <Text
            category="s2"
            style={{
              color: 'white',
              marginLeft: 5,
              marginTop: 140,
              zIndex: 1000,
            }}
            numberOfLines={1}
          >
            {data[index].userLastName.toLowerCase().capitalize()}
          </Text>
          <Text
            category="s2"
            style={{
              color: 'white',
              marginBottom: 5,
              marginLeft: 5,
              zIndex: 1000,
            }}
            numberOfLines={1}
          >
            {data[index].userFirstName.toLowerCase().capitalize()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default index;
