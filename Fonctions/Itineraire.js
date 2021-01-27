// Fonctions/Itinéraires.js

/**
 * Itinéraire.js réunit les fonctions ayant un rapport avec la récupération des différents éléments d'un itinéraire
 */

// Récupère la durée d'un itinéraire
export function getDuree(route) {
    return route.fullPath.duration;
}

// Récupère la distance d'un itinéraire
export function getDistance(route) {
    return route.fullPath.length;
}

// Récupère le depart d'un itinéraire
export function getDepart(route) {
    return route.waypoints[0]
}

// Récupère l'arrivee d'un itinéraire
export function getArrivee(route) {
    return route.waypoints[route.waypoints.length - 1];
}

// Récupère les étapes et stations d'un itinéraire
export function getStationsEtapes(route) {
    var stations_etapes = [];
    for (var i = 1; i < route.waypoints.length - 1; i++) {
        stations_etapes.push(route.waypoints[i]);
    }
    return stations_etapes;
}

// Récupères les différents itinéraires résultats
export function getItineraires(routes) {

    var i = 0;

    routes = routes.map(function (route) {
        // Conversion des points de l'itinéraires du JSON en LatLng
        if (route.fullPath.geometry.coordinates.length > 0) {
            // On vérifie que la conversion est nécessaire
            if (route.fullPath.geometry.coordinates[1] && route.fullPath.geometry.coordinates[0]) {
                route.fullPath.geometry.coordinates = route.fullPath.geometry.coordinates.map(function (coordinates) {
                    var coord = {
                        "latitude": coordinates[1] ? coordinates[1] : 0,
                        "longitude": coordinates[0] ? coordinates[0] : 0,
                    }
                    return coord
                });
            }

        }

        // Ajout des identifiants pour les stations, les bornes et les connecteurs
        var j = 0;
        if (route.waypoints.length > 0) {
            route.waypoints = route.waypoints.map(function (waypoint) {
                j++;
                if (waypoint != undefined) {
                    var info = identification(waypoint, j);
                    return info;
                }
                else {
                    return waypoint;
                }
            });
        }

        // Ajout d'un identifiant
        i++;
        if (route != undefined) {
            var info_route = {
                ...route,
                "idRoute": i,
            }
            return info_route
        }
        else {
            return route;
        }
    });

    return routes;
}

// Ajout des identifiants
function identification(element, id) {
    var info_element = element;

    if (info_element.isStation && info_element.data.bornes != undefined) {
        // Numéroter les bornes
        var j = 0;

        info_element.data.bornes = info_element.data.bornes.map(function (borne) {
            // Numéroter les connecteurs
            var k = 0;
            if (borne.connecteurs != undefined) {
                borne.connecteurs = borne.connecteurs.map(function (connecteur) {
                    k++;
                    var info_connecteur = {
                        "idConnecteur": k,
                        ...connecteur,
                    }
                    return info_connecteur;
                });
            }

            j++;
            if (borne != undefined) {
                var info_borne = {
                    "idBorne": j,
                    ...borne,
                }
                return info_borne;
            }
            else {
                return borne;
            }

        });

        // Convertir la localisation en LatLng
        if (info_element.location.length == 2) {
            if (info_element.location[0] && info_element.location[1]) {
                info_element.location = {
                    "latitude": info_element.location[1] ? info_element.location[1] : 0,
                    "longitude": info_element.location[0] ? info_element.location[0] : 0,
                };
            }
        }

        // Ajouter l'identifiant
        if (info_element != undefined) {
            info_element = {
                "idStation": id,
                ...info_element,
            }
        }
    }
    else {
        // Convertir la localisation en LatLng
        if (info_element.location.length == 2) {
            if (info_element.location[1] && info_element.location[0]) {
                info_element.location = {
                    "latitude": info_element.location[1] ? info_element.location[1] : 0,
                    "longitude": info_element.location[0] ? info_element.location[0] : 0,
                };
            }
        }
    }

    return info_element;
}