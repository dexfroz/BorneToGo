// Pages/PageVoiture.js

/**
 * Page comportant le formulaire d'entrée de la voiture
 */

import React from 'react'
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { FontAwesome } from '@expo/vector-icons'
import Voiture from '../Composants/Voiture'
import CarForm from '../Store/Forms/CarForm'
import { connect } from 'react-redux';
import { InputAccessoryView } from 'react-native'

const { width, height } = Dimensions.get('window');


class PageVoiture extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modeleSelected: {id : 0, model: 'Voiture'},
            modeles: [{id: 0, model: 'Voiture'},],
            nombreVoiture: 0,
            //testModel: this.loadModelesVehicules()
        }
        //this.loadModelesVehicules();
        this.loadAncientModeles();
    }

    componentDidMount() {
        this.loadModelesVehicules();
    }

    modelesVoitures = [
        { id: 0, model: 'Voiture' },
    ];

    loadAncientModeles(){
        var modelesVoituresCree = [];
        this.modelesVoitures.map((modeleVoiture) => (
           modelesVoituresCree.push(<Picker.Item label={modeleVoiture.model} value={modeleVoiture} key={this.state.nombreVoiture++} />)
        ));
        console.log("tab ancientModele : ", modelesVoituresCree);
        modelesVoituresCree.map( (voiture) => (console.log("VoitureAncient : ", voiture)))
        this.state.modeles = modelesVoituresCree;
        this.state.modeleSelected = modelesVoituresCree[0].props.value;
    }

    async loadModelesVehicules() {
        var testVoitures = [];
        testVoitures = await this.testMap(this.getRequest("http://192.168.1.59:4321/bornetogo/backend/cars"));
        testVoitures.map( (voiture) => (console.log("Voiture : ", voiture)));
        this.setState( {modeles : testVoitures, modeleSelected : testVoitures[0].props.value} );
    }

    trouverModeleChoisi(modeleChoisi) {
        console.log("modeles : ",this.state.modeles)
        for(var i = 0 ; i < this.state.modeles.length ; i++){
            if(this.state.modeles[i].props.value.model == modeleChoisi.model){
                return i;
            }
        }
    }

    renderVoitureChoisie(modeleChoisi) {
        console.log("modeleChoisi : ", modeleChoisi)
        var idModel = this.trouverModeleChoisi(modeleChoisi);
        var modele = this.state.modeles[idModel];
        console.log("Modele : ", modele)
        return (

            <View>
                <Voiture {...modele.props.value} />
            </View>
        )
    }

    async getRequest(url){
        let cars;
        console.log("Envoi de la requête :", url);
        await fetch( url, {
            method: "GET"
        })
        .then( (response) => response.json())
        .then( (reponseJson) => cars = reponseJson)
        .catch( (error) => {console.log("Error in requesting http get :", url, " with error :", error );})
        ;
        console.log("Requête GET terminée :", url);
        return cars.cars;
    }

    async testMap(allCars){
        var tabCars = [];
        var bigtabCars = [];
        var i = 0;

        bigtabCars = await allCars.then( 
            function (cars) {
                cars.map( 
                    function (voiture) {
                        tabCars.push(<Picker.Item label={voiture.model} value={voiture} key={i} /> )
                        i = i + 1
                        return tabCars
                    }
                )
                return tabCars
            }
        );
        console.log("BigTabCars : ", bigtabCars);
        this.state.nombreVoiture = bigtabCars.length;
        console.log("Tableau de voiture : ", tabCars.length, "Nombre Voitures : ", this.state.nombreVoiture);
        return bigtabCars;
    }

    /*async sendRequest(){
        const url="http://192.168.1.59:8080/bornetogo/backend/cars";
        let cars; 
        console.log("Ca va envoyer"); 
        await fetch( url, {
            method: "GET"
        })
        .then( (response) => response.json())
        .then( (reponseJson) => cars = reponseJson)
        .catch( (error) => {console.log("Error in requesting http get cars : ", error);})
        ;
        console.log("ReponseJson : ", cars)
        console.log("Ok envoyé");

    }*/

    displayForm(data){
        console.log('data : ', data)
        console.log('Donnees voiture : modele ', data.modele, ' | capacite ', data.capacite, ' | type de prise ', data.typeprise)
    }

    handleCarSelected(data){
        console.log('data : ', data)
        const action = { type: 'CAR_PICKED_BY_USER', value: data }
        this.props.dispatch(action)
    }

    render() {
        return (

            <View style={styles.mainContainer}>
                
                <View style={styles.pickCarContainer}>
                    <Text style={styles.titleStyle}>Choisissez votre modèle de voiture</Text>
                    <View style={styles.menuDeroulant}>
                        <FontAwesome name="car" size={24} color="#70B445"/>
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
                        <Button color='#70B445' title ="Sélectionner" onPress={() => this.handleCarSelected(this.state.modeleSelected)} />
                    </View>
                </View>
                <View style={styles.describeCarContainer}>
                    <Text style={styles.titleStyle}>Ou décrivez votre modèle de voiture :</Text>
                    <View style={styles.form}>
                        <CarForm onSubmit={(values) => this.displayForm(values)} />
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
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },
    menuDeroulant: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    describeCarContainer: {
        flex:2,
        paddingTop: 40,
        alignItems: "center",
        flexDirection: "column",
    },
    voitureInfos: {
        flex: 1
    },
    form: {
        flex:2,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 60,
        margin: 10,
        borderRadius: 10
    },
    buttonSelectionner:{
        width:width-20,
    }
})

const mapStateToProps = (state) => {
    console.log("state PageVoiture : ", state);
    return {
        car: state.carSelected.car
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageVoiture)