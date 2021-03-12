import React, { useCallback, useMemo, useState } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import InteractIcon from 'src/components/InteractIcon';

import { IconCHeartToggle } from 'src/components/CustomIcons';

export default function ItemCard(props) {
  const { data, extraWidth, numColumns } = props;

  const { width, height } = useWindowDimensions();

  const [isLiked, setLiked] = useState(false);

  const IS_PORTRAIT = height > width;

  const COLOUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const toggleLike = useCallback(() => setLiked((prevState) => !prevState), []);

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 160,
          width: IS_PORTRAIT
            ? width / (COLOUMN_COUNT + extraWidth)
            : width / (COLOUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Image
          source={{ uri: `https://i.postimg.cc/${data.banner}` }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 155,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 5,
          }}
        >
          <InteractIcon
            Accessory={(evaProps) => (
              <IconCHeartToggle {...evaProps} isLiked={isLiked} />
            )}
            height={25}
            width={25}
            onPress={toggleLike}
          />
        </View>
      </TouchableOpacity>
    ),
    [COLOUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, isLiked, toggleLike],
  );
}
