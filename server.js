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

    if (data == "[]"){
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
app.get('/browse', function (req, res)
{
  res.status(200).render('browse', {
    browse: true,
    accounts:accountData
  })
})



//Write to accounts.json
app.post('/myAccounts/addAccount', function(req, res, next){
  if (req.body && req.body.name && req.body.ingredients && req.body.link && req.body.photoURL) {
    console.log("== Client sent the following account:");
    console.log("  - name:", req.body.name);
    console.log("  - ingredients:", req.body.ingredients);
    console.log("  - link:", req.body.link);
    console.log("  - photoURL:", req.body.photoURL);
    console.log("  - library:", "False");

    //add account here
    accountData.push({
      name: req.body.name,
      ingredients: req.body.ingredients,
      link: req.body.link,
      photoURL: req.body.photoURL,
      library: req.body.library
    })

    fs.writeFile(
      "./accounts.json",
      JSON.stringify(accountData, null,2),
      function (err) {
        if (err) {
          res.status(500).send("Error writing account to DB")
        } else {
          res.status(200).send("Account successfully added to DB")
        }
      }
    )
  } else {
    res.status(400).send("Requests to this path must contain a JSON body with all fields filled.");
  }

})



//404 Page (404)
app.get('*', function(req, res, next)
{
  res.status(404).render('404')
})

app.listen(port, function ()
{
  console.log("== Account Server is listening on port", port)
})