import json
import time

while 1 == 1:

    time.sleep(3) # Sleep for 3 seconds

    print("retrieving JSON data")
    f = open('accounts.json')
 
    # a dictionary
    data = json.load(f)
    
    # Iterating through the json
    # list
    for i in data:
        print(i)
 
    # Closing file
    f.close()

