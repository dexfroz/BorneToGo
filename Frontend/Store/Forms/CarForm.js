// Store/Forms/CarForm

import React from 'react'
import {View, Button, Text} from 'react-native'
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'


class CarForm extends React.Component {
	render() {
		return (
			<View>
				<Field
					name="login"
					label="Identifiant"
					textContentType="username"
					autoCorrect={false}
					autoCapitalize="none"
					component={TextInputClass}
				/>
				<Field
					name="password"
					label="Mot de passe"
					textContentType="password"
					secureTextEntry={true}
					autoCorrect={false}
					autoCapitalize="none"
					component={TextInputClass}
				/>
				<Button title ="LogIn" onPress={this.props.handleSubmit}>
					<Text>Log in</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
	form: 'car',
})(CarForm);