import React from 'react';
import { Text } from '@ui-kitten/components';
import fonts from '~src/constants/fonts';

const RegularText = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, style, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text {...otherProps} style={[style, fonts.fontRegular]}>
      {children}
    </Text>
  );
};

const BoldText = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, style, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text {...otherProps} style={[style, fonts.fontSemiBold]}>
      {children}
    </Text>
  );
};

export { RegularText, BoldText };
