const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt")


/* 

//type species {
    _id: ID!
    spec_id: Int!
    species: String!
    description: String!
    body_adjust: Int!
    body_per_level_adjust: Int!
    max_body: Int!
    skill_adjust: Int! <---this is more likely going to be more complicated as it will assign an adjustment to a skill based on skill_id
    origin: String!
    makeup_req: String!
} */

const SpeciesSchema = new Schema({
    spec_id: {
        type: Number,
        required: true,
        unique: true,
    },
    species: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    body_adjust: {
        type: Number,
        required: false,
    },
    body_per_level_adjust: {
        type: Number,
        required: false,
    },
    max_body: {
        type: Number,
        required: false,
    },
    skill_adjust: {
        type: String!,
        required: false,
    },
    origin: {
        type: String,
        required: true,
    },
    makeup_req: {
        type: String,
        required: false,
    }
});

const Species = model("Species", SpeciesSchema);

module.exports = Species;