import socket
from keras.applications.inception_v3 import InceptionV3
from keras.preprocessing import image
from keras.applications.inception_v3 import preprocess_input, decode_predictions
import numpy as np
import json

model = InceptionV3(weights='imagenet')

print("Start Predict Server")

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("localhost", 5000))
server.listen(1)

def toDict(lst):
    """ Writes prediction list into a dictionary """
    obj = {}
    for entry in lst[0]:
        obj[entry[1]] = float(entry[2])
    return obj


while True:
    conn, addr = server.accept()
    data = conn.recv(1024)
    if "Start Prediction" in data.decode():

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(('localhost', 6000))

        img_path = 'image.jpg'
        img = image.load_img(img_path, target_size=(256, 256))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        preds = model.predict(x)

        predictions = toDict(decode_predictions(preds))

        client.send(json.dumps(predictions).encode("utf-8"))
    conn.close()
