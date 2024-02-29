1. Clear instructions for how to programmatically REQUEST data from the microservice you implemented. Include an example call.

To request data from the microservice. Run another prgogram at the same time as server.js which requests a data from the JSON file.
For this example, I have the readJSON.py file which reads and prints the contents of the accounts.json file every three seconds, then closes the file. 

To accomplish this, I run the python file, then use node server.js to start the site locally. The python file will print the JSON file every 3 senconds and the
JSON will update when the user clicks create account with the necessary details entered.

2. Clear instructions for how to programmatically RECEIVE data from the microservice you implemented.

Data can be written to the JSON file by using the create account feature on the website by entering in the necessary information, then clicking creating account.
The data is then written to the JSON file and recieved in the form of the updated JSON file.




3. UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your partner (and your grader) will understand

Can be seen in the github link. 