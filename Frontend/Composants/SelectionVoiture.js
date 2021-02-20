// Composants/SelectionVoiture.js

/**
 * Page comportant le formulaire d'entrée de la voiture
 */

import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { FontAwesome } from '@expo/vector-icons'
import Voiture from './Voiture'
import CarForm from '../Store/Forms/CarForm'
import { connect } from 'react-redux';
import { getRequest } from '../Fonctions/HTTPRequestjson'
import Toast from 'react-native-simple-toast';
import Dialog from "react-native-dialog"

const { width, height } = Dimensions.get('window');


class SelectionVoiture extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modeleSelected: { id: 0, model: 'Voiture', currentAutonomy: '' },
            modeles: [{ id: 0, model: 'Voiture', currentAutonomy: '', },],
            nombreVoiture: 0,
            isDialogVisible: false,
            autonomieSelected: '',
        }
        this.loadAncientModeles();
    }


    /**
     * On charge ici la vrai liste de toutes les voitures de la bdd
     */
    componentDidMount() {
        this.loadModelesVehicules();
    }

    modelesVoitures = [
        { id: 0, model: 'Voiture', currentAutonomy: '' },
    ];

    /**
     * Initialisation de la liste des modèles de voitures et du modèle séléctionné
     * pour ne pas que le rendre crash
     */
    loadAncientModeles() {
        var modelesVoituresCree = [];
        this.modelesVoitures.map((modeleVoiture) => (
            modelesVoituresCree.push(<Picker.Item label={modeleVoiture.model} value={modeleVoiture} key={this.state.nombreVoiture++} />)
        ));
        this.state.modeles = modelesVoituresCree;
        this.state.modeleSelected = modelesVoituresCree[0].props.value;
    }


    /**
     * Récupération et stockage de tous les modèles de voitures dans la bdd
     */
    async loadModelesVehicules() {
        var testVoitures = [];
        //Récupération des voitures
        testVoitures = await this.formatJSON(getRequest("cars"));
        //Stockage des données collectées
        if (testVoitures != null) {
            this.setState({ modeles: testVoitures, modeleSelected: testVoitures[0].props.value });
        }
    }


    /**
     * On recherche l'indice de la voiture dans la liste des voitures par son modèle (nom)
     * @param {*} modeleChoisi le modèle selectionné dans la liste déroulante
     */
    trouverModeleChoisi(modeleChoisi) {
        for (var i = 0; i < this.state.modeles.length; i++) {
            if (this.state.modeles[i].props.value.model == modeleChoisi.model) {
                return i;
            }
        }
    }

    /**
     * Affichage de la voiture séléctionnée dans le menu déroulant
     * @param {*} modeleChoisi le modèle selectionné dans la liste déroulante
     */
    renderVoitureChoisie(modeleChoisi) {
        //On cherche l'indice du modèle pour le retourner
        var idModel = this.trouverModeleChoisi(modeleChoisi);
        var modele = this.state.modeles[idModel];
        //affichage de la voiture
        return (

            <View>
                <Voiture {...modele.props.value} />
            </View>
        )
    }

    /**
    * Mise en forme des données collectées du JSON et les stockées dans un menu déroulant
    * @param {*} allCars fichier json de toutes les voitures retournées
    */
    async formatJSON(allCars) {
        //Vérification de voitures retournées par la requête sinon toast
        var isCarsNotNull = true;
        await allCars.then(
            function (cars) {
                if (cars == null) {
                    Toast.showWithGravity("Aucun modèle de voiture n'a pu être chargé.", Toast.LONG, Toast.BOTTOM);
                    isCarsNotNull = false;
                }
            }
        );
        if (!isCarsNotNull) {
            return null;
        }
        else {
            var tabCars = [];
            var bigtabCars = [];
            var i = 0;
            //Mappage des voitures
            bigtabCars = await allCars.then(
                function (cars) {
                    cars.map(
                        function (voiture) {
                            tabCars.push(<Picker.Item label={voiture.model} value={voiture} key={i} />)
                            i = i + 1
                            return tabCars
                        }
                    )
                    return tabCars
                }
            );
            //Enregistrement et retour du tableau de picker item
            this.state.nombreVoiture = bigtabCars.length;
            return bigtabCars;
        }
    }

    /**
     * Vérifie que tous les champs soient complets et envoies les données de la voiture au redux
     * @param {*} data les données à envoyer
     */
    handleFormFullField(data, propsnavigation) {
        // Mise en forme de la voiture
        data = {
            "model": data.model,
            "subscription": "",
            "maxAutonomy": data.maxAutonomy,
            "currentAutonomy": data.currentAutonomy,
            "batteryType": data.batteryType,
            "capacity": data.maxWattage,
            "courantConnecteurs": [
                {
                    "puissance": data.puissance,
                    "courant": data.courant,
                    "connecteur": data.connecteur,
                }
            ],
        };

        var allFieldsCompleted = false
        // Vérifiez que l'object data existe
        if (data && Object.keys(data).length > 0) {
            // Vérifie que tous les champs sont remplis
            if (data.batteryType && Object.keys(data.batteryType).length > 0
                && data.currentAutonomy && Object.keys(data.currentAutonomy).length > 0
                && data.maxAutonomy && Object.keys(data.maxAutonomy).length > 0
                && data.capacity && Object.keys(data.capacity).length > 0
                && data.model && Object.keys(data.model).length > 0
                && data.courantConnecteurs[0].courant && Object.keys(data.courantConnecteurs[0].courant).length > 0
                && data.courantConnecteurs[0].puissance && Object.keys(data.courantConnecteurs[0].puissance).length > 0
                && data.courantConnecteurs[0].connecteur && Object.keys(data.courantConnecteurs[0].connecteur).length > 0) {
                allFieldsCompleted = true;
            }
            else {
                allFieldsCompleted = false;
            }
        }
        else {
            allFieldsCompleted = false;
        }

        //Met à false si il manque une donnée
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                if (data[property] == null) {
                    allFieldsCompleted = false;
                }
            }
        }

        //On envoie les données si tous les champs sont complétés
        if (allFieldsCompleted) {
            const action = { type: 'CAR_PICKED_BY_USER', value: data }
            this.props.dispatch(action);
            // Passage à la vue suivante
            propsnavigation.navigation.navigate('BorneToGo');
        }
        else {
            Toast.showWithGravity("Vous n'avez pas renseigné tous les champs du formulaire.", Toast.LONG, Toast.BOTTOM);
        }
    }

    /**
     * Gestion du click du bouton Sélectionner.
     * @param {*} data les données de la voiture à sauvegarder dans le state.modeleSelected
     */
    handleCarSelected(data) {
        this.showDialog(true);
        //Enregistrement des données de la voiture 
        this.setState({ modeleSelected: data });
    }

    /**
     * Gestion du click sur le bouton Annuler de la boite de dialogue
     */
    handleCancelButtonDialog() {
        this.showDialog(false);
    }

    /**
     * Gestion de l'affichage de la boite de dialogue
     * @param {*} isShow true : affiche la boite, false : cache la boite
     */
    showDialog(isShow) {
        this.setState({ isDialogVisible: isShow });
    }

    /**
    * Gestion du click sur le bouton Valider de la boite de dialogue
    */
    handleValidateButtonDialog(propsnavigation) {
        //Ferme la boite de dialogue
        this.showDialog(false);
        var autonomie = parseFloat(this.state.autonomieSelected)
        if (isNaN(autonomie)) {
            Toast.showWithGravity("L'autonomie renseignée n'est pas un nombre.", Toast.LONG, Toast.BOTTOM);
            this.showDialog(true);
        }
        else {
            var dataCarSelected = {};
            //Remplissage d'un objet similiaire pour pouvoir ajouter l'autonomie du véhicule
            for (var property in this.state.modeleSelected) {
                if (this.state.modeleSelected.hasOwnProperty(property)) {
                    if (property != 'currentAutonomy') {
                        Object.defineProperty(dataCarSelected, property, {
                            value: this.state.modeleSelected[property],
                            writable: true,
                            enumerable: true
                        });
                    }
                    else {
                        Object.defineProperty(dataCarSelected, property, {
                            value: this.state.autonomieSelected,
                            writable: true,
                            enumerable: true
                        });

                    }
                }
            }
            //Enregistrement dans le store redux
            const action = { type: 'CAR_PICKED_BY_USER', value: dataCarSelected }
            this.props.dispatch(action);
            // Passage à la vue suivante
            propsnavigation.navigation.navigate('BorneToGo');
        }
    }

    /**
     * Affichage de la page
     */
    render() {
        const { propsnavigation } = this.props;

        return (

            <View style={styles.mainContainer}>

                <View style={styles.pickCarContainer}>
                    <Text style={styles.titleStyle}>Choisissez votre modèle de voiture</Text>
                    <View style={styles.menuDeroulant}>
                        <FontAwesome name="car" size={24} color="#70B445" />
                        <Picker
                            selectedValue={this.state.modeleSelected}
                            style={{ height: 50, width: 200 }}
                            onValueChange={(itemValue) => this.setState({ modeleSelected: itemValue })}
                        >
                            {this.state.modeles}
                        </Picker>
                    </View>
                    <View style={styles.voitureInfos}>
                        {this.renderVoitureChoisie(this.state.modeleSelected)}
                    </View>
                    <View style={styles.buttonSelectionner}>
                        <Button
                            color='#70B445'
                            title="Sélectionner"
                            width={width}
                            onPress={() => this.handleCarSelected(this.state.modeleSelected)} />
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.isDialogVisible}>
                            <Dialog.Title>Entrez l'autonomie actuelle de votre véhicule</Dialog.Title>
                            <Dialog.Input type="number" onChangeText={(arg) => this.setState({ autonomieSelected: arg })} />
                            <Dialog.Button label="Annuler" onPress={() => this.handleCancelButtonDialog()} />
                            <Dialog.Button label="Valider" onPress={() => this.handleValidateButtonDialog(propsnavigation)} />
                        </Dialog.Container>
                    </View>
                </View>
                <View style={styles.describeCarContainer}>
                    <Text style={styles.titleStyle}>Ou décrivez votre modèle de voiture :</Text>
                    <View style={styles.form}>
                        <CarForm onSubmit={(values) => {
                            this.handleFormFullField(values, propsnavigation);
                            // passage à la partie suivante
                        }
                        } />
                    </View>
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
    titleStyle: {
        fontSize: 18,
        color: '#70B445',
        fontWeight: "bold"
    },
    pickCarContainer: {
        flex: 2,
        alignItems: "center",
        flexDirection: "column",
    },
    menuDeroulant: {
        flex: 2,
        alignItems: "center",
        flexDirection: "row",
    },
    voitureInfos: {
        flex: 3,
        padding: 10,
        width: width - 24,
    },
    buttonSelectionner: {
        width: width - 34,
        marginTop: 10,
    },
    describeCarContainer: {
        flex: 3,
        marginTop: 15,
        alignItems: "center",
        flexDirection: "column",
    },
    form: {
        flex: 1,
        paddingVertical: 10,
    },
})

const mapStateToProps = (state) => {
    return {
        car: state.carSelected.car
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionVoiture)