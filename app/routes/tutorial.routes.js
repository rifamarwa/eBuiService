module.exports = app => {
    // const tutorials = require("../controllers/twitter.controller.js");
    const newsController = require('../controllers/news.controller');
    const employeeController = require('../controllers/employee.controller');
    const twitterController = require('../controllers/twitter.controller');
  
    const router = require("express").Router();
  
    // Create a new Data
    router.post("/news", newsController.create);
    router.post("/employee", employeeController.create);
    router.post("/twitter", twitterController.create);
  
    // Retrieve all Tutorials
    //router.get("/", tutorials.findAll);
    router.get("/news", newsController.findAll);
    router.get("/employee", employeeController.findAll);
    router.get("/twitter", twitterController.findAll);

    
  
    // Retrieve all published Tutorials
    router.get("/news/published", newsController.findAllPublished);
    router.get("/employee/published", employeeController.findAllPublished);
    router.get("/twitter/published", twitterController.findAllPublished);

    // Create a new Data
    // router.delete("/", tutorials.deleteAll);
    // router.delete("/news", newsController.deleteAll);
    // router.delete("/employee", employeeController.deleteAll);
    // router.delete("/twitter", twitterController.deleteAll);
  
    // Retrieve a single Data with id
    // router.get("/:id", tutorials.findOne);
    router.get("/news/:id", newsController.findOne);
    router.get("/employee/:id", employeeController.findOne);
    router.get("/twitter/:id", twitterController.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    router.put("/news/:id", newsController.update);
    router.put("/employee/:id", employeeController.update);
    router.put("/twitter/:id", twitterController.update);
  
    // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
    router.delete("/news/:id", newsController.delete);
    router.delete("/employee/:id", employeeController.delete);
    router.delete("/twitter/:id", twitterController.delete);
    
  
   app.use('/api/v2', router);
  };
  
  //module.exports = router;

//   router.get("/twitter", twitterController.findAllSorting);
//     router.get("/twitter", twitterController.findAllSortingRaw);
  