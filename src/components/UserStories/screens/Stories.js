import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import Video from 'react-native-video';

import FastImage from 'react-native-fast-image';

import Card from '../../Card/index';

// import Modal from 'react-native-modalbox';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import AllStories from '../constants/AllStories';
import StoryContainer from '../components/StoryContainer';

import { Text } from '@ui-kitten/components';
import { v4 as uuidv4 } from 'uuid';
import { LinearGradient } from 'expo-linear-gradient';

const Stories = (props) => {
  const { storyData, extraWidth } = props;
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const { width, height } = useWindowDimensions();
  const IS_PORTRAIT = height > width;
  const COLUMN_COUNT = IS_PORTRAIT ? 3 : 5;

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (storyData.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      // console.log('next');
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      // console.log('previous');
      setCurrentScrollValue(scrollValue);
    }
  };

  const handleSelect = (index) => {
    onStorySelect(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ index }) => (
          <Card
            data={storyData}
            index={index}
            handlePress={() => handleSelect(index)}
            extraWidth={extraWidth}
            COLUMN_COUNT={COLUMN_COUNT}
            IS_PORTRAIT={IS_PORTRAIT}
            width={width}
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {storyData.map((item, index) => (
            <StoryContainer
              key={index}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default Stories;
