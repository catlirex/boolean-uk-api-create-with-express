const express = require("express");
const petRouter = express.Router();

const { reqAllPets, reqPetById, addNewPet } = require("./controller");

petRouter.get("/", reqAllPets);

petRouter.get("/:id", reqPetById);

petRouter.post("/", addNewPet);

module.exports = petRouter;
