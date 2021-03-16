import React from 'react';

import { Icon } from '@ui-kitten/components';

export const IconEye = (props) => {
  const { isClosed, ...otherProps } = props;
  return (
    <Icon {...otherProps} name={isClosed ? 'eye-off-outline' : 'eye-outline'} />
  );
};

export const IconVolume = (props) => {
  const { isClosed, ...otherProps } = props;

  return (
    <Icon
      {...otherProps}
      name={isClosed ? 'volume-off-outline' : 'volume-up-outline'}
    />
  );
};

export const IconVideo = (props) => {
  const { isClosed, ...otherProps } = props;
  return <Icon {...otherProps} name={isClosed ? 'video-off' : 'video'} />;
};

export const IconVideoOutline = (props) => {
  const { isClosed, ...otherProps } = props;
  return (
    <Icon
      {...otherProps}
      name={isClosed ? 'video-off-outline' : 'video-outline'}
    />
  );
};

export const IconCloudUploadOutline = (props) => {
  const { isClosed, ...otherProps } = props;
  return <Icon {...otherProps} name="cloud-upload-outline" />;
};

export const IconPlayPause = (props) => {
  const { isPlaying, ...otherProps } = props;
  return (
    <Icon {...otherProps} name={isPlaying ? 'pause-circle' : 'play-circle'} />
  );
};

export const IconHeart = (props) => <Icon {...props} name="heart" />;

export const IconPlusCircle = (props) => <Icon {...props} name="plus-circle" />;

export const IconInputState = (props) => {
  const { iconType, ...otherProps } = props;

  return <Icon {...otherProps} name={iconType} />;
};

export const IconBack = (props) => (
  <Icon {...props} name="arrow-back-outline" />
);

export const IconBackIos = (props) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);

export const IconForwardIos = (props) => (
  <Icon {...props} name="arrow-ios-forward-outline" />
);

export const IconOptions = (props) => (
  <Icon {...props} name="options-outline" />
);

export const IconPaperPlane = (props) => (
  <Icon {...props} name="paper-plane-outline" />
);

export const IconFilm = (props) => <Icon {...props} name="film-outline" />;

export const IconBell = (props) => <Icon {...props} name="bell-outline" />;

export const IconShake = (props) => <Icon {...props} name="shake-outline" />;

export const IconArrowHeadUp = (props) => (
  <Icon {...props} name="arrowhead-up" />
);

export const IconMenu = (props) => <Icon {...props} name="menu-2-outline" />;

export const IconMoreVertical = (props) => (
  <Icon {...props} name="more-vertical-outline" />
);

export const IconMoreHorizontal = (props) => (
  <Icon {...props} name="more-horizontal-outline" />
);

export const IconQuestionMarkCircle = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

export const IconAlertCircle = (props) => (
  <Icon {...props} name="alert-circle-outline" />
);

export const IconAlertTriangle = (props) => (
  <Icon {...props} name="alert-triangle-outline" />
);

export const IconPersonAdd = (props) => (
  <Icon {...props} name="person-add-outline" />
);

export const IconClose = (props) => <Icon {...props} name="close-outline" />;

export const IconCheckmarkCircle = (props) => (
  <Icon {...props} name="checkmark-circle-outline" />
);

export const IconCalendar = (props) => (
  <Icon {...props} name="calendar-outline" />
);

export const IconCreditCard = (props) => (
  <Icon {...props} name="credit-card-outline" />
);

export const IconClock = (props) => <Icon {...props} name="clock-outline" />;

export const IconHome = (props) => <Icon {...props} name="home-outline" />;

export const IconSearch = (props) => <Icon {...props} name="search-outline" />;

export const IconPerson = (props) => <Icon {...props} name="person-outline" />;

export const IconMic = (props) => <Icon {...props} name="mic-outline" />;

export const IconRadio = (props) => <Icon {...props} name="radio-outline" />;

export const IconFlag = (props) => <Icon {...props} name="flag-outline" />;

export const IconLogout = (props) => <Icon {...props} name="log-out-outline" />;

export const IconForward = (props) => (
  <Icon {...props} name="arrow-ios-forward-outline" />
);

export const IconMsgSquare = (props) => (
  <Icon {...props} name="message-square" />
);

export const IconMsgSquareOutline = (props) => (
  <Icon {...props} name="message-square-outline" />
);

export const IconShare = (props) => <Icon {...props} name="share" />;

export const IconClipboard = (props) => (
  <Icon {...props} name="clipboard-outline" />
);

export const IconMap = (props) => <Icon {...props} name="map-outline" />;

export const IconGift = (props) => <Icon {...props} name="gift-outline" />;

export const IconSettings = (props) => (
  <Icon {...props} name="settings-2-outline" />
);

export const IconEdit = (props) => <Icon {...props} name="edit-outline" />;

export const IconBookmark = (props) => <Icon {...props} name="bookmark" />;

export const IconGrid = (props) => <Icon {...props} name="grid" />;

export const IconMoon = (props) => <Icon {...props} name="moon-outline" />;

export const IconFacebook = (props) => (
  <Icon {...props} name="facebook-outline" />
);

export const IconGoogle = (props) => <Icon {...props} name="google-outline" />;

export const IconTwitter = (props) => (
  <Icon {...props} name="twitter-outline" />
);

export const IconCHeartToggle = (props) => {
  const { isLiked, ...otherProps } = props;
  return (
    <Icon
      {...otherProps}
      name={isLiked ? 'heart-filled' : 'heart'}
      pack="assets"
    />
  );
};

export const IconCFlag = (props) => (
  <Icon {...props} name="flag-ng" pack="assets" />
);

export const IconCHome = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'home' : 'home-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCWallet = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'wallet' : 'wallet-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCList = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'list' : 'list-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCClock = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'clock' : 'clock-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCSocial = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'social' : 'social-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCWooz = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'wooz' : 'wooz-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCCup = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'supercup' : 'supercup-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCUser = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'user' : 'user-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCUser2 = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'user-2' : 'user-2-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};

export const IconCMovie = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'movie' : 'movie-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCHeart = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'heart' : 'heart-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCChat = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'chat' : 'chat-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCShare = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'share' : 'share-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCEye = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'eye' : 'eye-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCVideo = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'video' : 'video-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCNotification = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'notification-new-outline' : 'notification-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCReorderLeft = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'reorder-left' : 'reorder-left-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCSearch = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'search' : 'search-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCMarket = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'market' : 'market-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCCart = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'cart' : 'cart-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCGrid = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'grid' : 'grid-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCVote = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'vote' : 'vote-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
export const IconCMedal = (props) => {
  const { active, ...otherProps } = props;

  const type = active ? 'medal' : 'medal-outline';

  return <Icon {...otherProps} name={type} pack="assets" />;
};
