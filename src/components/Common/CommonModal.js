import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Modal} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {COLORS, SIZES, FONTS, icons} from '../../constants';

const CommonModal = props => {
  const styles = makeStyles(COLORS); // theme instance

  return (
    <Modal // edit puja date modal
      isOpen={props.isOpen}
      onClose={() => props.onClose()}>
      <Animatable.View // visible section of edit puja date modal
        animation={'bounceIn'}
        duration={500}
        style={styles.container}>
        <View // header section
          style={styles.header}>
          <Text // header text
            style={styles.txt}>
            {props.title}
          </Text>
          <TouchableOpacity // close button
            style={{flex: 1, alignItems: 'flex-end'}}
            onPress={() => props.onClose()}>
            <Image // close icon
              source={icons.close}
              style={styles.close}
            />
          </TouchableOpacity>
        </View>
        <View // separator
          style={styles.separator}
        />
        {props.children}
      </Animatable.View>
    </Modal>
  );
};

export default CommonModal;

const makeStyles = COLORS =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radiusMedium,
      width: SIZES.width * 0.95,
      padding: SIZES.paddingMedium,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    close: {height: 30, width: 30, tintColor: COLORS.darkGray},
    txt: {
      flex: 10,
      fontSize: SIZES.fontMedium,
      color: COLORS.black,
    },
    separator: {
      height: 1,
      backgroundColor: COLORS.gray,
      marginVertical: SIZES.paddingMedium,
    },
  });
