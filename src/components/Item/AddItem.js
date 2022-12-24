import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {COLORS, SIZES, icons} from '../../constants';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

import Header from '../Common/Header';
import PrimaryButton from '../Common/PrimaryButton';

const AddItem = ({navigation, route}) => {
  const {userData} = useSelector(store => store);

  const [name, setName] = useState(''); // name state
  const [image, setImage] = useState(''); // image state
  const [price, setPrice] = useState(''); // price state
  const [offerPrice, setOfferPrice] = useState(''); // offer price state

  useEffect(() => {
    const listner = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('BackHandler In Add is called');
        navigation.goBack();
        return true;
      });
    });

    route?.params &&
      (setName(route?.params?.name),
      setImage(route?.params?.image),
      setPrice(route?.params?.price),
      setOfferPrice(route?.params?.offerPrice));

    return listner;
  }, []);

  // image upload
  const uploadImg = async () => {
    console.log('', '\n======== UPLOAD PICTURE ========');

    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setImage(image.data);
      })
      .catch(error => {
        showMessage({
          message: 'Alert!',
          description: 'You cancelled the image selection',
          type: 'info',
          floating: true,
          icon: 'auto',
        });
      });
  };

  // verify item
  const verifyData = async () => {
    !name
      ? showMessage({
          message: 'Warning!',
          description: 'Please provide a name',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !price
      ? showMessage({
          message: 'Warning!',
          description: 'Please add a price',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : !image
      ? showMessage({
          message: 'Warning!',
          description: 'A product image is require',
          type: 'warning',
          floating: true,
          icon: 'auto',
        })
      : route?.params
      ? update()
      : upload();
  };

  // upload new data
  const upload = async () => {
    await firestore()
      .collection('products')
      .add({
        name,
        image,
        price,
        offerPrice,
        userId: userData.userId,
      })
      .then(() => {
        showMessage({
          message: 'Success!',
          description: 'Product added successfully',
          type: 'success',
          floating: true,
          icon: 'auto',
        });
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('Error adding product:', err);
        showMessage({
          message: 'Opps!',
          description: 'Something went wrong',
          type: 'warning',
          floating: true,
          icon: 'auto',
        });
      });
  };

  // update date
  const update = async () => {
    await firestore()
      .collection('products')
      .doc(route?.params?.pid)
      .update({
        name,
        image,
        price,
        offerPrice,
        userId: userData.userId,
      })
      .then(() => {
        showMessage({
          message: 'Success!',
          description: 'Product added successfully',
          type: 'success',
          floating: true,
          icon: 'auto',
        });
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('Error adding product:', err);
        showMessage({
          message: 'Opps!',
          description: 'Something went wrong',
          type: 'warning',
          floating: true,
          icon: 'auto',
        });
      });
  };

  const styles = makeStyles(COLORS); // theme instance
  return (
    <View // container
      style={styles.container}
      contentContainerStyle={styles.containContainer}>
      <Header // header
        title={route?.params ? 'Edit Item' : 'Add Item'}
        leftItem={
          <TouchableOpacity // back button
            onPress={() => navigation.goBack()}>
            <Image // back icon
              source={icons.back}
              style={styles.back}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView // action zone
        contentContainerStyle={styles.actionContainer}>
        <TouchableOpacity // image upload button
          style={styles.ulBtn}
          onPress={uploadImg}>
          {image ? (
            <Image
              style={styles.itemImage}
              source={{uri: `data:image/png;base64,${image}`}}
            />
          ) : (
            <Image style={styles.uploadIcn} source={icons.upload} />
          )}
        </TouchableOpacity>

        <TextInput // name
          keyboardType="default"
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />

        <TextInput // price
          keyboardType="number-pad"
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          placeholder="Price"
          onChangeText={setPrice}
          value={price}
        />

        <TextInput // offer price
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          placeholder="Offer Price"
          onChangeText={setOfferPrice}
          value={offerPrice}
        />

        <PrimaryButton // upload item button
          onPress={verifyData}
          style={styles.uploadBtn}
          name={route?.params ? 'UPDATE' : 'UPLOAD'}
        />
      </ScrollView>
    </View>
  );
};

export default AddItem;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    actionContainer: {alignItems: 'center', paddingBottom: SIZES.paddingMedium},
    back: {height: 30, width: 30},
    ulBtn: {
      height: SIZES.height * 0.45,
      width: SIZES.height * 0.45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SIZES.radiusBig,
      overflow: 'hidden',
      marginVertical: SIZES.paddingMedium,
    },
    itemImage: {height: '100%', width: '100%'},
    uploadIcn: {
      opacity: 0.3,
      height: SIZES.height * 0.2,
      width: SIZES.height * 0.2,
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
    uploadBtn: {marginTop: SIZES.paddingSmall},
  });
