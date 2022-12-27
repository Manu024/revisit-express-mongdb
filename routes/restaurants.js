const express = require("express");
const router = express.Router();
const database = require("../database");

let db;

const fetchAllRecords = (req, res, next) => {
  db = database.getDatabase();
  if (db) {
    db.collection("restaurants")
      .find()
      .toArray((err, result) => {
        if (err) {
          console.log("Error in fetching values");
          return;
        }
        res.locals.data = { data: result };
        next();
      });
  }
};

const fetchrestaurant = (req, res, next) => {
  db = database.getDatabase();
  // console.log(res)
  if (db) {
    const query = { restaurant_id: +req.params.restaurantid };
    const result = db.collection("restaurants").find(query).toArray();
    // db.collection("restaurants").find(query).toArray((err, result) => {
    //   if (err) {
    //     console.log("Failed to fetch " + err);
    //     return;
    //   }
    console.log(result);
      res.locals.data = { data: result };
      next();
    // });
  }
};

router.get("/fetchAll", fetchAllRecords, (req, res) => {
  console.log("fetchAllRestaurants server hit");
  res.status(200).json(res.locals.data);
});

router.get("/fetch/:restaurantid", fetchrestaurant, (req, res) => {
  console.log("fetchRestaurant server hit");
  res.status(200).json(res.locals.data);
});

module.exports = router;
