// Components/Borne.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class Borne extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderDispo(status) {
        return (
            (status) ? <Text style={styles.dispo}>Disponible</Text> : <Text style={styles.pasdispo}>Pas disponible</Text>
        )
    }

    render() {
        const { borne } = this.props;
        
        console.log("BORNE 2", borne);

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
                        <Text style={styles.titre}>CONNECTEUR</Text>
                        <View style={styles.connecteur_haut}>
                            <Text style={styles.connecteur_texte}>{borne.item.connecteur}</Text>
                        </View>
                        <Text style={styles.titre}>COURANT</Text>
                        <View style={styles.connecteur}>
                            <Text style={styles.connecteur_texte}>{borne.item.courant}</Text>
                        </View>
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
    // Affichage du connecteur
    connecteur: {
        backgroundColor: '#70B445',
        borderRadius: 10,
        padding: 10,
        //height: 40,
        width: 60
    },
    connecteur_haut: {
        marginBottom: 5,
        backgroundColor: '#70B445',
        borderRadius: 10,
        padding: 10,
        //height: 40,
        width: 60
    },
    connecteur_texte: {
        fontSize: 10,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
    },
})

export default Borne