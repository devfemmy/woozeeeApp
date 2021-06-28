import React from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';

const ComingSoon = (props) => {

    const banner = [
        {
            id: 1,
            image: require('../../../../../../assets/images/movies/soon1.png'),
            type: 'New Arrival',
            title: 'Oloture',
            release: '5 days ago'
        },
        {
            id: 2,
            image: require('../../../../../../assets/images/movies/soon2.png'),
            type: 'New Arrival',
            title: 'Omo Ghetto',
            release: '5 days ago'
        },
        {
            id: 3,
            image: require('../../../../../../assets/images/movies/soon3.png'),
            type: 'New Arrival',
            title: 'Sugar Rush',
            release: '5 days ago'
        },
        {
            id: 4,
            image: require('../../../../../../assets/images/movies/soon4.png'),
            type: 'New Arrival',
            title: 'King of Boys',
            release: '5 days ago'
        },

    ]
    return (
        <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
        title={`Coming Soon`}
        navigation={props.navigation}
        screen="auth"
      />
      <ScrollView>
          {banner.map(
              item => {
                return (
                    <View style= {styles.flexCont}>
                        <Image style= {styles.image} source= {item.image} />
                        <View style= {{width: '60%'}}>
                            <Text>
                                {item.type}
                            </Text>
                            <Text category= "h5">
                                {item.title}
                            </Text>
                            <Text category= "c1">
                                {item.release}
                            </Text>
                        </View>
                     </View>
                )
              }
          )}

        </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    flexCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(148, 148, 149, 0.3)'
    },
    image: {
        resizeMode: 'contain'
    }
})
export default ComingSoon;