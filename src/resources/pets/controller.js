// No need to import the Pet model just the db

const Pet = require("./model");
const { getAllPets, createOnePet, getPetById } = Pet();

const reqAllPets = (req, res) => {
  const queryContent = req.query;
  if (Object.keys(queryContent).length !== 0)
    return res.json({ Error: "DB not support Query, please retry" });

  getAllPets((result) => {
    res.json({ AllPets: result.rows });
  });
};

const reqPetById = (req, res) => {
  const queryContent = req.query;
  if (Object.keys(queryContent).length !== 0)
    return res.json({ Error: "DB not support Query, please retry" });

  const { id } = req.params;
  getPetById(id, (result) => {
    if (result.rows.length !== 0) res.json({ result: result.rows });
    else res.json({ ERROR: `Pets id:${id} not found` });
  });
};

const addNewPet = (req, res) => {
  const newPet = req.body;
  const newPetRequirement = ["name", "age", "type", "breed", "microchip"];

  const hasAllKeys = newPetRequirement.every((item) =>
    newPet.hasOwnProperty(item)
  );
  if (hasAllKeys && Object.keys(newPet).length === newPetRequirement.length)
    createOnePet(newPet, (result) => {
      res.json({ newPet: result.rows });
    });
  else
    res.json({
      ERROR: "Info incorrect, please provide exact object(see requirement)",
      newPetRequirement,
    });
};

module.exports = { reqAllPets, reqPetById, addNewPet };
