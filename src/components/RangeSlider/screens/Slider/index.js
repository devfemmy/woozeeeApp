import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import Slider from 'rn-range-slider';

import Thumb from '../../Slider/Thumb';
import Rail from '../../Slider/Rail';
import RailSelected from '../../Slider/RailSelected';
import Notch from '../../Slider/Notch';
import Label from '../../Slider/Label';
import TextButton from '../components/TextButton';

import styles from './styles';

const SliderScreen = () => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <View style={styles.root}>
      <Text category="h6" status="basic">
        {low}% - {high}%
      </Text>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        disableRange={rangeDisabled}
        floatingLabel={floatingLabel}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default SliderScreen;
