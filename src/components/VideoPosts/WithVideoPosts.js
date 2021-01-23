// prettier-ignore
import React, {
  useCallback, useContext, useMemo, useState, useEffect,
} from 'react';

import { View, useWindowDimensions } from 'react-native';

import { Button, Layout, Text } from '@ui-kitten/components';

import Api from '~src/api';

import { LocaleContext } from '~src/contexts';

import Placeholders from '~src/components/Placeholders';

import { IconHeart, IconBookmark, IconGrid } from '~src/components/CustomIcons';

// prettier-ignore
const FetchFailed = ({ onPress, info, retry }) => useMemo(
  () => (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ marginBottom: 10 }}>{info}</Text>
      <Button
        /* prettier-ignore */
        onPress={onPress}
      >
        <Text status="control">{retry}</Text>
      </Button>
    </View>
  ),
  [onPress, info, retry],
);

export default function VideoPosts(
  WrappedComponent,
  fetchUrl,
  placeholderCount,
  tabs = false,
) {
  const { width } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [activeTab, setActiveTab] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState(false);

  const [posts, setPosts] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      await setIsLoading(true);
      await setIsError(false);

      const { data } = await Api.getVideos(fetchUrl);

      setPosts(data);
    } catch (e) {
      setIsError(true);
    } finally {
      await setIsLoading(false);
    }
  }, [fetchUrl]);

  const updateTab = useCallback(
    (index) => {
      setActiveTab(index);
      fetchPosts();
    },
    [fetchPosts],
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // prettier-ignore
  const TabsMenu = () => useMemo(
    () => (
      <Layout level="2" style={{ paddingHorizontal: 20, borderRadius: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            appearance="ghost"
            status={activeTab === 0 ? 'primary' : 'basic'}
            size="large"
            accessibilityLabel="All"
            accessibilityLiveRegion="polite"
            accessoryLeft={IconGrid}
            onPress={() => updateTab(0)}
          />
          <Button
            appearance="ghost"
            status={activeTab === 1 ? 'primary' : 'basic'}
            size="large"
            accessibilityLabel="Saved"
            accessibilityLiveRegion="polite"
            accessoryLeft={IconBookmark}
            onPress={() => updateTab(1)}
          />
          <Button
            appearance="ghost"
            status={activeTab === 2 ? 'primary' : 'basic'}
            size="large"
            accessibilityLabel="Liked"
            accessibilityLiveRegion="polite"
            accessoryLeft={IconHeart}
            onPress={() => updateTab(2)}
          />
        </View>
      </Layout>
    ),
    [],
  );

  return useMemo(() => {
    if (isLoading) {
      return (
        <Placeholders
          mediaLeft
          row
          count={placeholderCount}
          numColumns={2}
          maxHeight={170}
          maxWidth={width}
        />
      );
    }
    if (isError) {
      return (
        <FetchFailed
          onPress={fetchPosts}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }
    if (posts && posts.length > 0) {
      return (
        <>
          {tabs ? <TabsMenu /> : null}
          <WrappedComponent info={posts} tVideo={t('video')} />
        </>
      );
    }
    return (
      <FetchFailed
        onPress={fetchPosts}
        info={t('noVideos')}
        retry={t('refresh')}
      />
    );
  }, [t, width, fetchPosts, posts, isLoading, isError, placeholderCount, tabs]);
}
