import { Alert } from 'react-native';

// eslint-disable-next-line react/prop-types
export default function useBeforeLeave(navigation, e, isStartedTyping) {
  if (!isStartedTyping) return true;

  e.preventDefault();

  Alert.alert(
    'Discard changes?',
    'You have unsaved changes, are you sure to leave?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Discard',
        style: 'destructive',
        // eslint-disable-next-line react/prop-types
        onPress: () => navigation.dispatch(e.data.action),
      },
    ],
  );

  return false;
}
