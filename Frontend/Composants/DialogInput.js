import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
export default class DialogInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isDialogVisible: false,
          value: 0,
        }
      }

      showDialog(isShow){
        this.setState({isDialogVisible: isShow});
      }

      sendInput(inputText){
        console.log("sendInput (DialogInput#1): "+inputText);
        this.setState({value: inputText})
      }
 render(){
  return (
    <View style={styles.container}>
      <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput ={"HINT INPUT"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
    </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });