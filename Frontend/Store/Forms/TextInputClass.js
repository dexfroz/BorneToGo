// Store/Forms/TextInput

import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import FieldWrapper from './FieldWrapper';

class TextInputClass extends React.Component {
      render() {

            const { input, ...inputProps } = this.props;

            return (
                  <FieldWrapper {...this.props}>
                        <Input
                              {...inputProps}
                              placeholder={input.label}
                              onChangeText={input.onChange}
                              onBlur={input.onBlur}
                              onFocus={input.onFocus}
                              value={input.value.toString()}
                        />
                  </FieldWrapper>
            );
      }
}
const styles = StyleSheet.create({
      textInput: {
            flex:1,
            borderColor: '#70B445',
            borderWidth: 1,
      },
})

export default TextInputClass