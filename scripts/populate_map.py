import json
import os
import datetime

if os.path.exists("static/map.json"):
    with open("static/map.json", "r") as f:
        data = json.load(f)
        print(data)
else:
    data = {}

gifs = [
    f"/static/gifs/{file}"
    for file in os.listdir("static/gifs")
    if file.lower().endswith((".gif", ".webp", ".mp4"))
]
print(gifs)
data["gifs"] = gifs
data["website"] = {"version": "1.0.0","populate_at": str(datetime.datetime.now())}

# persist
with open("static/map.json", "w"
          ) as f:
    json.dump(data, f, indent=2)

print("=== \nFinal :")
print(data)