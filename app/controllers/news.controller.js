const db = require("../models");
const News = db.newss;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: newss } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, newss, totalPages, currentPage };
};

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title_news) {
    res.status(400).send({
      message: "Username can not be empty!"
    });
    return;
  }

  // Create a News
  const news = {
    title_news: req.body.title_news,
    media_name: req.body.media_name,
    date: req.body.date,
    content_text:req.body.content_text,
    link_image:req.body.link_image,
    created_date:req.body.created_date,
    updated_date:req.body.updated_date
  };

  // Save News in the database
  News.create(news)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    });
};

// Retrieve all Newss from the database.
exports.findAll = (req, res) => {
  const { page, size, title_news } = req.query;
  var condition = title_news ? { title_news: { [Op.like]: `%${title_news}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  News.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving newss."
      });
    });
};

// Find a single News with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id
      });
    });
};

// Update a News by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  News.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating News with id=" + id
      });
    });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete News with id=" + id
      });
    });
};

// Delete all Newss from the database.
exports.deleteAll = (req, res) => {
  News.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Newss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all newss."
      });
    });
};

// find all published News
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  News.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving newss."
      });
    });
};
