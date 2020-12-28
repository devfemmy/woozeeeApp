import React from 'react';

import { Icon } from '@ui-kitten/components';

export const IconEye = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, ...otherProps } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...otherProps} name={isOpen ? 'eye' : 'eye-off'} />;
};

export const IconInputState = (props) => {
  // eslint-disable-next-line react/prop-types
  const { iconType, ...otherProps } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...otherProps} name={iconType} />;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const IconBack = (props) => <Icon {...props} name="arrow-back" />;

// eslint-disable-next-line react/jsx-props-no-spreading
export const IconMenu = (props) => <Icon {...props} name="menu" />;

export const IconMoreVertical = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="more-vertical" />
);

export const IconQuestionMarkCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="question-mark-circle-outline" />
);

export const IconAlertCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="alert-circle-outline" />
);

export const IconPersonAdd = (props) => (
  <Icon
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    name="person-add-outline"
  />
);

export const IconClose = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="close-outline" />
);

export const IconFacebook = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="facebook-outline" />
);

export const IconGoogle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="google-outline" />
);

export const IconTwitter = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="twitter-outline" />
);

export const IconAlertTriangle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="alert-triangle-outline" />
);

export const IconCheckmarkCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="checkmark-circle-outline" />
);
