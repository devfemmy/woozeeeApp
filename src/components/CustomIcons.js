import React from 'react';

import { Icon } from '@ui-kitten/components';

export const IconEye = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Icon {...otherProps} name={isOpen ? 'eye-outline' : 'eye-off-outline'} />
  );
};

export const IconVolume = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, ...otherProps } = props;
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      name={isOpen ? 'volume-up-outline' : 'volume-off-outline'}
    />
  );
};

export const IconVideo = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, ...otherProps } = props;
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      name={isOpen ? 'video-outline' : 'video-off-outline'}
    />
  );
};

export const IconHeart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isLiked, ...otherProps } = props;
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      name={isLiked ? 'heart' : 'heart-outline'}
    />
  );
};

export const IconPlayPause = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isPaused, ...otherProps } = props;
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      name={isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
    />
  );
};

export const IconInputState = (props) => {
  // eslint-disable-next-line react/prop-types
  const { iconType, ...otherProps } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...otherProps} name={iconType} />;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const IconBack = (props) => (
  <Icon {...props} name="arrow-back-outline" />
);

// eslint-disable-next-line react/jsx-props-no-spreading
export const IconMenu = (props) => <Icon {...props} name="menu-2-outline" />;

export const IconMoreVertical = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="more-vertical-outline" />
);

export const IconQuestionMarkCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="question-mark-circle-outline" />
);

export const IconAlertCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="alert-circle-outline" />
);

export const IconAlertTriangle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="alert-triangle-outline" />
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

export const IconCheckmarkCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="checkmark-circle-outline" />
);

export const IconCalendar = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="calendar-outline" />
);

export const IconCreditCard = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="credit-card-outline" />
);

export const IconClock = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="clock-outline" />
);

export const IconHome = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="home-outline" />
);

export const IconSearch = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="search-outline" />
);

export const IconPerson = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="person-outline" />
);

export const IconMic = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="mic-outline" />
);

export const IconRadio = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="radio-outline" />
);

export const IconLogout = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="log-out-outline" />
);

export const IconForward = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="arrow-ios-forward-outline" />
);

export const IconMsgSquare = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="message-square-outline" />
);

export const IconShare = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="share-outline" />
);

export const IconClipboard = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="clipboard-outline" />
);

export const IconMap = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="map-outline" />
);

export const IconGift = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="gift-outline" />
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
