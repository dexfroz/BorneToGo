import urllib.request as u
import json

req = u.urlopen('http://example.com/')
raw = req.read()

print(raw)

