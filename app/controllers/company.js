let { resultJson } = require('../controllers/base');
const companyModel = require('../models/company');

const company = {};
response = {
    success: false,
    message: 'Successs.'
};
company.show = (req, res, next) => {
    return companyModel.getAll
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

company.create = (req, res, next) => {
    let data = req.body;

    // Sanitize request input
    const validating = companyModel.validate(data);
    
    if(!validating.pass) {
        resultJson.message = validating.message;
        resultJson.success = false;
        return res.status(401).json(resultJson);
    }

    return companyModel
        .create(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Company successfully created!';
            return res.status(200).json(resultJson);
        })
        .catch( (error)=>{
            if (error.constraint == 'company_name_unique') {
                resultJson.message = 'Company name should be unique';
                return res.status(500).json(resultJson);
            } else {
                next(error);
            }
        });
};

company.update = (req, res, next) => {
    let data = req.body;

    return companyModel
        .update(data)
        .then((result) => {
            resultJson.success = true;
            resultJson.message = 'Company successfully updated!';
            resultJson.data = result;
            return res.status(200).json(resultJson);
        })
        .catch(function (error) {
            next(error);
        });
};

company.getById = (req, res, next) => {
    let data = req.params;

    return companyModel
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

company.delete = (req, res, next) => {
    let data = req.params;

    return companyModel
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
module.exports = company;