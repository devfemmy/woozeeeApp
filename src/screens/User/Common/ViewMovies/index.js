import React, { useContext, useState } from 'react';

import { View, useWindowDimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

import { Layout, List, Text } from '@ui-kitten/components';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieCard from 'src/components/SocialCard/MovieCard';

import { trendingUrl } from 'src/api/dummy';
import MovieComponent from 'src/components/MovieComponent';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';

const MOVIE_CATEGORIES = [
  {
    id: 1,
    title: 'All',
    active: true,
  },
  {
    id: 2,
    title: 'Trending',
   
  },
  {
    id: 3,
    title: 'woozeee Originals',
  },
  {
    id: 4,
    title: 'Classics',
  },
  {
    id: 5,
    title: 'Anime',
  },
  {
    id: 6,
    title: 'Romance',
  },
  {
    id: 7,
    title: 'Triller',
  },
];

// const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

const renderMovieCategory = ({ item }) => (
  <Layout
    level={item.active ? '6' : '2'}
    style={{
      height: 40,
      marginHorizontal: 5,
      borderRadius: 10,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        borderBottomWidth: 3,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderBottomColor: item.active && '#FF5757',
      }}
    >
      <Text status="basic" category="c2">
        {item.title}
      </Text>
    </TouchableOpacity>
  </Layout>
);

const renderMovieCategories = () => (
  <View style={{ marginBottom: 20, height: 45 }}>
    <List
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      alwaysBounceHorizontal
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={MOVIE_CATEGORIES}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderMovieCategory}
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
      })}
    />
  </View>
);

export default function Explore({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const {movie_data} = route.params;
  const [paid, setPaid] = useState(true);

console.log("moshdsk", movie_data)
  const { bottom, top } = useSafeAreaInsets();

  const t = useContext(LocaleContext);

  const SocialPostsArea = () => {
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
      ['infiniteMovies', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(trendingUrl, 1, pageParam);
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

    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft
          row
          count={4}
          numColumns={2}
          maxHeight={270}
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
    if (
      // prettier-ignore
      status !== 'loading'
      && status !== 'error'
      && data.pages[0].pageData.data.length > 0
    ) {
      return data.pages.map((page) => (
        <React.Fragment key={page.nextID}>
          <View style={{ flex: 1 }}>
            <List
              style={{
                backgroundColor: 'transparent',
              }}
              contentContainerStyle={{
                paddingVertical: 20,
                paddingHorizontal: 7,
              }}
              ListHeaderComponent={renderMovieCategories}
              alwaysBounceVertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={page.pageData.data}
              keyExtractor={(_, i) => i.toString()}
              renderItem={(renderData) => (
                <MovieCard data={renderData.item} extraWidth={0} />
              )}
              getItemLayout={(data, index) => ({
                length: 300,
                offset: 300 * index,
                index,
              })}
            />
          </View>
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
  };
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    textStyle: {
      fontSize: 20,
      fontWeight: '700'
    },
    actions: {
      width: wp('75%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    // textshadow:{
    //   fontSize:100,
    //   color:'#FFFFFF',
    //   fontFamily:'Times New Roman',
    //   paddingLeft:30,
    //   paddingRight:30,
    //   textShadowColor:'#FF5757',
    //   textShadowOffset:{width: 2, height: 2},
    //   textShadowRadius:5,
    // },
  })
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="Movie"
        navigation={navigation}
        
        screen="auth"
      />
      {/* <View> */}
        <TouchableOpacity>
          <Image
          style= {{width: '100%'}}
          source= {require('../../../../assets/images/movies/movie1.png')}
          />
        </TouchableOpacity>
        <ScrollView style= {styles.container}>
            <Text category='h1' style= {styles.textStyle}>
            My Name is Tayo
            </Text>
            <MovieComponent
            label= "New"
            year= "2020"
            rating= "16+"
            duration= "1hr 44min"
            quality= "HD"
            toplist= "10"
            trend= "#1"
            
            />
            {paid ? 
                <Text category= "h4">
                  $1.00
                </Text>: null
            }

            <View>
            {paid ? 
                <TextIcon 
                bg= "#FF5757"
                color= "white" fill= "white" 
                text= "Purchase" 
                icon_name= "shopping-cart-outline" />
          :
                <TextIcon 
                bg= "#FF5757"
                color= "white" fill= "white" 
                text= "Play" 
                icon_name= "play-circle-outline" />          
          }

            </View>
            <View>
              <Text>
              After applying for 200 job application, 
              he decided to go for something different . 
              But things 
              don’t go as smoothly as planned.
              </Text>
              <View style= {{marginVertical: 5}}>
                <Text>
                Cast: Sir Dee, Seyi Awolowo, Avala
                </Text>
                <Text>
                Director: Stephanie Dadet
                </Text>
              </View>
              <View style= {styles.actions}>
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "My List" 
                icon_name= "checkmark-outline" />
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "Rate" 
                icon_name= "star-outline" />
                <TextIcon 
                bg= "transparent"
                color= "#494949" fill= "#494949" 
                text= "Share" 
                icon_name= "share-outline" />
              </View>
            </View>
            <View>
                <MovieScroll
                show
                title = "Recommended for you"
                img= {require('../../../../assets/images/movies/movie2.png')}
                />
                <MovieScroll
                img= {require('../../../../assets/images/movies/movie3.png')}
                />
            </View>
        </ScrollView>
      {/* </View> */}

      {/* <SocialPostsArea /> */}
    </Layout>
  );
}
