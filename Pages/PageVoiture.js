// Pages/PageVoiture.js

import React from 'react'
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { FontAwesome } from '@expo/vector-icons'
import Voiture from '../Composants/Voiture'

const { width, height } = Dimensions.get('window');


class PageVoiture extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modeleSelected: null,
            modeles: []
        }
        this.loadModelesVehicules();
    }

    modelesVoitures = [
        { id: 0, modele: 'Fiat Panda', capacite: 523 },
        { id: 1, modele: 'Seat Ibiza', capacite: 257 },
        { id: 2, modele: 'Renault 2008', capacite: 872 },
        { id: 3, modele: 'Mercedes ClasseA', capacite: 154 },
        { id: 4, modele: 'BMW Serie 1', capacite: 965 },
        { id: 5, modele: 'Alpha Romeo Guillieta', capacite: 514 },
    ];

    loadModelesVehicules() {
        //console.log('Loading all cars modeles from database');
        var modelesVoituresCree = [];
        this.modelesVoitures.map((modeleVoiture) => (
            //console.log(modeleVoiture),
            modelesVoituresCree.push(<Picker.Item label={modeleVoiture.modele} value={modeleVoiture} key={modeleVoiture.id} />)
        ));
        this.state.modeles = modelesVoituresCree;
        this.state.modeleSelected = modelesVoituresCree[0].props.value;
        //console.log('modeleSelected : ' + this.state.modeleSelected + ' ' + modelesVoituresCree.length+' car(s) found');
    }




    renderVoitureChoisie(modeleChoisi) {
        //console.log('Modèle sélectionné : ');
        //console.log(modeleChoisi);

        var modele = this.state.modeles[modeleChoisi.id];

        return (

            <View>
                <Voiture {...modele.props.value} />
            </View>
        )
    }

    render() {
        return (

            <View style={styles.mainContainer}>
                <Text>Choisissez votre modèle de voiture</Text>
                <View style={styles.pickCarContainer}>
                    <View style={styles.menuDeroulant}>
                        <FontAwesome name="car" size={24} />
                        <Picker
                            selectedValue={this.state.modeleSelected}
                            style={{ height: 50, width: 200 }}
                            onValueChange={(itemValue) => this.setState({ modeleSelected: itemValue })}
                        >
                            {this.state.modeles}
                        </Picker>
                    </View>
                    <View style={styles.voitureInfos}>
                        {this.renderVoitureChoisie(this.state.modeleSelected)
                        }
                    </View>
                </View>
                <View style={styles.describeCarContainer}>
                    <Text>Ou décrivez votre modèle de voiture :</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    pickCarContainer: {
        flex: 1,
        paddingTop: 10,
        height: height / 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    menuDeroulant: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    describeCarContainer: {
        paddingTop: 10,
        alignItems: "center",
        height: height / 2,
        flexDirection: "column"
    },
    voitureInfos: {
        flex: 1
    },
})

export default PageVoiture