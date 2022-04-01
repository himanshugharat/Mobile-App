import * as React from 'react';
import {TextInput} from 'react-native-paper';

const OutlinedInput = props => {
  return (
    <TextInput
      mode="outlined"
      label={props.label}
      labelStyle={props.labelStyle}
      placeholder={props.placeholder}
      placeholderStyle={props.placeholderStyle}
      placeholderTextColor={props.placeholderTextColor}
      secureTextEntry={props.secureTextEntry}
      multiline={props.multiline}
      keyboardType={props.keyboardType}
      value={props.value}
      onChangeText={value => props.onChangeText(value)}
      style={props.style}
      theme={props.theme}
      autoCapitalize={props.autoCapitalize}
      right={props.right}
    />
  );
};

export default OutlinedInput;
