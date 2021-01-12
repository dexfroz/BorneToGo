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
            "INSERT INTO station (IDStation, Latitude, Longitude, Adresse, Payement, Horaire) VALUES (\'" + str(i['ID']) + "\', \'" + str(i['AddressInfo']['Latitude']) + "\', \'" + str(i['AddressInfo']['Longitude']) + "\', \'" + str(i['AddressInfo']['AddressLine1']) + "\', \'" + str(i['UsageTypeID']) + "\', \'24/7\');"
        )
    except:
        stationData.append(
            "INSERT INTO station (IDStation, Latitude, Longitude, Adresse, Payement, Horaire) VALUES (\'" + str(i['ID']) + "\', \'" + str(i['AddressInfo']['Latitude']) + "\', \'" + str(i['AddressInfo']['Longitude']) + "\', \'" + str(i['AddressInfo']['AddressLine1']) + "\', \'" + str(-1) + "\', \'24/7\');"
        )

print(stationData)

fs = open("station.sql","w",encoding="utf-8")

# Every element of the list is write on one line
for i in stationData:
    fs.write('\n%s' % i)

fs.close()