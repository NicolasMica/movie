const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())

app.use('/api', routes)

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(
        path.resolve('.', 'dist/index.html')
    )
})

app.listen(8000)
