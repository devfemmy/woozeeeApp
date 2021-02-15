import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';

import useDisableAndroidBackAction from 'src/hooks/useDisableAndroidBackAction';

import WithInfiniteFetch from 'src/components/DataFetch/WithInfiniteFetch';

import { WoozPosts } from 'src/components/VideoPosts';

import InteractIcon from 'src/components/InteractIcon';

import { socialUrl } from 'src/api/dummy';

import { IconVideo } from 'src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '100%',
    zIndex: 9,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  interactIcons: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0125)',
  },
});

const PLACEHOLDER_CONFIG = {
  count: 1,
  numColumns: 1,
  maxHeight: 0.75,
  mediaLeft: false,
};

// prettier-ignore
const WoozPostsArea = () => WithInfiniteFetch(WoozPosts, socialUrl, PLACEHOLDER_CONFIG);

export default function Wooz({ navigation }) {
  useDisableAndroidBackAction(navigation, 'SocialRoute');

  const routeLiveStream = () => navigation.navigate('LiveStream');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#04070C',
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            zIndex: 19,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <View style={styles.interactIcons}>
            <InteractIcon
              onPress={routeLiveStream}
              Accessory={(evaProps) => <IconVideo {...evaProps} isOpen />}
            />
          </View>
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
