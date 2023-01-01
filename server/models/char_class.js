const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");



/* type char_class {
    _id: ID!
    class_id: Int!
    class_name: String!
    description: String!
    start_body: Int!
    body_a_level: Int!
    max_body: Int!
    cost_list: Int!
    max_armor: Int!
} */

const ClassSchema = new Schema({
    class_id: {
        type: Number,
        required: true,
        unique: true
    },
    class_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    start_body: {
        type: Number,
        required: true,
    },
    body_level: {
        type: Number,
        required: true,
    },
    max_body: {
        type: Number,
        required: false,
    },
    cost_list: {
        type: Number,
        required: true,
    },
    max_armor: {
        type: Number,
        required: true,
    }
});

const CharClass = model("Classes", ClassSchema);

module.exports = CharClass;