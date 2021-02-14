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

export function calculCouleurItinéraire(id) {
    var color = 'blue';
    switch (id) {
        case 1:
            color = 'green';
            break;
        case 2:
            color = 'mediumseagreen';
            break;
        case 3:
            color = 'teal';
            break;
        case 4:
            color = 'darkseagreen';
            break;
        case 5:
            color = 'yellowgreen';
            break;
        case 6:
            color = 'forestgreen';
            break;
        default:
            color = 'red';
    }

    return color;
}

export function formaterDureeAmpoules(duree) {
    let ans = Math.floor(duree / 365);
    duree %= 365;
    let mois = Math.floor(duree / 30);
    let jours = duree % 30;

    if (jours > 30) {
        mois++;
    }

    var message = "";

    // ANS
    if (ans > 0 && ans < 2) {
        message = message + " " + ans + " an";
    }
    else if (ans >= 2) {
        message = message + " " + ans + " ans";
    }

    // MOIS
    if (mois > 0) {
        message = message + " " + mois + " mois";
    }

    // JOURS
    if (jours > 0 && jours < 2) {
        message = message + " " + jours + " jour";
    }
    else if (jours >= 2) {
        message = message + " " + jours + " jours";
    }

    if (message != "") {
        message = message + ".";
    }

    return message;
}