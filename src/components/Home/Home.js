import {
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {COLORS, SIZES, SHADOW, icons} from '../../constants';

import Header from '../Common/Header';
import Card from './Card';
import PrimaryButton from '../Common/PrimaryButton';
import CommonModal from '../Common/CommonModal';

import {useSelector} from 'react-redux';

const Home = ({navigation, route}) => {
  const {userData} = useSelector(store => store);

  const [items, setItems] = useState([]); // item list state
  const [actionMdl, setActionMdl] = useState(false); // option modal state
  const [deleteTgl, setDeleteTgl] = useState(false); // delete mode toggle state
  const [actionData, setActionData] = useState(''); // item id to delete

  useEffect(() => {
    const listner = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('BackHandler In Home is called');
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

    console.log('REDUX userData -->', userData);
    const subscribe = firestore()
      .collection('products')
      .where('userId', '==', userData.userId)
      .onSnapshot(doc => {
        setItems(doc._docs);
      });
    return () => {
      listner();
      subscribe();
    };
  }, []);

  // delete item
  const deleteItem = async () => {
    console.log(actionData);
    firestore()
      .collection('products')
      .doc(actionData.pid)
      .delete()
      .then(() => {
        console.log('User deleted!');
        setActionData('');
        setActionMdl(false);
        setDeleteTgl(false);
        showMessage({
          message: 'Success!',
          description: 'Product deleted successfully',
          type: 'success',
          floating: true,
          icon: 'auto',
        });
      })
      .catch(err => {
        console.log('Error deleting product:', err);
        showMessage({
          message: 'Opps!',
          description: 'Something went wrong',
          type: 'warning',
          floating: true,
          icon: 'auto',
        });
      });
  };

  // logout
  const logout = async () => {
    auth().signOut().then(navigation.navigate('Splash'));
  };

  const styles = makeStyles(COLORS); // theme instance

  return (
    <View // container
      style={styles.container}>
      <Header // header
        title="Home"
        rightItem={
          <Text // logout button / text
            onPress={logout}
            style={styles.clkTxt}>
            LOGOUT
          </Text>
        }
      />

      {/* LIST TO RENDER DATA */}

      <FlatList
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <Card // card
            data={item}
            index={index}
            navigation={navigation}
            action={() => (
              setActionMdl(true),
              setActionData({
                ...item._data,
                pid: item._ref._documentPath._parts[1],
              })
            )}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={{marginBottom: SIZES.paddingMedium}}
      />

      {/* ITEM ACTION MODAL */}

      <CommonModal
        title="OPTIONS"
        isOpen={actionMdl}
        onClose={() => (
          setActionData(''), setActionMdl(false), setDeleteTgl(false)
        )}>
        {!deleteTgl ? (
          <>
            <PrimaryButton // edit button
              style={styles.actions}
              textStyle={styles.actionStyle}
              name="EDIT"
              onPress={() => (
                setActionMdl(false),
                setDeleteTgl(false),
                navigation.navigate('AddItem', actionData)
              )}
            />
            <PrimaryButton // delete button
              style={[styles.actions, {marginTop: SIZES.paddingMedium}]}
              textStyle={styles.actionStyle}
              name="DELETE"
              onPress={() => setDeleteTgl(true)}
            />
          </>
        ) : (
          <>
            <PrimaryButton // edit button
              style={styles.deleteBtn}
              textStyle={styles.deleteBtnTxt}
              name="CONFIRM"
              onPress={() => deleteItem()}
            />
            <PrimaryButton // delete button
              style={[styles.actions, {marginTop: SIZES.paddingMedium}]}
              textStyle={styles.actionStyle}
              name="CANCEL"
              onPress={() => setDeleteTgl(false)}
            />
          </>
        )}
      </CommonModal>

      {/* ADD NEW ITEM BUTTON */}

      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.addBtn}>
        <Image // add icon
          resizeMode="contain"
          style={styles.btnIcon}
          source={icons.add}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    list: {
      width: SIZES.width,
      paddingBottom: SIZES.height * 0.05,
    },
    clkTxt: {
      fontWeight: '700',
      color: COLORS.blue,
      marginLeft: SIZES.paddingSmall,
    },
    addBtn: {
      position: 'absolute',
      overflow: 'hidden',
      bottom: SIZES.height * 0.05,
      right: SIZES.width * 0.1,
      backgroundColor: COLORS.flatBlue,
      height: SIZES.height * 0.075,
      width: SIZES.height * 0.075,
      borderRadius: SIZES.height * (0.075 / 2),
      justifyContent: 'center',
      alignItems: 'center',
      ...SHADOW,
    },
    btnIcon: {
      tintColor: COLORS.blue,
      height: '60%',
      width: '60%',
    },
    actions: {
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.darkGray,
    },
    actionStyle: {color: COLORS.darkGray},
    deleteBtn: {backgroundColor: COLORS.venetianRed},
    deleteBtnTxt: {color: COLORS.white},
    logout: {marginBottom: SIZES.paddingSmall, width: SIZES.width * 0.5},
  });
