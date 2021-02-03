import React from 'react';

import { Image } from 'react-native';

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
      name={isOpen ? 'video' : 'video-off'}
    />
  );
};

export const IconHeartToggle = (props) => {
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
  const { isPlaying, ...otherProps } = props;
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      name={isPlaying ? 'pause-circle' : 'play-circle'}
    />
  );
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const IconHeart = (props) => <Icon {...props} name="heart" />;

export const IconVideoOutline = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="video-outline" />
);

export const IconPlusCircle = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="plus-circle" />
);

export const IconInputState = (props) => {
  // eslint-disable-next-line react/prop-types
  const { iconType, ...otherProps } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...otherProps} name={iconType} />;
};

export const IconBack = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="arrow-back-outline" />
);

export const IconBell = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="bell-outline" />
);

export const IconShake = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="shake-outline" />
);

export const IconArrowHeadUp = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="arrowhead-up" />
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

export const IconFlag = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="flag-outline" />
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
  <Icon {...props} name="message-square" />
);

export const IconMsgSquareOutline = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="message-square-outline" />
);

export const IconShare = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="share" />
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

export const IconSettings = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="settings-2-outline" />
);

export const IconEdit = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="edit-outline" />
);

export const IconBookmark = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="bookmark" />
);

export const IconGrid = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="grid" />
);

export const IconMoon = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} name="moon-outline" />
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

export const IconCFlag = (props) => {
  // eslint-disable-next-line react/prop-types
  const { width, height } = props;

  return (
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      source={require('~assets/images/icon/flag-round-ng.png')}
      resizeMode="contain"
      style={{ width: width || 32, height: height || 32 }}
    />
  );
};
