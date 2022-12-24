import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';

const Banner = props => {
  const styles = makeStyles(COLORS); // theme instance
  return (
    <View // heading container
      style={[styles.headingCont, props.style]}>
      <Text // app icon
        style={styles.iconTxt}>
        WEBSKITTER INVENTORY
      </Text>
    </View>
  );
};

export default Banner;

const makeStyles = COLORS =>
  StyleSheet.create({
    headingCont: {
      height: 65,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: COLORS.black,
    },
    iconTxt: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: SIZES.fontBig,
      color: COLORS.black,
    },
  });
