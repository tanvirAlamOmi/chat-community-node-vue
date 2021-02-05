const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chatsModule = require('./db/chat_community_module');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.json({
        msg: 'some message! '
    });
});

const port = process.env.PORT || 3333;
app.listen(port, () =>{
    console.log(`listening on ${port}`);
});

app.get('/chats', (req,res)=>{
    chatsModule.getAllChats().then( chats =>{
        res.json(chats);
    })
})


app.post('/chats', (req,res)=>{
    chatsModule.createChats(req.body).then( chat =>{
        res.json(chat);
    }).catch(error =>{
        res.status(500);
        res.json(error);
    })
})