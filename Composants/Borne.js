// Components/Borne.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Connecteur from './Connecteur';

class Borne extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderDispo(status) {
        return (
            (status) ? <Text style={styles.dispo}>Disponible</Text> : <Text style={styles.pasdispo}>Pas disponible</Text>
        )
    }

    renderConnecteur(nbConnecteur) {
        return (
            (nbConnecteur >= 2) ? <Text style={styles.titre}>CONNECTEURS</Text> : <Text style={styles.titre}>CONNECTEUR</Text>
        )
    }


    render() {
        const { borne, station, propsnavigation } = this.props;

        var nbConnecteur = Object.keys(borne.item.connecteurs).length;

        return (
            <View style={styles.borne_container}>
                <View style={styles.info_section}>
                    <Image
                        style={styles.image}
                        source={require('../Images/borne2.png')}
                    />
                    <Text style={styles.borne}>BORNE</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.info_section}>
                        <Text style={styles.titre}>PUISSANCE</Text>
                        <View style={styles.puissance_view}>
                            <Text style={styles.puissance}>{borne.item.puissance} kW</Text>
                        </View>
                    </View>
                    <View style={styles.info_section}>
                        {this.renderConnecteur(nbConnecteur)}
                        {borne.item.connecteurs.map(item =>
                            <Connecteur
                                key={`Connecteur-${station.idStation}-${borne.idBorne}-${item.idConnecteur}`}
                                connecteur={item}
                                borne={borne}
                                station={station}
                                propsnavigation={propsnavigation}
                            />
                        )}
                    </View>
                </View>
                { this.renderDispo(borne.item.status)}
            </View >
        );
    }
}


const styles = StyleSheet.create({
    borne_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    // informations principales sur la borne
    info: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    // section d'information
    info_section: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    // titre puissance et connecteur(s)
    titre: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 8,
        fontWeight: 'bold',
    },
    // titre borne
    borne: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
        marginTop: 5,
    },
    puissance_view: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    // Affichage de la puissance
    puissance: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    // Affichage de Disponible/Pas disponible
    dispo: {
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        height: 40,
        width: 120
    },
    pasdispo: {
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        height: 40,
        width: 120
    },
    // Affichage de l'image
    image: {
        height: 40,
        width: 40,
        borderRadius: 10
    },
})

export default Borne

/*
               <View>
                    {borne.connecteurs.map(item =>
                        <Connecteur
                            key={`Connecteur-${station.idStation}-${borne.idBorne}-${item.idConnecteur}`}
                            connecteur={item}
                            borne={borne}
                            station={station}
                            propsnavigation={propsnavigation}
                        />
                    )}
                </View>
*/