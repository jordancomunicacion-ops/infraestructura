const http = require('http');
http.get('http://localhost:3000/login', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.resume();
}).on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
});
