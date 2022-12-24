import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../constants/themes';

const Header = props => {
  const styles = makeStyles(COLORS); // theme instance

  return (
    <View // header as container
      style={[styles.container, props.headerStyle]}>
      <View style={{flex: 0.5}}>{props.leftItem && props.leftItem}</View>
      <Text // title
        style={styles.title}>
        {props.title}
      </Text>
      <View style={{flex: 0.5, alignItems: 'flex-end'}}>
        {props.rightItem && props.rightItem}
      </View>
    </View>
  );
};

export default Header;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      height: SIZES.height * 0.075,
      width: SIZES.width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
    },
    title: {
      flex: 1,
      fontSize: SIZES.fontMedium,
      textAlign: 'center',
      letterSpacing: 0.5,
      color: COLORS.black,
    },
  });
