import json

def loadJSONfromFile(filename):
    # Ouvre JSON file
    # UnicodeDecodeError: 'charmap' codec can't decode byte 0x9d in position 29815: character maps to <undefined>
    # correction du bug -> encoding="utf-8"
    f = open(filename,"r",encoding="utf-8")

    data = json.load(f)

    # Ferme f file
    f.close()

    return data

"""
# Initialisation des listes pour stocker les elements INSERT INTO
stationData = list()
borneData = list()

for i in data:
    # Un i['UsageTypeID'] bug, donc on le passe
    try:
        stationData.append(
            "INSERT INTO station (IDStation, Latitude, Longitude, Adresse, Payement) VALUES (\'" + str(i['ID']) + "\', \'" + str(i['AddressInfo']['Latitude']) + "\', \'" + str(i['AddressInfo']['Longitude']) + "\', \'" + str(i['AddressInfo']['AddressLine1']) + "\', \'" + str(i['UsageTypeID']) + "\');"
        )
    except:
        print("ERROR Station")
        stationData.append(
            "INSERT INTO station (IDStation, Latitude, Longitude, Adresse, Payement) VALUES (\'" + str(i['ID']) + "\', \'" + str(i['AddressInfo']['Latitude']) + "\', \'" + str(i['AddressInfo']['Longitude']) + "\', \'" + str(i['AddressInfo']['AddressLine1']) + "\', \'" + str(-1) + "\');"
        )

for i in data:
    for j in i['Connections']:
        try:
            borneData.append(
                "INSERT INTO station (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES (\'" + str(j['ID']) + "\', \'" + str(i['ID']) + "\', \'" + str(j['ConnectionTypeID']) + "\', \'" + str(j['PowerKW']) + "\', \'" + str(j['StatusTypeID']) + "\');"
            )
        except:
            print("ERROR Borne")
            borneData.append(
                "INSERT INTO borne (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES (\'" + str(j['ID']) + "\', \'" + str(i['ID']) + "\', \'" + str(j['ConnectionTypeID']) + "\', \'" + str(-1) + "\', \'" + str(-1) + "\');"
            )
"""

def INSERT_INTO_SQLCreator_station(data):
    # Initialisation de la liste pour stocker les elements INSERT INTO
    SQLlistRequete = list()
    listID = list()

    for i in data:
        
        if i['ID'] not in listID:
            listID.append(i['ID'])

            IDStation = str(i['ID'])
            Latitude = str(i['AddressInfo']['Latitude'])
            Longitude = str(i['AddressInfo']['Longitude'])
            Adresse = correctionString(str(i['AddressInfo']['AddressLine1']))

            try:
                Ville = correctionString(str(i['AddressInfo']['Town']))
            except:
                Ville = "-1"
            
            try:
                Code_Postal = str(i['AddressInfo']['Postcode'])
            except:
                Code_Postal = "-1"

            Titre = correctionString(str(i['AddressInfo']['Title']))

            try:
                Paiement = str(i['UsageTypeID'])
            except:
                Paiement = "-1"
            
            requete = "INSERT INTO Station (idStation, Latitude, Longitude, Adresse, Ville, CodePostal, Titre, Paiement) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}');"

            SQLlistRequete.append(
                requete.format(IDStation,Latitude,Longitude,Adresse,Ville,Code_Postal,Titre,Paiement)
            )

    return SQLlistRequete

def createSQLFilefromlist(data,filename):
    fs = open(filename,"w",encoding="utf-8")

    # Every element of the list is write on one line
    for i in data:
        fs.write('\n%s' % i)

    fs.close()

def correctionString(texte):
    return texte.replace("'","\\'")

createSQLFilefromlist(INSERT_INTO_SQLCreator_station(loadJSONfromFile("dataStationBorne.json")),"station.sql")