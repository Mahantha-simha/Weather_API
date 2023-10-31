const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");

const app = express();
 app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("your server has stated at port 3000");
});

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    console.log(req.body.cityname);

    const cityname = req.body.cityname;
    const appkey = "b45ccd97743f43c0f2bea52bd6cfb70d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + appkey + "&units=metric";

    https.get(url, function (responce) {
        console.log(responce.statusCode);

        responce.on("data", (data) => {

            const weatherdata = JSON.parse(data);//the data is converted to json 
            const icon = weatherdata.weather[0].icon;
            const urlimg = "http://openweathermap.org/img/w/" + icon + ".png";
            const temp = weatherdata.main.temp;

            console.log(temp);


            res.write("<h1>the weather in " + cityname + " is " + weatherdata.weather[0].description + "</h1>");
            res.write("<h1>the temperature in " + cityname + " is " + temp + "</h1>");
            res.write("<img src=" + urlimg + " > ");
            res.send();
        })
    })

})


//https://api.openweathermap.org/data/2.5/weather?q=tumkur&appid=b45ccd97743f43c0f2bea52bd6cfb70d&units=metric