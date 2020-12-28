import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: '100%',
    minWidth: '100%',
  },
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100%',
    zIndex: 9,
    paddingVertical: 25,
  },
  brandMotto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
});
