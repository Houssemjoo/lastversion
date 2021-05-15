import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper'
import ErrorFieldMessage from '../ErrorFieldMessage/ErrorFieldMessage'

const displayError = (field, fieldsErrors) => {
  const errorIndex = fieldsErrors.map((f) => f.field).indexOf(field)
  
  return  fieldsErrors[errorIndex].message
}

const visibleError = (field, fieldsErrors) => {
  const msgs = displayError(field, fieldsErrors)

  if(msgs.length > 0){
      return true;
  }

  return false;
}

const FormInput = ({ labelValue, placeholderText, iconType, keyboardTypeType, textInputref, msgs, fieldName, fieldsErrors,  ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        error={visibleError(fieldName, fieldsErrors)}
        ref={textInputref}
        left={<TextInput.Icon icon={iconType} color={"#555"} />}
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        keyboardType={keyboardTypeType}
        {...rest}
      />
      <ErrorFieldMessage msgs={displayError(fieldName, fieldsErrors)} />
    </View>
  )
};
 
export default FormInput;
 
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexDirection: "column"
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 0
  },
});