// Store/Forms/TextInput

import Style from 'ol/style/Style';
import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import FieldWrapper from './FieldWrapper';

class TextInputClass extends React.Component {
      render() {

            const { input, ...inputProps } = this.props;
            //console.log('input : ');
            //console.log(input);
            //console.log('props : ')
            //console.log(this.props);
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
                  //       <TextInput 
                  //             style={styles.textInput} 
                  //             placeholder={this.props.label} 
                  //             onChangeText={input.onChange} 
                  //             value={input.value} 
                  //             {...inputProps} 
                  //       />
            );
      }
}
const styles = StyleSheet.create({
      textInput: {
            borderColor: 'black',
            borderWidth: 1,
            height: 37,
            width: 250
      },
})

export default TextInputClass