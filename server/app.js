let express = require('express');
let app = express();

const mysql = require('mysql');
let connection = require('./classes/db');

app.use(express.json());
app.post('/saveBeerTime', auth('tokentextjajajaja'), function (req, res) {
    let sql = `INSERT INTO time VALUES (?, ?)`;
    let {body} = req;
    let insert = [body.userToken, body.beerTime];
    sql = mysql.format(sql, insert);
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        // console.log(fields)
    });

    res.send('hello world');
    console.log(req.body);
});

app.get('/getBeerTime', auth('tokentextjajajaja'), function (req, res) {
    connection.query('SELECT * FROM `time`', function (err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows, 'post: ', req.body);
        res.send(rows[0]);
    });
    // console.log(rows);
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