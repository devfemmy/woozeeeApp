import React, { useContext, useState } from 'react';

import { View, useWindowDimensions, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

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
  const [paid, setPaid] = useState(false);

console.log("moshdsk", movie_data)
console.log(movie_data.item.posterURL[0])
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
          defaultSource= {require('../../../../assets/images/movies/movie_placeholder.png')}
          style= {{width: Dimensions.get('window').width, height: Dimensions.get('window').height/4, resizeMode: 'contain'}}
          source= {{uri: movie_data.item.posterURL[0]}}
          // source= {{uri: "data:image/png;base64,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"}}
          />
        </TouchableOpacity>
        <ScrollView style= {styles.container}>
            <Text category='h1' style= {styles.textStyle}>
           {movie_data.item.title}
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
                // onPress= {() => console.log('Hello')}
                onPress= {() => navigation.navigate('MoviePage', {item: movie_data.item})} 
                bg= "#FF5757"
                color= "white" fill= "white" 
                text= "Purchase" 
                icon_name= "shopping-cart-outline" />          
          }

            </View>
            <View>
              <Text>
                {movie_data.item.description}
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
