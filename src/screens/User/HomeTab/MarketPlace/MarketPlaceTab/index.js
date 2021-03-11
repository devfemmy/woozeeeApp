// prettier-ignore
import React, {
  useState, useCallback, useContext, useMemo,
} from 'react';

import { View, useWindowDimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

// prettier-ignore
import {
  Layout, List,
} from '@ui-kitten/components';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import TopNavigationArea from 'src/components/TopNavigationArea';

import WithDefaultFetch from 'src/components/DataFetch';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import { StoryPosts } from 'src/components/VideoPosts';

import VideoView from 'src/components/VideoView';

import MoviesSection from 'src/components/MoviesSection';

import { trendingUrl, socialUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: false,
};

// prettier-ignore
const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

export default function MarketPlace({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const CONTENT_SPACE = 100;

  const INSETS = bottom + top;

  const LIST_HEIGHT = height - (CONTENT_SPACE + INSETS);

  const ITEM_HEIGHT = LIST_HEIGHT * 0.8;

  const t = useContext(LocaleContext);

  const VIEWABILITY_CONFIG = useMemo(
    () => ({
      minimumViewTime: 200,
      viewAreaCoveragePercentThreshold: 51,
    }),
    [],
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="marketPlace"
      />
    </Layout>
  );
}
