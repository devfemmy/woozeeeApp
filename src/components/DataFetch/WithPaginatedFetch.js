// prettier-ignore
import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';

import { useWindowDimensions } from 'react-native';

import { useQuery } from 'react-query';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import Placeholders from 'src/components/Placeholders';

import TabsMenu from 'src/components/TabsMenu';

import FetchFailed from './FetchFailed';

export default function WithPaginatedFetch(
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

  // prettier-ignore
  const {
    isLoading, isError, data, refetch,
  } = useQuery(
    ['defaultVideos', activePage],
    async () => {
      const promise = await Api.getVideos(fetchUrl, activePage);
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 1,
    },
  );

  const updateTab = useCallback((param) => {
    setPage(param);
  }, []);

  return useMemo(() => {
    if (isLoading) {
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
    if (isError) {
      return (
        <FetchFailed
          onPress={refetch}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }
    // prettier-ignore
    if (!isLoading && !isError && data.pageData.data.length > 0) {
      return (
        <>
          {tabs ? (
            <TabsMenu tabs={tabs} tabInfo={{ activePage, updateTab }} />
          ) : null}
          <WrappedComponent info={data.pageData.data} />
        </>
      );
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
    getMaxHeight,
    placeholderProp,
    tabs,
    isLoading,
    isError,
    data,
  ]);
}
