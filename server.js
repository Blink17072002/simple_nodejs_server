const http = require('http')
const os = require('os')

function randomDelay(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const server = http.createServer((req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')

    if(req.method === 'GET' && req.url === '/os-info'){
        const delay = randomDelay(500, 2500)
        setTimeout(() =>{
            const info = {
                platform: os.platform(),
                arch: os.arch(),
                totalmem: os.totalmem(),
                freeMem: os.freemem()
            }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(info))
        }, delay)
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('Not Found currently')
    }
})

server.listen(5000, '127.0.0.1')
console.log('Server is running')