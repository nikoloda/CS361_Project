//Server code

var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')

var accountData = require('./accounts.json')

var app = express()




app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000

app.use(express.static('static'))
app.use(express.json())


var loggedIn = 0

var loggedAccount

//Root Page (Handlebar: indexPage)
app.get('', function (req, res)
{
  res.status(200).render('indexPage')
})
//Index Page (Handlebar: indexPage)
app.get('/index', function (req, res)
{
  res.status(200).render('indexPage')
})

//MyAccounts Page (Handlebar: browse)
app.get('/myAccounts', function (req, res)
{
  console.log(accountData)
  fs.readFile('./accounts.json', 'utf8', function(err, data){
    // Display the file content
    console.log(data);

    if (loggedIn == 0){
      res.status(200).render('addAccount', {
        browse: true,
        accounts:accountData
      })
    }
      else{
        res.status(200).render('browse')
      }
    
})

})

//Add on myaccounts
app.get('/myAccounts/newAccount', function (req, res)

{
  res.status(200).render('addAccount')
})

//Browse Page (Handlebar: browse)
app.get('/browse', function (req, res) {
  if (loggedIn === 1) {

    const filePath = path.join(__dirname, '..', 'CodingWebsite-main', 'PostNumData.json');
    const postNumData = require(filePath);
    
    console.log(postNumData);

    var searchField = "library";
    var searchVal = loggedAccount;
    var outPutField = "postNum";
    var results = null; // Initialize results variable

    console.log("searchVal", searchVal)

    for (var i = 0; i < postNumData.length; i++) {
      console.log("postNumData[i][searchField] == ")
      if (postNumData[i][searchField] === searchVal) {
        results = postNumData[i][outPutField];
        break; // Exit loop once found
      }
    }
    res.status(200).render('browse', {
      browse: true,
      accounts: accountData,
      postNum: results, // Use the found value
      user: searchVal // Correct variable name
    });
  } else {
    res.status(200).render('indexPage');
  }
});



// Function to write accountData to file
function writeAccountDataToFile(accountData, res) {
  fs.writeFile(
    "./accounts.json",
    JSON.stringify(accountData, null, 2),
    function (err) {
      if (err) {
        console.error('Error writing account to DB:', err);
        res.status(500).send("Error writing account to DB");
      } else {
        console.log('Account data updated successfully.');
        res.status(200).send("Account data updated successfully.");
      }
    }
  );
}

function updateLibraryForUser(userName) {
  fs.readFile('./accounts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let accountData;
    try {
      accountData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    // Find the user's account
    const userAccount = accountData.find(account => account.name === userName);

    if (userAccount) {
      // Update the library property for the user's account
      userAccount.library = userName;

      // Write updated account data back to file
      fs.writeFile(
        "./accounts.json",
        JSON.stringify(accountData, null, 2),
        function (err) {
          if (err) {
            console.error('Error writing account data to accounts.json:', err);
          } else {
            console.log('Library updated for user:', userName);
          }
        }
      );
    } else {
      console.log('User account not found:', userName);
    }
  });
}

function appendLoginInfoToFile(userName) {
  fs.readFile('./logged.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let loggedData;
    try {
      loggedData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    // Add new login information
    loggedData.push({ library: userName });

    // Write updated login information back to file
    fs.writeFile(
      "./logged.json",
      JSON.stringify(loggedData, null, 2),
      function (err) {
        if (err) {
          console.error('Error writing login info to logged.json:', err);
        } else {
          console.log('Login info appended to logged.json successfully.');
        }
      }
    );
  });
}

// Write to accounts.json
app.post('/myAccounts/addAccount', function(req, res, next) {
  if (req.body && req.body.name && req.body.ingredients && req.body.link && req.body.photoURL && (req.body.photoURL == req.body.link)) {
    console.log("== Client sent the following account:");
    console.log("  - name:", req.body.name);
    console.log("  - ingredients:", req.body.ingredients);
    console.log("  - link:", req.body.link);
    console.log("  - photoURL:", req.body.photoURL);
    console.log("  - library:", "False");

    loggedIn = 1;

    const accountExists = accountData.find(account => 
      account.name === req.body.name && 
      account.ingredients.every(ingredient => req.body.ingredients.includes(ingredient)) && 
      account.link === req.body.link && 
      account.photoURL === req.body.photoURL &&
      account.library === req.body.library
    );

    console.log("Request Body:", req.body);
    console.log("Account Exists:", accountExists);

    if (typeof accountExists !== 'undefined') {
      console.log("Product already exists");
      loggedAccount = req.body.name;
      loggedIn = 1;
      updateLibraryForUser(req.body.name)


    } else {
      console.log("Product not found");
      accountData.push({
        name: req.body.name,
        ingredients: req.body.ingredients,
        link: req.body.link,
        photoURL: req.body.photoURL,
        library: req.body.name 
      });

      writeAccountDataToFile(accountData, res);
    }
    
    appendLoginInfoToFile(req.body.name);

    res.render('browse')
  } else {
    res.status(400).send("Requests to this path must contain a JSON body with all fields filled.");
  }
});

// Logout
app.get('/logout', function (req, res) {
  if (loggedIn == 1) {
    loggedIn = 0;
    loggedAccount = "";

    // Reset the library key to an empty string for each entry
    accountData.forEach(account => {
      account.library = "";
    });
    // Write accountData to file
    writeAccountDataToFile(accountData, res);
  }
  res.render('indexPage')
});


//404 Page (404)
app.get('*', function(req, res, next)
{
  res.status(404).render('404')
})

app.listen(port, function ()
{
  console.log("== Account Server is listening on port", port)
})