// Store/Forms/RouteForm

import React from 'react'
import { View, Button, Text } from 'react-native'
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'


class RouteForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            etapes =[],
        }
    }

    ajouteEtape() {
        var array = this.state.etapes;
        var item = array[-1] + 1;
        array.push(item);
        this.setState({ etapes: array });
    }

    renderAjouteEtape() {
        return (
            <Button title="AddStep" onPress={this.ajouteEtape()}>
                <Text>Ajouter une étape</Text>
            </Button>
        )
    }

    retireEtape(item) {
        var array = this.state.etapes.filter(function (etape) {
            return etape !== item.target.value
        });
        this.setState({ etapes: array });
    }

    renderEtape(item) {
        var name_item = "etape-" + item;
        return (
            <View style={styles.etape}>
                <Field
                    key={item}
                    name={name_item}
                    label="Adresse de départ"
                    textContentType="adresse"
                    autoCorrect={false}
                    autoCapitalize="none"
                    component={TextInputClass}
                />
                <Button title="DelStep" onPress={this.retireEtape(item)}>
                    <Image
                        style={styles.image}
                        source={require('../Images/croix.png')}
                    />
                </Button>
            </View>
        )
    }

    renderEtapes() {
        var affichage = false;
        if (etapes.lentgh > 0) {
            affichage = true;
        }
        return (
            affichage ?
                etapes.map(item => { this.renderEtape(item) })
                :
                <View></View>
        )
    }

    render() {
        return (
            <View>
                <Field
                    name="start"
                    label="Adresse de départ"
                    textContentType="adresse"
                    autoCorrect={false}
                    autoCapitalize="none"
                    component={TextInputClass}
                />
                {this.renderAjouteEtape()}
                {this.renderEtapes()}
                <Field
                    name="end"
                    label="Adresse d'arrivée'"
                    textContentType="adresse"
                    autoCorrect={false}
                    autoCapitalize="none"
                    component={TextInputClass}
                />
                <Button title="Confirm" onPress={this.props.handleSubmit}>
                    <Text>Valider l'itinéraire</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 40,
        width: 40
    },
    etape: {
        flexDirection: 'row',
    }
})

export default reduxForm({
    form: 'car',
})(RouteForm);