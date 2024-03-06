require("dotenv").config()
const cors= require("cors")
const express= require('express')
const app = express()
app.use(express.json())
app.use(cors())
const OpenAI= require("openai");
const rateLimit = require('express-rate-limit');
const apiKey = process.env.APIKEY
const model = process.env.MODEL
const configuration = {
    apiKey:apiKey
}
const openai = new OpenAI(configuration);




app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.post("/shayri",async(req,res)=>{
    const {message} = req.body;
    const prompt = `You should act like a shayri generator and you have to generate shayri for the word - "${message}".`;
    const response = await openai.chat.completions.create({
       model:model,
       messages:[{role:'system', content: prompt}, {role:'user', content:`${message}`}]
    });
    res.json({response});
});


app.post("/joke",async(req,res)=>{
    const {message} = req.body;
    const prompt = `You should act like a joke generator and you have to generate joke for the word - "${message}".`;
    const response = await openai.chat.completions.create({
       model:model,
       messages:[{role:'system', content: prompt}, {role:'user', content:`${message}`}]
    });
    res.json({response});
});

app.post("/quotes",async(req,res)=>{
    const {message} = req.body;
    const prompt = `You should act like a quotes generator and you have to generate quotes for the word - "${message}".`;
    const response = await openai.chat.completions.create({
       model:model,
       messages:[{role:'system', content: prompt}, {role:'user', content:`${message}`}]
    });
    res.json({response});
});

app.post("/story",async(req,res)=>{
    const {message} = req.body;
    const prompt = `You should act like a story generator and you have to generate story for the word - "${message}".`;
    const response = await openai.chat.completions.create({
       model:model,
       messages:[{role:'system', content: prompt}, {role:'user', content:`${message}`}]
    });
    res.json({response});
});

app.listen(4000,()=>{
    console.log("Server running on port 4000");
})