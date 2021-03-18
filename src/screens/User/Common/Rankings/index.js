import React, { useContext } from 'react';

import { View, Image, useWindowDimensions } from 'react-native';

import { Layout, Text, List } from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import WithDefaultFetch from 'src/components/DataFetch';

import { DealsPosts } from 'src/components/MarketPosts';

import { marketDealsUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

const RANKINGS = [
  {
    id: 1,
    fullName: 'The Boss',
    image: require('assets/images/user/user2.png'),
    votes: 83721,
  },
  {
    id: 2,
    fullName: 'Star Express',
    image: require('assets/images/drawable/icon.png'),
    votes: 24213,
  },
  {
    id: 3,
    fullName: 'Justine Babel',
    image: require('assets/images/user/user3.png'),
    votes: 2282,
  },
  {
    id: 4,
    fullName: 'Klien Alloy',
    image: require('assets/images/drawable/icon.png'),
    votes: 1311,
  },
  {
    id: 5,
    fullName: 'Window Bright',
    image: require('assets/images/drawable/icon.png'),
    votes: 12,
  },
  {
    id: 6,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
];

export default function MarketPlace({ navigation }) {
  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const t = useContext(LocaleContext);

  const getTopRanks = (ranks) => {
    const TOP_RANK = [
      {
        id: 1,
        pos: 2,
        stars: 4,
        rankIcon: require('assets/images/icon/rank2-filled.png'),
        data: ranks[1],
      },
      {
        id: 2,
        pos: 1,
        stars: 5,
        rankIcon: require('assets/images/icon/rank1-filled.png'),
        data: ranks[0],
      },
      {
        id: 3,
        pos: 3,
        stars: 3,
        rankIcon: require('assets/images/icon/rank3-filled.png'),
        data: ranks[2],
      },
    ];
    return TOP_RANK;
  };

  const RankItem = ({ item }) => (
    <View
      style={{
        paddingHorizontal: 10,
        maxWidth: '33%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'relative',
          marginBottom: 25,
        }}
      >
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: item.pos === 1 ? 84 : 64,
            width: item.pos === 1 ? 84 : 64,
            borderRadius: item.pos === 1 ? 42 : 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={item.data.image}
            defaultSource={item.data.image}
            style={{
              height: item.pos === 1 ? 80 : 60,
              width: item.pos === 1 ? 80 : 60,
              borderRadius: item.pos === 1 ? 40 : 30,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>
        <Image
          source={item.rankIcon}
          defaultSource={item.rankIcon}
          style={{
            height: 26,
            width: 26,
            borderRadius: 13,
            position: 'absolute',
            left: item.pos === 1 ? 31 : 21,
            bottom: -12,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 10 }}>{item.data.fullName}</Text>
        <View
          style={{
            backgroundColor: item.pos === 1 ? '#FF5757' : '#FFFFFF',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text status={item.pos === 1 ? 'control' : 'danger'} category="h6">
            {item.data.votes}
          </Text>
          <Text status={item.pos === 1 ? 'control' : 'danger'} category="label">
            Vote(s)
          </Text>
        </View>
      </View>
    </View>
  );

  const renderHeaderArea = () => (
    <Layout level="5" style={{ flex: 1, paddingBottom: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
      >
        {getTopRanks(RANKINGS).map((data) => (
          <RankItem item={data} key={data.id} />
        ))}
      </View>
    </Layout>
  );

  const renderOtherRanks = (data) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text category="s1" style={{ marginRight: 10 }}>
          {data.item.id}
        </Text>
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={data.item.image}
            defaultSource={data.item.image}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingRight: 5,
            paddingLeft: 5,
            maxWidth: 230,
            marginLeft: 5,
          }}
        >
          <Text style={{ marginRight: 5 }}>{data.item.fullName}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text category="c2" style={{ marginRight: 5 }}>
          {data.item.votes}
        </Text>
        <Text category="c1">Vote(s)</Text>
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="Rankings"
        navigation={navigation}
        screen="default"
      />

      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          data={RANKINGS.filter((item) => item.id > 3)}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderOtherRanks}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </Layout>
  );
}
