const { gql } = require("apollo-server-express");

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
}

type Auth {
    token: ID!
    profile: User
}

type access_levels {
    _id: ID!
    admin: Boolean!
    staff: Boolean!
    steer: Boolean!
    hoplot: Boolean!
    plotxo: Boolean!
    plot: Boolean!
    npc: Boolean!
    player: Boolean!
    new_user: Boolean!
}

type species {
    _id: ID!
    spec_id: Int!
    species: String!
    description: String!
    body_adjust: Int!
    body_per_level_adjust: Int!
    max_body: Int!
    skill_adjust: Int!
    origin: String!
    makeup_req: String!
}

type char_class {
    _id: ID!
    class_id: Int!
    class_name: String!
    description: String!
    start_body: Int!
    body_a_level: Int!
    max_body: Int!
    cost_list: Int!
    max_armor: Int!
}`

//need to add second half of TypeDefs as well as
// Skill Schema, Item Schema, Spell Schema