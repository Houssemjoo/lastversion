import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const FormButton = ({ buttonTitle, onPress }) => {
  return (
    <Button labelStyle={styles.buttonText} style={styles.buttonStyle} contentStyle={styles.contentStyle} mode="contained" onPress={onPress}>
      {buttonTitle}
    </Button>
  )
}

export default FormButton;

const styles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle:{
    flex: 1,
    width: '100%',
    marginVertical: 15
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});