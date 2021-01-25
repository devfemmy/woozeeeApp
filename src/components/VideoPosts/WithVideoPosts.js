// prettier-ignore
import React, {
  useCallback, useContext, useMemo, useState, useEffect, useRef,
} from 'react';

import { useWindowDimensions } from 'react-native';

import Api from '~src/api';

import { LocaleContext } from '~src/contexts';

import Placeholders from '~src/components/Placeholders';

import TabsMenu from './TabsMenu';

import FetchFailed from './FetchFailed';

export default function VideoPosts(
  WrappedComponent,
  fetchUrl,
  placeholderProp,
  tabs = null,
) {
  const isMounted = useRef(false);

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState(false);

  const [posts, setPosts] = useState(null);

  const [activeTab, setActiveTab] = useState(0);

  const fetchPosts = useCallback(async () => {
    try {
      await setIsLoading(true);
      await setIsError(false);

      const { data } = await Api.getVideos(fetchUrl);

      if (isMounted.current) {
        await setPosts(data);
      }
    } catch (e) {
      if (isMounted.current) {
        await setIsError(true);
      }
    } finally {
      if (isMounted.current) {
        await setIsLoading(false);
      }
    }
  }, [fetchUrl, isMounted]);

  const updateTab = useCallback(
    (index) => {
      setActiveTab(index);
      fetchPosts();
    },
    [fetchPosts],
  );

  useEffect(() => {
    isMounted.current = true;
    fetchPosts();

    return () => {
      isMounted.current = false;
    };
  }, [fetchPosts]);

  return useMemo(() => {
    if (isLoading) {
      return (
        <Placeholders
          mediaLeft={placeholderProp.mediaLeft}
          row
          count={placeholderProp.count || 4}
          numColumns={placeholderProp.numColumns || 2}
          maxHeight={
            placeholderProp.maxHeight === '100%'
              ? height - 200
              : placeholderProp.maxHeight
          }
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
          {tabs ? (
            <TabsMenu tabs={tabs} tabInfo={{ activeTab, updateTab }} />
          ) : null}
          <WrappedComponent info={posts} />
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
  }, [
    t,
    width,
    height,
    fetchPosts,
    posts,
    isLoading,
    isError,
    activeTab,
    updateTab,
    placeholderProp,
    tabs,
  ]);
}
