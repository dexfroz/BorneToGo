// Store/Forms/FieldWrapper

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

class FieldWrapper extends React.Component {
	render() {
		return (
			<View>
				{this.props.children}
				{this.props.meta.touched && this.props.meta.error && (
					<Text style={styles.error}>{this.props.meta.error}</Text>
				)}

				{this.props.meta.warning && (
					<Text style={styles.warning}>
						{this.props.meta.warning}
					</Text>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: 5,
		marginBottom: 5,
		height: 20,
		//flex: 1
	},
	inputContainerInvalid: {
		//backgroundColor: "#F8ECEB"
	},
	fieldDescription: {
		fontStyle: "italic",
		fontSize: 10,
		marginTop: 5,
	},
	error: {
		fontSize: 9,
		fontWeight: "bold",
		fontStyle: "italic",
		paddingTop: 3,
		paddingBottom: 6,
	},
	warning: {
		fontSize: 9,
		fontWeight: "bold",
		fontStyle: "italic",
		paddingTop: 3,
		paddingBottom: 6,
	},
});

export default FieldWrapper