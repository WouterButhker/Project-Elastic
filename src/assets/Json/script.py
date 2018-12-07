import json, os
print("Type a city")
city = input()

with open(city + ".json") as json_data:
    data = json.load(json_data)
    json_data.close()


features = data['features']
for feature in features:
    print((feature['properties'])['picture_folder'])


os.walk("C:/SSDocumenten/src/assets/Pictures")
locations = os.listdir("C:/SSDocumenten/src/assets/Pictures/" + city)
i = 0
print()
for location in locations:

    for i, feature in enumerate(features):
        if (feature['properties'])['picture_folder'] == location:

            (((data['features'])[i])['properties'])['picture_name'] = os.listdir("C:/SSDocumenten/src/assets/Pictures/" + city + "/" + location)
            print((((data['features'])[i])['properties'])['picture_name'])

with open(city + '.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False)
