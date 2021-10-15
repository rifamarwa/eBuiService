const { sequelize } = require("../models");
const db = require("../models");
const Twitter = db.twitters;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: twitters } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, twitters, totalPages, currentPage };
};

// Create and Save a new Twitter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Username can not be empty!"
    });
    return;
  }

  // Create a Twitter
  const twitter = {
    username: req.body.username,
    name: req.body.name,
    profil_image: req.body.profil_image,
    date:req.body.date,
    text:req.body.text,
    image:req.body.image
    //published: req.body.published ? req.body.published : false
  };

  // Save Twitter in the database
  Twitter.create(twitter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Twitter."
      });
    });
};

// Retrieve all Twitters from the database.
exports.findAll = (req, res) => {
  const { page, size, username } = req.query;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Twitter.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving twitters."
      });
    });
};



// Find a single Twitter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Twitter.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Twitter with id=" + id
      });
    });
};

// Update a Twitter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Twitter.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Twitter was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Twitter with id=${id}. Maybe Twitter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Twitter with id=" + id
      });
    });
};

// Delete a Twitter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Twitter.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Twitter was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Twitter with id=${id}. Maybe Twitter was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Twitter with id=" + id
      });
    });
};

// Delete all Twitters from the database.
exports.deleteAll = (req, res) => {
  Twitter.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Twitters were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all twitters."
      });
    });
};

// find all published Twitter
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Twitter.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving twitters."
      });
    });
};
