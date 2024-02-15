const fs = require("fs");

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        const mes = fs.readFileSync('message.txt')
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
            `<body><p>${mes}</p><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`
        );
        res.write("</html>");
        return res.end();
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        return req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split("=")[1];
          fs.writeFile("message.txt", message, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
        });
      }
      if (url === "/home") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><h1>Welcome Home</h1></body>");
        res.write("</html>");
        return res.end();
      }
      if (url === "/about") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><h1>Welcome To About Us page</h1></body>");
        res.write("</html>");
        return res.end();
      }
      if (url === "/node") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><h1>Welcome To NodeJs Project</h1></body>");
        res.write("</html>");
        return res.end();
      }
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>First Page</title></head>");
      res.write("<body><h1>Hello World</h1></body>");
      res.write("</html>");
      res.end();
}

module.exports = requestHandler;
