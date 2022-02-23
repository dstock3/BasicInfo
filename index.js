const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 8080

const mainIndex = "index.html"
const distFolder = "public"
const mainType = "text/html"

http.createServer((req, res) => {
    // Build the file path
    let filePath = path.join(__dirname, distFolder, req.url === "/" ? mainIndex : req.url);

    // Get the file extension
    let extname = path.extname(filePath)

    // By default, we're looking for text/html files
    let contentType = mainType

    // But if the extension is something else, the contentType is assigned accordingly based on data in appTypes...
    switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".svg":
          contentType = "image/svg";
          break;
      }

    // Check if the contentType is text/html with no specified html file ext
    if (contentType == mainType && extname == '') {
        filePath += '.html'
    }

    //Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            //Account for Page Not Found
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, distFolder, "404.html"), (err, content) => {
                        res.writeHead(404, {"Content-Type": mainType})
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



