const fs = require('fs');
const path = require('path')
const html = require('html')

const PORT = process.env.PORT || 5500

const distFolder = "public"
const htmlType = "text/html"

const server = http.createServer((req, res) => {
    // Build the file path
    let filePath = path.join(__dirname, distFolder, req.url === '/' ? 'index.html' : req.url)

    // Get the file extension
    let extname = path.extname(filePath)

    // Account for any file extensions you might come across
    const appTypes = [
        {".js": "text/javascript"},
        {".css": "text/css"},
        {".json": "application/json"},
        {".png": "image/png"},
        {".jpg": "image/jpg"},
        {".svg": "image/svg"}
    ]

    // By default, we're looking for text/html files
    let contentType = htmlType

    // But if the extension is something else, the contentType is assigned accordingly...
    for (let prop in appTypes) {
        if (extname === prop) {
            check = true
            contentType = appTypes[prop]
        }
    }

    //Read the file

    fs.readFile(filePath, (err, content) => {
        if (err) {
            //Account for Page Not Found
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, distFolder, "404.html", (err, content) => {
                        res.writeHead(404, {"Content-Type": htmlType})
                        res.end(content, "utf8")
                    })
                )
            } else {
                //Account for other server errors
                res.writeHead(500);
                res.end(content, "utf8")
            }

        }
    })

}).listen(PORT, () => console.log(`The Server is currently running on ${PORT}`))



