import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

async function SignUpWithGoogle({ googleSignup }) {
  const userData = {
    email: '',
    fName: '',
    sName: '',
    source: 'google',
  };

  await GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    iosClientId:
      '979696525592-oi481tbbn0pp9htv408l99vh6fa08e3o.apps.googleusercontent.com',
    // offlineAccess: false,
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    token = JSON.stringify(userInfo.idToken);
    userData.email = await userInfo.user.email;
    userData.fName = await userInfo.user.givenName;
    userData.sName = await userInfo.user.familyName;

    await googleSignup(userData);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('Signin cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('signin in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('service not available');
    } else {
      // some other error happened
      console.log(error);
    }
  }
}

export default SignUpWithGoogle;
