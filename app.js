const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //Require to serve static files (StyleSheets, Images, ETC..)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  console.log(firstName);
  console.log(lastName);
  console.log(email);

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  let jsonData = JSON.stringify(data);

  let options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/14d033e39c",
    method: "post",
    headers: {
      Authorization: "William 226e246f6e9d403895638ece994a2b0e-us18"
    },
    body: jsonData
  };
  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      console.log(error);
    } else if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
      console.log(response.statusCode);
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


