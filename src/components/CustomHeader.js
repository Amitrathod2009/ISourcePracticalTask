import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from '../css/styles';

const CustomHeader = ({ title }) => {
  return (
    <Appbar.Header>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </Appbar.Header>
  );
};
export default CustomHeader;
