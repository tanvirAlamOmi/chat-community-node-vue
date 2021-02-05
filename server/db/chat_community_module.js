const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    chat: Joi.string().max(500).required(),
    imageUrl: Joi.string()

})

const chats = db.get('chats');

function getAllChats(){
    return chats.find();
}

function createChats(chat) {
    if(chat.username == '')
        chat.username = "Anonymus";

    if(chat.imageUrl == '')
        chat.imageUrl = "https://i.giphy.com/media/THmM8aPSwWjPGUP8wi/giphy.webp";

    const result = schema.validate(chat);

    if(result.error != null)
        return Promise.reject(result.error);

    chat.created = new Date();
    return chats.insert(chat);
}

module.exports = {
    getAllChats, createChats
};