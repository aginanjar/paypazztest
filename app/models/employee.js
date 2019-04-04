const knex = require('../db/knex');

const Employee = () => {
    return knex('employee');
};


module.exports = {
    getAll: Employee().select().table('employee'),
    create: (input) => {
        return Employee()
            .insert({
                full_name: input.full_name,
                nik: input.nik,
                phone: input.phone,
                address: input.address,
                nationality: input.nationality
            });
        },
    update: (input) => {
        return Employee()
            .where('id', input.id)
            .update({
                full_name: input.full_name,
                nik: input.nik,
                phone: input.phone,
                address: input.address,
                nationality: input.nationality
            });
        },
    getById: (input) => {
        return Employee()
            .where('id', input.id);
        },
    delete: (input) => {
        return Employee()
            .where('id', input.id)
            .del();
    },
    validate: (data) => {
        let message = '';
        let pass = true;
        if (data.full_name == '' && data.nik == '' ) {
            message = message + 'full_name employee and nik employee should be filled or cannot be empty';
            pass = false;
        } else if (data.full_name == '') {
            message = message + 'full_name employee should be filled or cannot be empty';
            pass = false;
        } else if (data.nik == '') { 
            message = message + 'nik employee should be filled or cannot be empty';
            pass = false;
        }
        return {
            pass: pass,
            message: message
        };
    }
}
