// Store/Forms/CarForm

import React from 'react'
import {View, Button, StyleSheet, Text} from 'react-native'
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'


class CarForm extends React.Component {
	render() {
		return (
			//textContentType : one of ["none","URL","addressCity","addressCityAndState","addressState","countryName","creditCardNumber","emailAddress","familyName","fullStreetAddress","givenName","jobTitle","location","middleName","name","namePrefix","nameSuffix","nickname","organizationName","postalCode","streetAddressLine1","streetAddressLine2","sublocality","telephoneNumber","username","password","newPassword","oneTimeCode"]
			<View style={styles.formContainer}>
				<View style={styles.rowForm}>
					<Field
						name="modele"
						label="Modèle de voiture"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
				</View>
				<View style={styles.rowForm}>
					<Field 
						name="typeprise"
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
				</View>
				<View style={styles.rowForm}>
					<Field
						name="capacite"
						label="Capacité"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
					<Field 
						name="autonomie"
						label="Autonomie Restante"
						textContentType="none"
						autoCorrect={false}
						autoCapitalize="none"
						component={TextInputClass}
					/>
				</View>
				<Button color='#70B445' title ="Valider" onPress={this.props.handleSubmit} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer:{
		flexDirection:"column",
	},
	rowForm:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignSelf:"center",
	},
})

export default reduxForm({
	form: 'car',
})(CarForm);