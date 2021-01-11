// Pages/PageMap.js

import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID, Marker } from 'react-native-maps';
import BorneMap from '../Components/BorneMap';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const stationsElectriques = [
    {
        idStation: 83137,
        adresse: 'Parking Plages Du Mourillon 83000 TOULON',
        longitude: 5.9522,
        latitude: 43.1073,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours'
    },
    {
        idStation: 83139,
        adresse: 'Avenue F.Lesseps 83000 TOULON',
        longitude: 5.9389,
        latitude: 43.1262,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours'
    },
    {
        idStation: 83138,
        adresse: 'Place Du Colonel Bonnier 83000 TOULON',
        longitude: 5.9105,
        latitude: 43.1287,
        paiement: 'Payant',
        horaire: '24/24 7/7 jours'
    },
];

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
            }
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onMapPress(e) {
        log('OnMapPress', e)
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    marker1: true,
                },
            ],
        });
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    renderStation(item) {
        return (
            <View key={`Station-${item.idStation}`} style={styles.station}>
                <Text style={styles.adresse}>{item.adresse}</Text>
                <View style={styles.stationcorps}>
                    <Image
                        style={styles.image}
                        source={require('../Images/borne.png')}
                    />
                    <View style={styles.paiementhoraire}>
                        <Text style={styles.paiement}>{item.paiement}</Text>
                        <Text style={styles.horaire}>{item.horaire}</Text>
                    </View>
                    <View style={styles.vuebouton}>
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
        )
    }

    renderStations() {
        return (
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
        )
    }


    /* On remplace ScrollView par une FlatList
    <ScrollView
                horizontal
                style={styles.stations}
                pagingEnabled // répartie les stations dans des pages de sorte qu'on ne voit qu'une station à la fois
                scrollEnabled // rend possible le scroll entre les différentes "pages" de station
                showsHorizontalScrollIndicator={false} // empêche l'apparition d'un scroll horizontal interne quand le nom est trop grand
                scrollEventThrottle={16} // intervalle de temps en ms, permet de fluidifier le scrolling
                snapToAlignment="center"
            >
                {stationsElectriques.map((item) => this.renderStation(item))}
            </ScrollView>
        */

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

                    {stationsElectriques.map(item =>
                        <BorneMap key={`marker-${item.idStation}`} marker={item} />
                    )}

                </MapView>
                {this.renderStations()}
            </View>
        );
    }
}

/* Markeur
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
*/

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
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 18,
        marginHorizontal: 24,
        width: width - (24 * 2)
    },
    adresse: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    stationcorps: {
        flex: 1,
        flexDirection: 'row',

    },
    paiementhoraire: {
        flex: 1,
        marginLeft: 15,
    },
    paiement: {
        fontStyle: 'italic'
    },
    image: {
        height: 60,
        width: 60
    },
    vuebouton: {
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
    }
})

export default PageMap