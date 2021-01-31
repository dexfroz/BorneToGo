// Pages/PageMap.js

/**
 * Cette page permet à l'utilisateur d'afficher les itinéraires vers bornes les plus proches et les moins chères
 * Elle comporte un élément MapView sur lequel seront affichés les bornes (Marker) et les itinéraires (Polyline)
 * Elle comporte aussi deux radio boutons : 
 * un qui permet de trouver les itinéraires vers les bornes les plus proches
 * et un qui permet de trouver les itinéraires vers les bornes les moins chères
 */

import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID } from 'react-native-maps';
import StationMap from '../Composants/StationMap';
//import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

// Calcul et initialisation des coordonnées de la position initiale de la map
const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Stations Electriques de test
const stationsElectriques = [
    {
        idStation: 1,
        title: 'Parking des plages du Mourillon',
        adresse: 'Parking Plages Du Mourillon',
        codepostale: '83000',
        ville: 'TOULON',
        longitude: 5.9522,
        latitude: 43.1073,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours',
        bornes: [
            {
                idBorne: 1,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 2,
                puissance: 4.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
        ],
    },
    {
        idStation: 2,
        title: 'Conseil départemental du Var',
        adresse: 'Avenue F.Lesseps',
        codepostale: '83000',
        ville: 'TOULON',
        longitude: 5.9389,
        latitude: 43.1262,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours',
        bornes: [
            {
                idBorne: 1,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 2,
                puissance: 4.0,
                status: false,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 3,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 4,
                puissance: 4.0,
                status: false,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 5,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 6,
                puissance: 4.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 7,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 8,
                puissance: 4.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 9,
                puissance: 22.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                    {
                        idConnecteur: 2,
                        type: 'EF',
                    },
                ]
            },
            {
                idBorne: 10,
                puissance: 4.0,
                status: true,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF',
                    },
                ]
            },
        ],
    },
    {
        idStation: 3,
        title: 'La Poste',
        adresse: 'Place Du Colonel Bonnier',
        codepostale: '83000',
        ville: 'TOULON',
        longitude: 5.9105,
        latitude: 43.1287,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours',
        bornes: [
            {
                idBorne: 1,
                puissance: 22.0,
                status: false,
                connecteurs: [
                    {
                        idConnecteur: 1,
                        type: 'EF-T2',
                    },
                ]
            },
        ],
    },
];

const radio_props = [
    { label: 'La plus proche', value: 'rapide' },
    { label: 'La moins chère', value: 'economique' }
];

// Fonction de log pour tester
function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}

class PageMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            borneActive: null,
            value: 'rapide',
        };
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    // Méthode pour modifier la borne active
    changerStationActive(id) {
        this.state.borneActive = id;
        const action = { type: 'BORNE_ACTIVE_MODIFIEE', value: id }
        this.props.dispatch(action)
    }

    renderStation(item) {

        return (
            <TouchableWithoutFeedback
                key={`Station-${item.idStation}`}
                onPressIn={() => this.changerStationActive(item.idStation)}
            >
                <View style={styles.station}>
                    <View style={styles.titre_info}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Station', {
                                    station: item,
                                })}
                            >
                                <View style={styles.vue_bouton_info}>
                                    <Image
                                        style={styles.image_info}
                                        source={require('../Images/info.png')}
                                    />
                                    <Text style={styles.info}>Voir Info</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.adresse}>{item.adresse}{"\n"}{item.codepostale} {item.ville}</Text>
                    <View style={styles.station_corps}>
                        <Image
                            style={styles.image}
                            source={require('../Images/borne.png')}
                        />
                        <View style={styles.paiement_horaire}>
                            <Text style={styles.paiement}>{item.paiement}</Text>
                            <Text style={styles.horaire}>{item.horaire}</Text>
                        </View>
                        <View style={styles.vue_bouton}>
                            <TouchableOpacity
                                style={styles.bouton}
                            >
                                <View>
                                    <Text style={styles.selection}>Sélectionner</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >

        )
    }

    renderStations() {
        affichage = false;
        if (stationsElectriques.length > 0) {
            affichage = true;
        }
        return (
            affichage ?
                <FlatList
                    horizontal
                    style={styles.stations}
                    pagingEnabled // répartie les stations dans des pages de sorte qu'on ne voit qu'une station à la fois
                    scrollEnabled // rend possible le scroll entre les différentes "pages" de station
                    showsHorizontalScrollIndicator={false} // empêche l'apparition d'un scroll horizontal interne quand le nom est trop grand
                    scrollEventThrottle={16} // intervalle de temps en ms, permet de fluidifier le scrolling
                    snapToAlignment="center"
                    data={stationsElectriques}
                    keyExtractor={(item) => `${item.idStation}`}
                    renderItem={({ item }) => this.renderStation(item)}
                />
                : <View></View>
        )
    }

    changeStateRadioButton(value) {
        /*
        - use case
        - liste de points de l'utilisateur = coord de l'utilisateur
        - infos véhicule
        - paramètre d'optimisation (si possible)
        */

        if (this.state.value != value) {
            if (value == "rapide") { // On envoie la requête HTTP GET pour la borne la plus proche
                // ecriture du json à envoyer
                // envoi du json
                console.log("rapide");
            }
            else if (value == "economique") { // on envoie la requête HTTP GET la borne la moins chère
                // ecriture du json à envoyer
                // envoi du json
                console.log("economique");
            }
            else {
                console.log("pas de boutons sélectionnés")
            }

            this.setState({ value: value });
        }

    }

    renderMarker() {
        affichage = false;
        if (stationsElectriques.length > 0) {
            affichage = true;
        }
        return (
            affichage ?
                stationsElectriques.map(item =>
                    <StationMap
                        key={`Marker-${item.idStation}`}
                        marker={item}
                        propsnavigation={this.props}
                    />
                )
                : <View></View>
        )
    }

    renderChoixUse() {
        return (
            <View style={styles.choix}>
                <RadioForm style={styles.fond_choix}
                    animation={true}
                    formHorizontal={true}
                    labelHorizontal={false}
                    radio_props={radio_props}
                    initial={-1}
                    onPress={(value) => { this.changeStateRadioButton(value) }}
                    buttonColor={'#70B445'}
                    selectedButtonColor={'#70B445'}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    provider={this.props.provider}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={styles.map}
                    showsUserLocation
                >
                    <MapView.UrlTile
                        //Permet de récupérer la source de la carte sur openstreetmap
                        urlTemplate={"https://www.openstreetmap.org/#map={z}/{x}/{y}"}
                        shouldReplaceMapContent={true}
                    />
                    {this.renderMarker()}
                </MapView>
                {this.renderChoixUse()}
            </View>
        );
    }
}

//{this.renderStations()} <= Finalement plus utilisé

const styles = StyleSheet.create({
    // Vue totale de la page
    container: {
        flex: 1
    },
    // Carte
    map: {
        flex: 1
    },
    // Scroll des stations
    stations: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 24,
    },
    // Station individuelle
    station: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginHorizontal: 24,
        width: width - (24 * 2),
    },
    //Informations : adresse, prix, ouverture
    adresse: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5
    },
    station_corps: {
        flexDirection: 'row',
    },
    paiement_horaire: {
        flex: 1,
        marginLeft: 15,
    },
    paiement: {
        flex: 1,
        fontWeight: 'bold',
    },
    image: {
        height: 60,
        width: 60
    },
    // Bouton Sélection
    vue_bouton: {
        justifyContent: 'center',
    },
    bouton: {
        backgroundColor: '#70B445',
        padding: 15,
        borderRadius: 6,
        alignContent: 'center',
        justifyContent: 'center'
    },
    selection: {
        color: 'white',
        fontWeight: "bold",
    },
    // Bouton Info
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    titre_info: {
        marginHorizontal: 24,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    vue_bouton_info: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 50,
    },
    info: {
        fontStyle: 'italic',
        textAlignVertical: 'center',
    },
    image_info: {
        height: 30,
        width: 30
    },
    // Choix de use case (borne la plus proche, borne la plus économique) 
    choix: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 24,
    },
    fond_choix: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginHorizontal: 48,
        width: width - (48 * 2),
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
})

/* REDUX */
// Connexion du state global au component PageMap
const mapStateToProps = (state) => {
    return {
        active: state.borneActive.active
    }
}

// Dispatcher
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageMap)

/* Marker
            <MapView.Marker
                coordinate={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude
                }}
                title={"Vous êtes ici"}
                description={"Votre position"}
                //onSelect={e => log('onSelect', e)}
                //onDrag={e => log('onDrag', e)}
                //onDragStart={e => log('onDragStart', e)}
                //onDragEnd={e => log('onDragEnd', e)}
                //onPress={e => log('onPress', e)}
                draggable
            />

            <View>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                </View>
*/