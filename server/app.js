let express = require('express');
let app = express();

let connection = require('./classes/db');


app.use(express.json());
app.post('/saveBeerTime', auth('tokentextjajajaja'), function (req, res) {
    connection.query('SELECT * FROM `time`', function (err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: ', rows, 'post: ' , req.body)
    });

    res.send('hello world');
    console.log(req.body)
});


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

function auth(userToken) {
    return function (req, res, next) {
        if (true) {
            next();
        } else {
            res.status(403).json("NOT AUTHORIZED")
        }
    }
}