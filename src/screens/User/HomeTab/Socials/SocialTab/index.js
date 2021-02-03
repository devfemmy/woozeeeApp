import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';

// import { LocaleContext } from '~src/contexts';

import Header from './Header';

import WithInfiniteVideoPosts from '~src/components/VideoPosts/WithInfiniteVideoPosts';

import { SocialPosts } from '~src/components/VideoPosts';

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
    marginBottom: 5,
  },
});

const PLACEHOLDER_CONFIG = {
  count: 1,
  numColumns: 1,
  maxHeight: '100%',
  mediaLeft: false,
};

// eslint-disable-next-line react/prop-types
export default function Social({ navigation }) {
  // const t = useContext(LocaleContext);

  // prettier-ignore
  const SocialPostsArea = () => WithInfiniteVideoPosts(SocialPosts, socialUrl, PLACEHOLDER_CONFIG);

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
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 20,
            zIndex: 19,
          }}
        >
          <View>
            <Header navigation={navigation} />
          </View>
          <View style={styles.interactIcons}>
            <InteractIcon
              Accessory={(evaProps) => (
                <IconVideo
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...evaProps}
                  isOpen
                />
              )}
              height={36}
              width={36}
            />
          </View>
        </View>
        <SocialPostsArea />
      </View>
    </Layout>
  );
}
