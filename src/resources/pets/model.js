const dbClient = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    dbClient
      .query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  function getAllPets(callback) {
    const getAllBookSql = `
    SELECT * FROM pets;
    `;

    dbClient
      .query(getAllBookSql)
      .then((result) => callback(result))
      .catch((error) => console.log(error));
  }

  function createOnePet(newPet, callback) {
    const { name, age, type, breed, microchip } = newPet;
    const createPetSql = `
    INSERT INTO pets (name, age, type, breed, microchip)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    dbClient
      .query(createPetSql, [name, age, type, breed, microchip])
      .then((result) => callback(result))
      .catch((error) => console.log(error));
  }

  function getPetById(id, callback) {
    const getPetByIdSql = `
    SELECT * FROM pets
    WHERE id = ${id};`;

    dbClient.query(getPetByIdSql).then((result) => callback(result)).catch
      .error;
  }

  createTable();
  // mockData();

  return { getAllPets, createOnePet, getPetById };
}

module.exports = Pet;
