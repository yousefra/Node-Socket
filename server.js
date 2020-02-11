const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Start Server
http.listen(8080, () => console.log(`Started server at http://localhost:8080`));

app.post('/add', (req, res) => {
    addTodo(req.body);
    console.log('ToDo added: ', req.body);
    res.sendStatus(todos);
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(todos);
})
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('add todo', msg => {
        addTodo(msg);
    })
});

const todosFile = 'todos.json';
let todos = getTodos();

function getTodos() {
    let data = fs.readFileSync(todosFile);
    return JSON.parse(data);
}

function addTodo(data) {
    todos.push(data);
    data = JSON.stringify(todos);
    fs.writeFileSync(todosFile, data);
}
