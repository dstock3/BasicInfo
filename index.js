const fs = require('fs');
const path = require('path');
const http = require('http');
const appTypes = require('./appTypes.js')

const PORT = process.env.PORT || 8080

http.createServer((req, res) => {
    // Build the file path
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

    // Get the file extension
    let extname = path.extname(filePath)

    // By default, we're looking for text/html files
    let contentType = "text/html"

    // But if the extension is something else, the contentType is assigned accordingly based on data in appTypes...
    for (let prop in appTypes) {
        if (extname === prop) {
            contentType = appTypes[prop]
        }
    }

    // Check if the contentType is text/html with no specified html file ext
    if (contentType == "text/html" && extname == '') {
        filePath += '.html'
    }

    console.log(filePath);

    //Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            //Account for Page Not Found
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"), (err, content) => {
                        res.writeHead(404, {"Content-Type": "text/html"})
                        res.end(content, "utf8")
                    }) 
            } else {
                //Account for other server errors
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            //If there are no errors, delivery the content
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf8")
        }
    })
}).listen(PORT, () => console.log(`The Server is currently running on ${PORT}.`))



