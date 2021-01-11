// Pages/PageMap.js

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_OSMDROID, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


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

    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    render() {
        return (
            <View style={styles.map}>
                <MapView
                    region={this.state.region}
                    provider={this.props.provider}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={styles.map}
                    showsUserLocation
                >
                    <MapView.UrlTile
                        urlTemplate={"https://www.openstreetmap.org/#map={z}/{x}/{y}"}
                        shouldReplaceMapContent={true}
                    />
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude
                        }}
                        title={"Vous êtes ici"}
                        description={"Votre position"}
                        onSelect={e => log('onSelect', e)}
                        onDrag={e => log('onDrag', e)}
                        onDragStart={e => log('onDragStart', e)}
                        onDragEnd={e => log('onDragEnd', e)}
                        onPress={e => log('onPress', e)}
                        draggable
                    />

                </MapView>
            </View>
        );
    }
}

//onRegionChange={this.onRegionChange}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
})

export default PageMap