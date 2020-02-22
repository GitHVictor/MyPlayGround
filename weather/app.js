const path = require("path")

const geocode = require("./geocode")

const forecast = require("./forecast")

const express = require("express")

const hbs = require("hbs")

console.log(__dirname); // path to current directory
console.log(__filename); // path to current filename location

console.log(path.join(__dirname, "./public")); // path that points to public directory

const app = express();

app.confi;

const publicDirectoryPath = path.join( __dirname, "./public");
const viewsPath = path.join( __dirname, "./templates/views"); // path that points to template(former view) directory
const partialPath = path.join (__dirname, "./templates/partials"); // path that points to template(former view) directory
/*
   Setup static directory to server
   the server know or tells the path to static folder
*/

app.use(express.static( publicDirectoryPath ));

/*
 Setup handlebars engines
 tells server the engine to use
 tell the server the name of default views folder
 */

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// route to show or call index.hbs
app.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Victor"
  }); // or  res.render('index')
});

// route to show or call about.hbs
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About Me",
    name: "Victor"
  }); // or  res.render('index')
});

// route to show or call help.hbs
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help Center",
    top_section: "Questions You May Have",
    name: "Victor"
  }); // or  res.render('index')
});

// homepage
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must send provide an address"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }= { } ) => {
    if (error) {
       return res.send({ error })       
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
         return res.send({error})
      }

      res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
       })
    })
  })
})

// everything else  ... capture an error
app.get("/help/*", (req, res) => {
  res.status(404).render("404page", {
    title: "Help 404 Page",
    errorMessage: "Help Article Not Found",
    name: "Victor"
  });
});

// everything else  ... capture an error
app.get("*", (req, res) => {
  res.status(404).render("404page", {
    title: "404 Page",
    errorMessage: "Page 404",
    name: "Victor"
  });
});

app.listen(3000, () => {
  console.log("Server is up on server 3000 ");
});
