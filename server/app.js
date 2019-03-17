let express = require('express')
let app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/saveBeerTime', function (req, res) {
    res.send('hello world')
    console.log('kaas')
});
app.get('/', function (req, res) {
    res.send('hello world')
    console.log('kaas')
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});