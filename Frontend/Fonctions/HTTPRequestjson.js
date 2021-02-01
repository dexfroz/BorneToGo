// Fonctions pour écriture des JSON des requêtes HTTP

/** setJsonInputBackend permet de créer un fichier d'input pour le backend
 * 
 * @param {string} useCase nom du use case : "trip", "goto", "refill"
 * @param {string} optimOption type d'optimisation demandée par l'utilisateur : "fastest", "chespeast"
 * @param {Objet car} car un objet voiture est composé de : model (string), subscription (string), batteryType (string), maxAutonomy (number), currentAutonomy (number), maxWattage (number) et des connectors (array)
 * @param {Objet userSteps} userSteps tableau de tous les points par lequel l'utilisateur veut passer : départ, arrivée, étapes pour trip et goto ou seulement départ pour refill
 */
export function setJsonInputBackend(useCase, optimOption, car, userSteps) {
    // Ecriture du fichier json pour la requête post HTTP
    var json = {
        "type": "input",
        "convention": "long-lat",
        "useCase": useCase,
        "optimOption": optimOption,
        "car": car,
        "userSteps": userSteps,
    }
    return json;
}
