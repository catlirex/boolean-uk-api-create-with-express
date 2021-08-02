// No need to import the Pet model just the db

const Pet = require("./model");
const { getAllPets, createOnePet, getPetById } = Pet();

const reqAllPets = (req, res) => {
  getAllPets((result) => {
    res.json({ AllPets: result.rows });
  });
};

const reqPetById = (req, res) => {
  const { id } = req.params;
  getPetById(id, (result) => {
    res.json({ result: result.rows });
  });
};

const addNewPet = (req, res) => {
  const newPet = req.body;
  console.log(newPet);
  createOnePet(newPet, (result) => {
    res.json({ newPet: result.rows });
  });
};

module.exports = { reqAllPets, reqPetById, addNewPet };
