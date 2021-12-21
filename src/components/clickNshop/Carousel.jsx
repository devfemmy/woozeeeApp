import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../utils/constants';
import Circle from './Circle';

const styles = StyleSheet.create({
  container: {
    height: 230,
    paddingTop: 10,
  },
  list: {
    height: 190,
    alignItems: 'center',
  },
  item: {
    width: SCREEN_WIDTH - 20,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  circles: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default function SwipeAds({ ads = [] }) {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    setData([...ads]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          horizontal
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH}
          onScroll={(event) => {
            const sliderIndex = event.nativeEvent.contentOffset.x
              ? Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
              : 0;
            if (sliderIndex !== active) setActive(sliderIndex);
          }}
          decelerationRate="fast"
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.item} key={index}>
              <Image resizeMode="contain" style={styles.item} source={item} />
            </View>
          )}
        />
      </View>
      <View style={styles.circles}>
        {data?.map((img, i) => (
          <Circle key={img} active={i === active} />
        ))}
      </View>
    </View>
  );
}
