export function formaterDistance(distance) { // A MODIFIER POUR LES KM
    let kmetres = Math.trunc(distance);
    let metres = 0;
    if (distance < 1) {
        metres = kmetres * 1000;
    }

    var new_distance = "";
    if (kmetres < 1) {
        new_distance = metres.toString() + " m";
    }
    else {
        new_distance = kmetres.toString() + " km";
    }
    return new_distance;
}

export function formaterDuree(duree) {
    let heures = Math.floor(duree / 3600);
    duree %= 3600;
    let minutes = Math.floor(duree / 60);
    let secondes = duree % 60;

    if (secondes > 30) {
        minutes++;
    }

    var new_duree = "";
    if (heures < 1) {
        new_duree = minutes.toString() + " min";
    }
    else {
        new_duree = heures.toString() + " h";

        if (minutes >= 1) {
            new_duree = new_duree + " " + minutes.toString() + " min";
        }

    }

    return new_duree;
}

/*
// Récupères les différents itinéraires résultats
function getItineraires(document) {

    var i = 0;

    document = document.map(function (itineraire) {
        // Conversion des points de l'itinéraires du JSON en LatLng
        itineraire.routes[0].geometry.coordinates = itineraire.routes[0].geometry.coordinates.map(function (coordinates) {
            var coord = {
                "latitude": coordinates[0],
                "longitude": coordinates[1],
            }
            return coord
        });

        // Ajout des identifiants pour les stations, les bornes et les connecteurs
        var j = 0;
        itineraire.waypoints = itineraire.waypoints.map(function (waypoint) {
            j++;
            var info = identification(waypoint, j);
            return info;
        });

        // Ajout d'un identifiant
        i++;
        var info_itineraire = {
            ...itineraire,
            "idRoute": i,
        }

        return info_itineraire
    });

    return document;
}

// Ajout des identifiants
function identification(element, id) {
    var info_element = element;

    if (info_element.isStation) {
        // Numéroter les bornes
        var j = 0;
        info_element.data.bornes = info_element.data.bornes.map(function (borne) {
            // Numéroter les connecteurs
            var k = 0;
            borne.connecteurs = borne.connecteurs.map(function (connecteur) {
                k++;
                var info_connecteur = {
                    "idConnecteur": k,
                    ...connecteur,
                }
                return info_connecteur;
            });

            j++;
            var info_borne = {
                "idBorne": j,
                ...borne,
            }

            return info_borne;
        });

        // Convertir la localisation en LatLng
        info_element.location = {
            "latitude": info_element.location[0],
            "longitude": info_element.location[1],
        };

        // Ajouter l'identifiant
        info_element = {
            "idStation": id,
            ...info_element,
        }
    }
    else {
        // Convertir la localisation en LatLng
        info_element.location = {
            "latitude": info_element.location[0],
            "longitude": info_element.location[1],
        };
    }

    return info_element;
}
*/