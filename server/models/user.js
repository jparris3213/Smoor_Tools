const {Schema, model} = require("mongoose");
const bcrypt = requrie("bcrypt");

/* Info from typeDefs.js file

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    access_level: Int!
    player_gob: Int!
    oop_notes: [String]
    characters: [String]
} */


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must be an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    access_level: {
        type: Number,
        required: true,
        unique: false,
        default: 1,
    },
    player_gob: {
        type: Number,
        required: false,
        unique: false,
    },
    oop_notes: [
        {
            type: String,
            trim: false,
        }
    ],
    characters: [
        {
            type: String,
            trim: true,
        }
    ]
});

UserSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//compare incoming password with hashed
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = Profile;