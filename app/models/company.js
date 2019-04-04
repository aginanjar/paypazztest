const knex = require('../db/knex');

const Company = () => {
    return knex('company');
};


module.exports = {
    getAll: Company().select().table('company'),
    create: (input) => {
        return Company()
            .insert({
                name: input.name,
                tdp: input.tdp,
                phone: input.phone,
                address: input.address
            });
        },
    update: (input) => {
        return Company()
            .where('id', input.id)
            .update({
                name: input.name,
                tdp: input.tdp,
                phone: input.phone,
                address: input.address
            });
        },
    getById: (input) => {
        return Company()
            .where('id', input.id);
        },
    delete: (input) => {
        return Company()
            .where('id', input.id)
            .del();
    },
    validate: (data) => {
        let message = '';
        let pass = true;
        if (data.name == '' && data.tdp == '' ) {
            message = message + 'name company and tdp company should be filled or cannot be empty';
            pass = false;
        } else if (data.name == '') {
            message = message + 'name company should be filled or cannot be empty';
            pass = false;
        } else if (data.tdp == '') { 
            message = message + 'tdp company should be filled or cannot be empty';
            pass = false;
        }
        return {
            pass: pass,
            message: message
        };
    }
}
