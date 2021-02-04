import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';

import WithInfiniteFetch from '~src/components/DataFetch/WithInfiniteFetch';

import { WoozPosts } from '~src/components/VideoPosts';

import InteractIcon from '~src/components/InteractIcon';

import { socialUrl } from '~src/api/dummy';

import { IconVideo } from '~src/components/CustomIcons';

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
  maxHeight: 0.65,
  mediaLeft: false,
};

// eslint-disable-next-line react/prop-types
export default function Wooz({ navigation }) {
  // prettier-ignore
  const WoozPostsArea = () => WithInfiniteFetch(WoozPosts, socialUrl, PLACEHOLDER_CONFIG);

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#101426',
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
              Accessory={(evaProps) => (
                <IconVideo
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...evaProps}
                  isOpen
                />
              )}
            />
          </View>
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
