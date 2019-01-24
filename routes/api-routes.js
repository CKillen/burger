var db = require("../models");

module.exports = function(app) {

  app.get("/api/burgers", (req, res) => {
    db.Burger.findAll({}).then((dbPost) => {
      res.json(dbPost);
    });
  });

  app.post("/api/burger", (req, res) => {
    db.Burger.create({
      burger_name : req.body.name,
      devoured : false
    }).then((dbPost) => {
      res.json(dbPost);
    });
  });
  
  app.put("/api/burger/:id", (req, res) => {
    db.Burger.update({ devoured : true } , {
      where : {
        id : req.params.id
      }
    }).then((dbPost) => {
      res.json(dbPost);
    })
  });
};
