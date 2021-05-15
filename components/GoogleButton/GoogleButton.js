import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import GoogleIcon from '../GoogleIcon/GoogleIcon'

const GoogleButton = ({ onPress }) => {
  return (
    <Pressable
      android_ripple={{color: '#CCC'}}
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <GoogleIcon style={styles.icon} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.buttonText}>Connexion avec Google</Text>
      </View>
    </Pressable>
  );
};
 
export default GoogleButton;
 
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 3,
    elevation: 2,
    backgroundColor:"#FFF"
  },
  iconWrapper: {
    width: 25,
    height: 25,
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
    color: "#0000008a"
  },
});