let socket = io.connect('http://localhost:8080');
console.log(socket);

document.getElementById('add').addEventListener("click", e => {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    
    socket.emit('add todo', { title, desc });
    
    title.value = '';
    desc.value = '';
    e.preventDefault()
});