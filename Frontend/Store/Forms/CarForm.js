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
					name="capacity"
					label="Capacité"
					textContentType="none"
					autoCorrect={false}
					autoCapitalize="none"
					component={TextInputClass}
				/>
				<Field
					name="maxAutonomy"
					label="Autonomie maximale"
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
				<Text style={styles.label}>
					Connecteur
				</Text>
				<Field
					name="courant"
					label="Courant du connecteur"
					textContentType="none"
					autoCorrect={false}
					autoCapitalize="none"
					component={TextInputClass}
				/>
				<Field
					name="connecteur"
					label="Nom du connecteur"
					textContentType="none"
					autoCorrect={false}
					autoCapitalize="none"
					component={TextInputClass}
				/>
				<Field
					name="puissance"
					label="Puissance du connecteur"
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
	label: {
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#70B445',
	},
})

export default reduxForm({
	form: 'car',
})(CarForm);