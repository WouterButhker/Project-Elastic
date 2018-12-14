import json
import os
print("type a city name: ")
city = input()

with open(city + ".json", "r", encoding='utf8') as json_data:
    data = json.load(json_data)
    json_data.close()


features = data['features']
for feature in features:
    print((feature['properties'])['picture_folder'])


os.walk("C:/SSDocumenten/src/assets/Pictures")
locations = os.listdir("C:/SSDocumenten/src/assets/Pictures/" + city)
i = 0
print()

# loop through all items
for location in locations:

    # loop through all features
    for i, feature in enumerate(features):

        # if the name of the location matches the name of the folder
        if (feature['properties'])['picture_folder'] == location:

            # delete thumbnails to make sure they dont break the code
            if 'Thumbs.db' in os.listdir("C:/SSDocumenten/src/assets/Pictures/" + city + "/" + location):
                os.remove("C:/SSDocumenten/src/assets/Pictures/" + city + "/" + location + "/Thumbs.db")

            # set the property picture_name to all items in the correct folder
            (((data['features'])[i])['properties'])['picture_name'] = os.listdir("C:/SSDocumenten/src/assets/Pictures/" + city + "/" + location)
            print((((data['features'])[i])['properties'])['picture_name'])

        if (feature['properties'])['picture_folder'] == '':
            (((data['features'])[i])['properties'])['picture_name'] = [""]

with open(city + '.json', 'w', encoding='utf8') as f:
    json.dump(data, f, ensure_ascii=False)
