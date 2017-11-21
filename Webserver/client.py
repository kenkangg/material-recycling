import requests
import base64

image = open('another.jpg', 'rb')

encoded = base64.encodestring(image.read())
# print(encoded)

url = "http://f7bf5edb.ngrok.io"

r = requests.post(url, data={"image": encoded})
print(r.status_code, r.reason)
