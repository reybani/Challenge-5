const bodyParser = require('body-parser');
const express = require('express');
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const PORT = 4000;

app.use(express.static('views'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const apiRouter = express.Router()
const v1 = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/v1',v1)

app.get("/", (req, res) => {
  res.render('Final-Chapter3-Rey.ejs')
})

//Register Page

app.get("/register", (req, res) => {
  res.render('register')
})

v1.post("/register"), (req, res) => {
  res.send('/register')
  const {username, password} = req.body
  const data = fs.readFileSync('data/data.json')
  const parsedData = JSON.parse(data)
  const newUser = {
    id: uuidv4(),
    username,
    password
}
parsedData.push(newUser)
fs.writeFileSync('data/data.json', JSON.stringify(parsedData, null, 2))
console.log(newUser, 'Data Created')
res.redirect('/')

}

//Login Page

app.post("/api/v1/login"), (req, res) => {
  const {username, password} = req.body
  const data = fs.readFileSync('data/data.json')
  const parsedData = JSON.parse(data)
  const userpassword = parsedData[password]
  const userusername = parsedData[username]
  if (username == userusername && userpassword == password)
  {console.log('success')
  res.redirect('/')}
  else {
    console.log('failed')
  }
}

app.listen(PORT, () => {
  console.log('server berjalan pada port:', PORT)
})
