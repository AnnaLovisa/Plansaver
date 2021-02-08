const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const passport = require('passport');

const listItemRouter = require('./routes/listitem-router')
const userRouter = require('./routes/user-router')
const noteRouter = require('./routes/note-router')
const projectRouter = require('./routes/project-router')
const listRouter = require('./routes/list-router')

const app = express()
const apiPort = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

const db = require('./db')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
app.use('/api/users', userRouter)
app.use('/api/listitems', listItemRouter)
app.use('/api/notes', noteRouter)
app.use('/api/projects', projectRouter)
app.use('/api/lists', listRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))