// Store/Forms/CarForm

import React from 'react'
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native'
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'

const { width, height } = Dimensions.get('window');

class CarForm extends React.Component {
	render() {
		return (
			//textContentType : one of ["none","URL","addressCity","addressCityAndState","addressState","countryName","creditCardNumber","emailAddress","familyName","fullStreetAddress","givenName","jobTitle","location","middleName","name","namePrefix","nameSuffix","nickname","organizationName","postalCode","streetAddressLine1","streetAddressLine2","sublocality","telephoneNumber","username","password","newPassword","oneTimeCode"]
			<View style={styles.formContainer}>
					<Field
						name="model"
						label="Modèle de voiture"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
					<Field
						name="batteryType"
						label="Type de Prise"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
					<Field
						name="maxWattage"
						label="Puissance maximale autorisée"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
					<Field
						name="maxAutonomy"
						label="Capacité"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
					<Field
						name="currentAutonomy"
						label="Autonomie Restante"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
				<View style={styles.center}>
					<View style={styles.valider}>
						<Button color='#70B445' title="Valider" onPress={this.props.handleSubmit} />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		flexDirection: "column",
		alignSelf: "center",
	},
	valider: {
		width: width - 34,
		marginTop: 10,
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
})

export default reduxForm({
	form: 'car',
})(CarForm);