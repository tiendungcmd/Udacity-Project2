import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// GET /filteredimage?image_url={{URL}}
app.get("/filteredimage", async (req, res) => {
  let url = req.originalUrl.split("filteredimage?image_url=")[1];
  let regex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i
  if (url.match(regex)) {
    var image = await filterImageFromURL(url);
    await res.status(200).sendFile(image, err => {
      if (err) {
        res.sendStatus(500);
      }
      deleteLocalFiles(image);
    });
  } else {
    return res.status(400).send(`Invalid url`)
  }

});
// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
