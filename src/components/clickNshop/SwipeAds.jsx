import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../utils/constants';
import Circle from './Circle';

const imageWidth = 280;

const styles = StyleSheet.create({
  container: {
    height: 170,
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  list: {
    height: 132,
  },
  item: {
    width: imageWidth,
    height: '100%',
    alignItems: 'center',
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
    const interval = setInterval(() => {
      setActive((curr) => {
        const newActive = curr < ads.length - 1 ? curr + 1 : 0;
        listRef?.current.scrollToOffset({
          animated: true,
          offset: newActive * (imageWidth - (SCREEN_WIDTH - imageWidth) / 2),
        });
        return newActive;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          horizontal
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={imageWidth - (SCREEN_WIDTH - imageWidth) / 2}
          onScroll={(event) => {
            const sliderIndex = event.nativeEvent.contentOffset.x
              ? Math.floor(
                  event.nativeEvent.contentOffset.x /
                    (imageWidth - (SCREEN_WIDTH - imageWidth) / 2),
                )
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
