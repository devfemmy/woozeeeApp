// prettier-ignore
import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';

import { useWindowDimensions } from 'react-native';

import { useInfiniteQuery } from 'react-query';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import Placeholders from 'src/components/Placeholders';

import TabsMenu from 'src/components/TabsMenu';

import FetchFailed from './FetchFailed';

export default function WithInfiniteFetch(
  WrappedComponent,
  fetchUrl,
  placeholderProp,
  tabs = null,
) {
  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [activePage, setPage] = useState('default');

  const getMaxHeight = useCallback(() => {
    if (placeholderProp.maxHeight <= 1) {
      return height * placeholderProp.maxHeight;
    }
    return placeholderProp.maxHeight;
  }, [height, placeholderProp]);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['inFiniteVideos', activePage],
    async ({ pageParam = 1 }) => {
      const promise = await Api.getVideos(fetchUrl, activePage, pageParam);
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
      getNextPageParam: (lastPage) => lastPage.nextID ?? false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 1,
    },
  );

  const updateTab = useCallback((param) => {
    setPage(param);
  }, []);

  return useMemo(() => {
    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft={placeholderProp.mediaLeft}
          row
          count={placeholderProp.count || 4}
          numColumns={placeholderProp.numColumns || 2}
          maxHeight={getMaxHeight()}
          maxWidth={width}
        />
      );
    }
    if (status === 'error') {
      return (
        <FetchFailed
          onPress={refetch}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }
    // prettier-ignore
    if (status !== 'loading' && status !== 'error' && data.pages[0].pageData.data.length > 0) {
      return data.pages.map((page) => (
        <React.Fragment key={page.nextID}>
          {tabs ? (
            <TabsMenu tabs={tabs} tabInfo={{ activePage, updateTab }} />
          ) : null}
          <WrappedComponent info={page.pageData.data} />
        </React.Fragment>
      ));
    }
    return (
      <FetchFailed
        onPress={refetch}
        info={t('noVideos')}
        retry={t('refresh')}
      />
    );
  }, [
    t,
    width,
    refetch,
    activePage,
    updateTab,
    placeholderProp,
    tabs,
    status,
    data,
    getMaxHeight,
  ]);
}
