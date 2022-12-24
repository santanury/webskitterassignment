import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {SHADOW, COLORS, SIZES, icons} from '../../constants';

const Card = props => {
  const styles = makeStyles(COLORS); // theme instance
  const base64Icon = `data:image/png;base64,${props.data._data.image}`;

  return (
    <Animatable.View
      animation={'fadeInDown'}
      duration={1000}
      delay={props.index * 50}
      style={styles.container}>
      <TouchableOpacity // action button
        onPress={props.action}
        style={styles.options}>
        <Image // action
          style={styles.optionsImg}
          source={icons.options}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View // image container for shadow
        style={styles.imageCont}>
        <Image // card image
          resizeMode="contain"
          style={{flex: 1}}
          source={{uri: base64Icon}}
        />
      </View>
      <View // description section
        style={styles.descSec}>
        <Text // name text
          style={styles.nameTxt}>
          {props.data._data.name}
        </Text>

        <View // price section
          style={{flexDirection: 'row'}}>
          <Text // offer price / price
            style={styles.offerPrice}>
            {`₹ ${
              props.data._data.offerPrice
                ? props.data._data.offerPrice
                : props.data._data.price
            }`}
          </Text>
          <Text // actual price
            style={styles.price}>
            {props.data._data.offerPrice && props.data._data.price}
          </Text>
        </View>
      </View>
    </Animatable.View>
  );
};

export default Card;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      marginTop: SIZES.width * 0.025,
      marginLeft: SIZES.width * 0.025,
      height: SIZES.width * 0.6,
      width: SIZES.width * 0.4625,
      justifyContent: 'center',
      alignItems: 'center',
    },
    options: {
      right: '5%',
      top: '7%',
      height: '17%',
      width: '17%',
      position: 'absolute',
      zIndex: 100,
    },
    optionsImg: {
      tintColor: COLORS.black,
      height: '100%',
      width: '100%',
    },
    descSec: {width: '100%'},
    imageCont: {
      overflow: 'hidden',
      height: '70%',
      width: '100%',
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radiusSmall,
      ...SHADOW,
    },
    nameTxt: {
      fontSize: SIZES.fontMedium,
      fontWeight: '500',
      color: COLORS.black,
    },
    offerPrice: {
      fontSize: SIZES.fontMedium,
      fontWeight: '700',
      color: COLORS.black,
    },
    price: {
      marginLeft: SIZES.paddingSmall,
      textDecorationLine: 'line-through',
      fontSize: SIZES.fontSmall,
      color: COLORS.black,
    },
  });
