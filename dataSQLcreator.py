import json

# Ouvre JSON file
# UnicodeDecodeError: 'charmap' codec can't decode byte 0x9d in position 29815: character maps to <undefined>
# correction du bug -> encoding="utf-8"
f = open("data.json","r",encoding="utf-8")

data = json.load(f)

# Ferme f file
f.close()

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
                "INSERT INTO station (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES (\'" + str(j['ID']) + "\', \'" + str(i['ID']) + "\', \'" + str(j['ConnectionTypeID']) + "\', \'" + str(-1) + "\', \'" + str(-1) + "\');"
            )

print(borneData[56])

fs = open("station.sql","w",encoding="utf-8")

# Every element of the list is write on one line
for i in stationData:
    fs.write('\n%s' % i)

fs.close()

fb = open("borne.sql","w",encoding="utf-8")

for i in borneData:
    fb.write('\n%s' % i)

fb.close()