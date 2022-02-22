const fs = require('fs');
const path = require('path')
const html = require('html')

const PORT = process.env.PORT || 5500

const server = http.createServer((req, res) => {
    // Build the file path
    let filePath = path.join(__dirname, "public", req.url === '/' ? 'index.html' : req.url)

    // Get the file extension
    let extname = path.extname(filePat)

    // By default, we're looking for text/html files
    let contentType = "text/html"

    // Account for any file extensions you might come across
    const appTypes = [
        {".js": "text/javascript"},
        {".css": "text/css"},
        {".json": "application/json"},
        {".png": "image/png"},
        {".jpg": "image/jpg"}
        {".svg": "image/svg"}
    ]

    for (let prop in appTypes) {
        if (extname === prop) {
            contentType = appTypes[prop]
        }
    }

    //Read the file

    fs.readFile(filePath, (err, content) => {
        if (err) {
            //Account for Page Not Found

        }
    })

}).listen(PORT, () => console.log(`The Server is currently running on ${PORT}`))



