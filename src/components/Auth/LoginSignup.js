import {
  StyleSheet,
  TextInput,
  Text,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {COLORS, SIZES} from '../../constants/themes';

import Header from '../Common/Header';
import Banner from './Banner';
import PrimaryButton from '../Common/PrimaryButton';

const LoginSignup = ({navigation, route}) => {
  const [logState, setLogState] = useState(true); // login signup toggle
  const [email, setEmail] = useState(''); // email state
  const [password, setPassword] = useState(''); // password
  const [rePassword, setRePassword] = useState(''); // confirm password

  useEffect(() => {
    const listner = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('BackHandler In LoginSignup is called');
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the app?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      });
    });

    return listner;
  }, []);

  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const styles = makeStyles(COLORS); // theme instance

  //   login validation
  const loginValidate = () => {
    !email
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter an email',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !regEx.test(email)
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter valid email',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !password
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter a password',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : password.length < 6
      ? showMessage({
          message: 'Warning!',
          description: 'Password shoould be atleast 6 characters length',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : verifyUser();
  };

  // verify user
  const verifyUser = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log('User signed in!', response.user.uid);
          Store.dispatch(setUserCredential(response.user.uid));
          navigation.navigate('Home');
          showMessage({
            message: 'Success!',
            description: 'Login successful!',
            type: 'success',
            floating: true,
            icon: 'auto',
          });
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            showMessage({
              message: 'Error!',
              description: 'Wrong user credential!',
              type: 'danger',
              floating: true,
              icon: 'auto',
            });
          }
          if (error.code === 'auth/wrong-password') {
            showMessage({
              message: 'Error!',
              description: 'Wrong user credential!',
              type: 'danger',
              floating: true,
              icon: 'auto',
            });
          }
          if (error.code === 'auth/too-many-requests') {
            showMessage({
              message: 'Too many try!',
              description: 'Please try again later!',
              type: 'danger',
              floating: true,
              icon: 'auto',
            });
            console.log('That email address is invalid!');
          }
        });
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error!',
        description: 'Check your connection',
        type: 'danger',
        floating: true,
        icon: 'auto',
      });
    }
  };

  //   signup validation
  const signupValidate = () => {
    !email
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter an email',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !regEx.test(email)
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter valid email',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !password
      ? showMessage({
          message: 'Warning!',
          description: 'Please enter a password',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : password.length < 6
      ? showMessage({
          message: 'Warning!',
          description: 'Password shoould be atleast 6 characters length',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !rePassword
      ? showMessage({
          message: 'Warning!',
          description: 'Please confirm password',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : password !== rePassword
      ? showMessage({
          message: 'Warning!',
          description: `Password didn't match`,
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : createUser();
  };

  // create user
  const createUser = async () => {
    console.log('Called createUser');
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.log('User account created & signed in!', response.user.uid);
          Store.dispatch(setUserCredential(response.user.uid));
          navigation.navigate('Home');
          showMessage({
            message: 'Success!',
            description: 'Signup successful!',
            type: 'success',
            floating: true,
            icon: 'auto',
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showMessage({
              message: 'Warning!',
              description: 'That email address is already in use!',
              type: 'warning',
              floating: true,
              icon: 'auto',
            });
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showMessage({
              message: 'Warning!',
              description: 'That email address is invalid!',
              type: 'warning',
              floating: true,
              icon: 'auto',
            });
            console.log('That email address is invalid!');
          }
        });
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error!',
        description: 'Check your connection',
        type: 'danger',
        floating: true,
        icon: 'auto',
      });
    }
  };

  return (
    <View // container
      style={styles.container}>
      <Header // header
        title={logState ? 'Login' : 'Create an account'}
      />

      <View style={styles.innerContainer}>
        <Banner // banner
          style={{marginBottom: SIZES.paddingHuge}}
        />
        <TextInput // email
          keyboardType="default"
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput // password
          secureTextEntry
          keyboardType="default"
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />

        {!logState && (
          <TextInput // confirm password
            secureTextEntry
            keyboardType="default"
            style={styles.input}
            placeholderTextColor={COLORS.gray}
            placeholder="Confirm Password"
            onChangeText={setRePassword}
            value={rePassword}
          />
        )}

        <PrimaryButton // login button
          style={styles.btn}
          name={logState ? 'LOGIN' : 'SIGN UP'}
          onPress={logState ? loginValidate : signupValidate}
        />

        <View style={{flexDirection: 'row', marginTop: SIZES.paddingHuge}}>
          <Text style={styles.txt}>
            {logState ? `Don't have account?` : `Already have an account?`}
          </Text>
          <Text
            onPress={() => (
              setLogState(!logState),
              setEmail(''),
              setPassword(''),
              setRePassword('')
            )}
            style={[styles.txt, styles.clkTxt]}>
            {logState ? `Create now` : `Login`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginSignup;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    innerContainer: {
      width: SIZES.width,
      alignItems: 'center',
      marginTop: SIZES.height * 0.1,
    },
    input: {
      height: SIZES.height * 0.065,
      width: SIZES.width * 0.85,
      borderRadius: SIZES.radiusSmall,
      marginBottom: SIZES.paddingSmall,
      borderWidth: 1,
      borderColor: COLORS.gray,
      color: COLORS.black,
      paddingHorizontal: SIZES.paddingSmall,
    },
    btn: {marginTop: SIZES.paddingSmall},
    txt: {fontSize: SIZES.fontMedium, color: COLORS.black},
    clkTxt: {
      fontWeight: '700',
      color: COLORS.blue,
      marginLeft: SIZES.paddingSmall,
    },
  });
