// Pages/PageMapResultat.js

/**
 * PageMapResultat est la page qui affiche les itinéraires résultats suite au calcul d'un itinéraire en utilisant la PageTrajet.js
 * Ce composant contient une MapView sur laquelle sont affichées les bornes (Marker) et les itinéraires (Polyline)
 * Une FlatList permet d'afficher les informations des itinéraires résultats
 */

import React from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, Image } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID, Polyline } from 'react-native-maps';
import MarkerItineraire from '../Composants/MarkerItineraire';
import ItineraireMap from '../Composants/ItineraireMap';
import StationMapNonSelectionnable from '../Composants/StationMapNonSelectionnable';
import { formaterDuree, formaterDistance } from '../Fonctions/Format'
import { getItineraires, getDepart, getArrivee, getDistance, getDuree, getStationsEtapes } from '../Fonctions/Itineraire'
import data from '../Fichiers/input'

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

// Calcul et initialisation des coordonnées de la position initiale de la map
const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class PageMapResultat extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            data_test: '',
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            // Itinéraire
            idRouteCourant: 0,
            itineraires: getItineraires(data[0].routes),
            // Markers
            depart: getDepart(data[0].routes[0]),
            arrivee: getArrivee(data[0].routes[0]),
            stations_etapes: getStationsEtapes(data[0].routes[0]),
            // Distance et durée formatée
            duree: formaterDuree(getDuree(data[0].routes[0])),
            distance: formaterDistance(getDistance(data[0].routes[0])),
        };
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    renderMarkerDepart() {
        // DEPART
        return (
            this.state.depart.isStation
                ?
                <StationMapNonSelectionnable
                    key={`Depart-Station-${this.state.idRouteCourant}-${this.state.depart.location.latitude}-${this.state.depart.location.longitude}`}
                    marker={this.state.depart}
                    depart={true}
                    arrivee={false}
                    propsnavigation={this.props}
                />
                :
                <MarkerItineraire
                    key={`Depart-${this.state.idRouteCourant}-${this.state.depart.location.latitude}-${this.state.depart.location.longitude}`}
                    marker={this.state.depart}
                    depart={true}
                    arrivee={false}
                    propsnavigation={this.props}
                />
        )
    }

    renderMarkerArrivee() {
        // ARRIVEE
        return (
            this.state.arrivee.isStation
                ?
                <StationMapNonSelectionnable
                    key={`Arrivee-Station-${this.state.idRouteCourant}-${this.state.arrivee.location.latitude}-${this.state.arrivee.location.longitude}`}
                    marker={this.state.arrivee}
                    depart={true}
                    arrivee={false}
                    propsnavigation={this.props}
                />
                :
                <MarkerItineraire
                    key={`Arrivee-${this.state.idRouteCourant}-${this.state.arrivee.location.latitude}-${this.state.arrivee.location.longitude}`}
                    marker={this.state.arrivee}
                    depart={false}
                    arrivee={true}
                    propsnavigation={this.props}
                />
        )
    }

    renderMarkersStationsEtapes() {
        // ETAPES ET STATIONS
        return (
            this.state.stations_etapes.map(item =>
                item.isStation ?
                    <StationMapNonSelectionnable
                        key={`Station-${this.state.idRouteCourant}-${item.idStation}-${item.location.latitude}-${item.location.longitude}`}
                        marker={item}
                        depart={false}
                        arrivee={false}
                        propsnavigation={this.props}
                    />
                    :
                    <MarkerItineraire
                        key={`Station-${this.state.idRouteCourant}-${item.location.latitude}-${item.location.longitude}`}
                        marker={item}
                        depart={false}
                        arrivee={false}
                        propsnavigation={this.props}
                    />
            )
        )
    }

    changerItineraireActif(id) {
        this.state.idRouteCourant = id - 1;

        // Récupération des informations pour : 
        // DEPART
        this.state.depart = getDepart(this.state.itineraires[this.state.idRouteCourant]);

        // ARRIVEE
        this.state.arrivee = getArrivee(this.state.itineraires[this.state.idRouteCourant]);

        // STATIONS et ETAPES
        this.state.stations_etapes = getStationsEtapes(this.state.itineraires[this.state.idRouteCourant]);

        // DUREE
        this.state.duree = formaterDuree(getDuree(this.state.itineraires[this.state.idRouteCourant]));

        // DISTANCE
        this.state.distance = formaterDistance(getDistance(this.state.itineraires[this.state.idRouteCourant]));

        // On change le state
        this.setState({ state: this.state });
    }

    renderTitre(item) {
        var plusieurs = false;
        if (this.state.itineraires.length > 1) {
            plusieurs = true;
        }

        return (
            plusieurs ?
                <Text style={styles.title}>Itinéraire n°{item.idRoute}</Text>
                :
                <Text style={styles.title}>Itinéraire</Text>
        )
    }

    renderItineraire(item) {
        return (
            <TouchableWithoutFeedback
                key={`Itineraire-${item.idRoute}`}
                onPressIn={() => this.changerItineraireActif(item.idRoute)}
            >
                <View style={styles.itineraire}>
                    <View style={styles.informations}>
                        <View>
                            {this.renderTitre(item)}
                        </View>
                        <View style={styles.info1}>
                            <View>
                                <Image
                                    style={styles.image}
                                    source={require('../Images/itineraire.png')}
                                />
                            </View>
                            <View style={styles.depart_arrivee}>
                                <Text style={styles.depart}>{this.state.depart.name}</Text>
                                <Text style={styles.arrivee}>{this.state.arrivee.name}</Text>
                            </View>
                        </View>
                        <View style={styles.info2}>
                            <Text style={styles.duree}>{this.state.duree}</Text>
                            <Text style={styles.distance}>{this.state.distance}</Text>
                        </View>
                    </View>
                    <View style={styles.boutons}>
                        <View>
                            <TouchableOpacity
                                key={`Bouton Info`}
                                onPress={() => this.props.navigation.navigate('Informations', {
                                    itineraire: this.state.itineraires[this.state.idRouteCourant],
                                })}
                            >
                                <View style={styles.bouton_info}>
                                    <Image
                                        style={styles.image_bouton}
                                        source={require('../Images/info.png')}
                                    />
                                    <Text style={styles.voir_info}>Voir Info</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                key={`Bouton Statistique`}
                            //onPress={ }
                            >
                                <View style={styles.bouton_stat}>
                                    <Image
                                        style={styles.image_bouton}
                                        source={require('../Images/stat.png')}
                                    />
                                    <Text style={styles.voir_stat}>Voir Stat</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        )
    }

    renderItineraires() {
        return (
            <FlatList
                horizontal
                style={styles.itineraires}
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={this.state.itineraires}
                keyExtractor={(item) => `${item.idRoute}`}
                renderItem={({ item }) => this.renderItineraire(item)}
            />
        )
    }
    //exp://192.168.1.32:19001
    getData() {
        fetch('http://192.168.1.32:4321/bornetogo/backend/cars')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data_test: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        console.log("RENDER");
        console.log('DATA TEST', this.state.data_test);
        return (
            <View style={styles.container}>
                <MapView
                    ref={(ref) => { this.mapRef = ref }}
                    region={this.state.region}
                    provider={this.props.provider}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={styles.map}
                >
                    <MapView.UrlTile
                        //Permet de récupérer la source de la carte sur openstreetmap
                        urlTemplate={"https://www.openstreetmap.org/#map={z}/{x}/{y}"}
                        shouldReplaceMapContent={true}
                        zIndex={-3}
                    />

                    <ItineraireMap
                        // Affiche l'itinéraire courant
                        key={`Itineraire-${this.state.itineraires[this.state.idRouteCourant].idRoute}`}
                        itineraire={this.state.itineraires[this.state.idRouteCourant]}
                        propsnavigation={this.props}
                    />

                    {this.renderMarkerDepart()}
                    {this.renderMarkersStationsEtapes()}
                    {this.renderMarkerArrivee()}
                </MapView>
                {this.renderItineraires()}
            </View>
        );
    }


    componentDidMount() {
        this.getData();
        // Permet d'ajuster la vue autour des coordonnées`
        try {
            this.mapRef.fitToCoordinates(this.state.itineraires[this.state.idRouteCourant].fullPath.geometry.coordinates, {
                edgePadding: {
                    bottom: 50, right: 50, top: 50, left: 50,
                },
                animated: false,
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    componentDidUpdate() {
        // Permet d'ajuster la vue autour des coordonnées`
        try {
            this.mapRef.fitToCoordinates(this.state.itineraires[this.state.idRouteCourant].fullPath.geometry.coordinates, {
                edgePadding: {
                    bottom: 50, right: 50, top: 50, left: 50,
                },
                animated: false,
            });
        }
        catch (error) {
            console.error(error);
        }

    }

}


const styles = StyleSheet.create({
    // Vue totale de la page
    container: {
        flex: 1
    },
    // Carte
    map: {
        flex: 1
    },
    // Scroll des itinéraires
    itineraires: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 24,
    },
    // Itinéraire individuel
    itineraire: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginHorizontal: 24,
        width: width - (24 * 2),
    },
    // Informations affichées sur l'itinéraire
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image_bouton: {
        height: 30,
        width: 30
    },
    image: {
        height: 60,
        width: 60
    },
    informations: {
        flex: 1,
    },
    info1: {
        flexDirection: 'row',
    },
    depart_arrivee: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
    depart: {
        fontSize: 12,
        textAlignVertical: 'center',
    },
    arrivee: {
        fontSize: 12,
        textAlignVertical: 'center',
    },
    info2: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    duree: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'green',
    },
    distance: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'green',
    },
    // Boutons
    boutons: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bouton_info: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 50,
    },
    voir_info: {
        fontStyle: 'italic',
        textAlignVertical: 'center',
    },
    bouton_stat: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 50,
    },
    voir_stat: {
        fontStyle: 'italic',
        textAlignVertical: 'center',
    },
})

export default PageMapResultat