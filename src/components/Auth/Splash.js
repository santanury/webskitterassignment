import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {COLORS, SIZES} from '../../constants/themes';
import Store from '../../redux/Store';
import {setUserCredential} from '../../redux/Action';

import Banner from './Banner';

const Splash = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);

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
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);
    () => {
      listner();
      subscribe();
    };
  }, []);

  // // Handle user state changes
  const onAuthStateChanged = user => {
    if (initializing) setInitializing(false);
    if (!user) {
      navigation.navigate('LoginSignup');
    } else {
      Store.dispatch(setUserCredential(user.uid));
      navigation.navigate('Home');
    }
  };

  const styles = makeStyles(COLORS); // theme instance

  // if (initializing)
  return (
    <View // container
      style={styles.container}>
      <Banner // banner
        style={{marginTop: SIZES.height * 0.3}}
      />
    </View>
  );
};

export default Splash;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      height: SIZES.height,
      width: SIZES.width,
      alignItems: 'center',
    },
  });
