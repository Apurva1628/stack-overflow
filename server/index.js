import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'  // cors(cross origin request blocked) => when two servers like 3000 & 5000 are communicating to each other(i.e if server 3000 sends a request to server 5000 then it'll throw an error called cors)
import dotenv from 'dotenv'
import answerRoutes from './routes/Answers.js'
import userRoutes from './routes/users.js' 
import questionRoutes from './routes/Questions.js'
import commentRoutes from './routes/Comments.js'
//import { addComment } from './controllers/Comments.js'

//var bodyParser=require("body-parser");

const app = express();
dotenv.config();
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors());
//app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

// for comment
app.use('/comment', commentRoutes)


const PORT = process.env.PORT || 5000

const DATABASE_URL = process.env.CONNECTION_URL
mongoose.connect( DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))  