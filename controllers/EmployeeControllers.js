const { response } = require("express");
const Employee = require("../models/Employee");
const { error } = require("console");

//shows the list of employee
const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({ message: "An error Occured: " + error });
      });
  } else {
    Employee.find()
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({ message: "An error Occured: " + error });
      });
  }

  // Employee.find()
  //   .then((response) => {
  //     res.json({
  //       response,
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({
  //       message: "An error occured!",
  //     });
  //   });
};
//for single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

//store employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.file) {
    employee.avatar = req.file.path;
  }
  employee
    .save()
    .then((response) => {
      res.json({
        message: "Employee Saved Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured while saving employee",
      });
    });
};

//update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updateData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };
  Employee.findByIdAndUpdate(employeeID, { $set: updateData })
    .then(() => {
      res.json({
        message: "Employee Updated Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured when updating data!",
      });
    });
};

//delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;

  Employee.findOneAndDelete(employeeID)
    .then(() => {
      res.json({
        message: "Employee deleted sucessfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured when deleting employee!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
