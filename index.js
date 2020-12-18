const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Users } = require("./sequelize");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  let lat = +req.query.lat;
  let long = +req.query.long;
  let radius = +req.query.radius;

  let allUsers = await Users.findAll({
    attributes: ["user_id", "name", "lat", "long"],
    raw: true,
  });

  let result = [];
  allUsers.forEach((user) => {
    user.distance = distance(lat, long, user.lat, user.long);
    if (user.distance < radius) {
      result.push(user);
    }
  });

  console.log(result);

  let n = result.length;
  for (let i = 1; i < n; i++) {
    let current = result[i];
    let j = i - 1;
    while (j > -1 && current.distance < result[j].distance) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }

  console.log(result);
  res.json(result);
});

let distance = (lat1, lon1, lat2, lon2) => {
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 0.8684; //mutiply with 0.8684 for Nautical Miles and 1.609344 for Kilometers
  return dist;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
