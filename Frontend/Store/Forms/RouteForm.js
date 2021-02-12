// Store/Forms/RouteForm

import React from 'react'
import { StyleSheet, FlatList, Image, View, Button, Text, SafeAreaView, Dimensions, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'

const { width, height } = Dimensions.get('window');

class RouteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            etapes: [],
        }
    }

    ajouteEtape() {
        var array = this.state.etapes;
        var item;

        if (array.length > 0) {
            id = array[array.length - 1].id + 1;
            item = {
                "name": "etape-" + id,
                "id": id,
            };
        }
        else {
            id = 1;
            item = {
                "name": "etape-" + id,
                "id": id,
            };
        }

        array.push(item);
        this.state.etapes = array;
        this.setState({ etapes: this.state.etapes });
    }

    retireEtape(item) {
        var array = this.state.etapes.filter(function (etape) {
            return etape !== item
        });

        // Changer les id
        for (var i = 0; i < array.length; i++) {
            array[i] = {
                "name": "etape-" + i + 1,
                "id": i + 1,
            }
        }

        this.state.etapes = array;
        this.setState({ etapes: this.state.etapes });
    }

    renderEtapeSupplementaire(item) {
        var label_etape = "Etape " + item.id;
        var name_field1 = item.name + "_name";
        var name_field2 = item.name + "_address";
        return (
            <View>
                <View style={styles.etape}>
                    <Text style={styles.label}>{label_etape}</Text>
                    <TouchableOpacity
                        key={`Delete-${item.id}`}
                        onPress={() => this.retireEtape(item)}
                    >
                        <View style={styles.bouton_stat}>
                            <Image
                                style={styles.image}
                                source={require('../../Images/croix.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Nom      </Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field1}
                            textContentType="name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Adresse</Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field2}
                            textContentType="addressCity"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderFooter() {
        return (
            <View>
                {this.renderBoutonAjout()}
                {this.renderEtape("arrivee", "Arrivée")}
                <View style={styles.center}>
                    <View style={styles.valider}>
                        <Button
                            title="Valider"
                            onPress={this.props.handleSubmit}
                            color="#70B445"
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderEtapes() {
        return (
            <FlatList
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={this.renderEtape("depart", "Départ")}
                data={this.state.etapes}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => this.renderEtapeSupplementaire(item)}
                ListFooterComponent={this.renderFooter()}
            />
        )
    }

    renderEtape(name_etape, label_etape) {

        var name_field1 = name_etape + "_name";
        var name_field2 = name_etape + "_address";

        return (
            <View>
                <Text style={styles.label}>{label_etape}</Text>
                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Nom      </Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field1}
                            textContentType="name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Adresse</Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field2}
                            textContentType="addressCity"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderBoutonAjout() {
        return (
            <View style={styles.vue_bouton_ajout}>
                <TouchableOpacity
                    key={`Bouton Info`}
                    onPress={() => this.ajouteEtape()}
                >
                    <View style={styles.bouton_ajout}>
                        <Text style={styles.ajout}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderEtapes()}
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        height: 30,
        width: 30
    },
    etape: {
        flexDirection: 'row',
    },
    field: {
        flexDirection: 'row',
        marginHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field_text: {
        flex: 1,
    },
    field_text_title: {
        textAlign: 'center',
        //textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
    },
    label: {
        marginHorizontal: 24,
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#70B445',
    },
    valider: {
        width: width - 34,
        marginTop: 10,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    // Bouton ajout
    vue_bouton_ajout: {
        alignItems: 'center',
        justifyContent: 'center',
        //flex: 1,
    },
    bouton_ajout: {
        width: 40,
        height: 40,
        backgroundColor: '#70B445',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    ajout: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
    }
})

export default reduxForm({
    form: 'route',
})(RouteForm);
