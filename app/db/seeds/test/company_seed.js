
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('company').del()
    .then(function () {
      // Inserts seed entries
      return knex('company').insert([
        {
          name: "PT. Maju Makmur", 
          tdp: "0001-1111-1111-1111", 
          phone: "+628777", 
          address: "Jalan. Senang Raya No. 13 Bandung"
        },
        {
          name: "PT. Teknologi Jaya Sentosa",
          tdp: "0001-1111-1111-1112",
          phone: "+628779",
          address: "Jalan. Mulya No. 66 Jakarta"
        },
        {
          name: "PT. Agri Rahmat Ilahi",
          tdp: "0001-1111-1111-1113",
          phone: "+628775",
          address: "Jalan. Besar No. 2 Tasikmalaya"
        }
      ]);
    });
};
