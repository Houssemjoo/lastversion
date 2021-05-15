import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FacebookButton = ({ onPress }) => {
  return (
    <Pressable
      android_ripple={{color: '#CCC'}}
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name={'facebook'} style={styles.icon} size={30} color={"#FFF"}/>
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.buttonText}>Connexion avec Facebook</Text>
      </View>
    </Pressable>
  );
};
 
export default FacebookButton;
 
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 3,
    elevation: 2,
    backgroundColor:"#4267b2"
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFF"
  },
});