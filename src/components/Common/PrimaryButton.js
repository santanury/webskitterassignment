import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, SHADOW} from '../../constants/themes';

const PrimaryButton = props => {
  return (
    // button as container
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      <Text // label
        style={[styles.buttonText, props.textStyle]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width * 0.85,
    height: SIZES.height * 0.065,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSmall,
    shadowColor: COLORS.black,
    ...SHADOW,
  },
  buttonText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.white,
  },
});
