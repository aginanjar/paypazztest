let { resultJson } = require('../controllers/base');
const employeeModel = require('../models/employee');

const employee = {};
response = {
    success: false,
    message: 'Successs.'
};
employee.show = (req, res, next) => {
    return employeeModel.getAll
        .then( (result) => {
            resultJson.success = true;
            resultJson.message = result.length + " data.";
            resultJson.data = result;
            res.status(200).json(resultJson);
        })
        .catch( (error) => {
            resultJson.message = error.message
            res.status(500).json(resultJson);
        });
};

employee.create = (req, res, next) => {
    let data = req.body;

    // Sanitize request input
    const validating = employeeModel.validate(data);
    
    if(!validating.pass) {
        resultJson.message = validating.message;
        resultJson.success = false;
        return res.status(401).json(resultJson);
    }

    return employeeModel
        .create(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Employee successfully created!';
            return res.status(200).json(resultJson);
        })
        .catch( (error)=>{
            if (error.constraint == 'employee_name_unique') {
                resultJson.message = 'Employee name should be unique';
                return res.status(500).json(resultJson);
            } else {
                next(error);
            }
        });
};

employee.update = (req, res, next) => {
    let data = req.body;

    return employeeModel
        .update(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Employee successfully updated!';
            resultJson.data = result;
            return res.status(200).json(resultJson);
        })
        .catch(function (error) {
            next(error);
        });
};

employee.getById = (req, res, next) => {
    let data = req.params;

    return employeeModel
        .getById(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Data found.';
            resultJson.data = result;
            return res.status(200).json(resultJson);
        })
        .catch(function (error) {
            next(error);
        });
};

employee.delete = (req, res, next) => {
    let data = req.params;

    return employeeModel
        .delete(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Data successfully deleted.';
            resultJson.data = result;
            return res.status(200).json(resultJson);
        })
        .catch(function (error) {
            next(error);
        });
};
module.exports = employee;