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
     const {message, count = 4} = req.body;
     const prompt = `You should act like a shayri generator and you have to generate ${count} shayri(s) for the word - "${message}".`;
     const response = await openai.chat.completions.create({
        model:model,
        messages:[{role:'system', content: prompt}, {role:'user', content:`${message}`}]
     });
     const shayris = [];
        for (let i = 0; i < count; i++) {
            if (response.choices[i]) {
                shayris.push(response.choices[i].message.content);
            } else {
                break; 
            }
        }
     res.json({shayris})
});

app.listen(4000,()=>{
    console.log("Server running on port 4000");
})