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

def INSERT_INTO_SQLCreator_borne(data):
    SQLlistRequete = list()
    listID = list()

    for i in data:
        for j in i['Connections']:
            if j['ID'] not in listID:
                listID.append(j['ID'])

                IDBorne = str(j['ID'])
                IDStation = str(i['ID'])
                IDConnecteur = str(j['ConnectionTypeID'])

                try:
                    Puissance = str(j['PowerKW'])
                except:
                    Puissance = "-1"

                try:
                    Status = str(j['StatusTypeID'])
                except:
                    Status = "-1"

                requete = "INSERT INTO BorneToGo.Borne (idBorne, idStation, idConnecteur, Puissance, Status) VALUES ('{}','{}','{}','{}','{}');"

                SQLlistRequete.append(
                    requete.format(IDBorne, IDStation, IDConnecteur, Puissance, Status)
                )

    return SQLlistRequete

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
            
            requete = "INSERT INTO BorneToGo.Station (idStation, Latitude, Longitude, Adresse, Ville, CodePostal, Titre, Paiement) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}');"

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

createSQLFilefromlist(INSERT_INTO_SQLCreator_borne(loadJSONfromFile("dataStationBorne.json")),"borne.sql")
createSQLFilefromlist(INSERT_INTO_SQLCreator_station(loadJSONfromFile("dataStationBorne.json")),"station.sql")

print("fini")