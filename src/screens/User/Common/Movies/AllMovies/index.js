import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';
import MovieDescription from 'src/components/MovieDescription';
import FeaturedMovie from 'src/components/FeaturedMovie';
import { Octicons } from '@expo/vector-icons';

const AllMovies = () => {
  const styles = StyleSheet.create({
    imageCon: {
      paddingVertical: 15,
    },
    description: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '20%',
    },
    lowerContainer: {
      paddingHorizontal: 10,
    },
  });
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.imageCon}>
          <Image
            style={{ width: '100%' }}
            source={require('../../../../../assets/images/movies/movie1.png')}
          />
        </View>
        <MovieDescription
          price="$1.00"
          description="After applying for 200 job application, he decided to go for something different . But things don’t go as smoothly as planned."
          paid
        />
        <View style={{ paddingHorizontal: 10 }}>
          <MovieScroll show />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AllMovies;
