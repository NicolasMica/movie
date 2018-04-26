const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')

const PORT = 8000

app.use(express.json())

app.use('/api', routes)

app.use(
    express.static('dist')
)

app.get('*', (req, res) => {
    res.sendFile(
        path.resolve('.', 'dist/index.html')
    )
})

app.listen(PORT, () => {
    console.log(' ', '/'.repeat(46))
    console.log(` // Server launcher on http://localhost:${PORT} //`)
    console.log('/'.repeat(46))
})
