import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
 
import AntDesign from 'react-native-vector-icons/AntDesign';
 
const ReviewInput = ({labelValue, placeholderText, iconType, keyboardTypeType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={20} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        keyboardType={keyboardTypeType}
        backgroundColor='#ffd4b1'
        borderRadius={20}
        {...rest}
      />
    </View>
  );
};
 
export default ReviewInput;
 
const styles = StyleSheet.create({
  inputContainer: {
    opacity:0.7,
    marginTop: 10,
    marginBottom: 25,
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd4b1',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});