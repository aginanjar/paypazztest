
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('employee').del()
    .then(function () {
      // Inserts seed entries
      return knex('employee').insert([
        {
          full_name: "Ahmad Ginanjar",
          nik: "3211-1111-1111-1111",
          nationality: "Indonesian",
          phone: "+628777",
          address: "Jalan. Senang Raya No. 13 Bandung"
        },
        {
          full_name: "Dan Abramov",
          nik: "3221-1111-1111-1111",
          nationality: "Non-Indonesian",
          phone: "+18777",
          address: "Silicon Valley Street"
        },
        {
          full_name: "Ryan Dahl",
          nik: "3231-1111-1111-1111",
          nationality: "Non-Indonesian",
          phone: "+18787",
          address: "Nevada"
        }
      ]);
    });
};

