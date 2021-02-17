import express from "express";
import fileUpload from "express-fileupload";
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve("./");

const app = express();

app.use(cors());
app.use(fileUpload());


//Upload endpoint

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/files/uploads/${file.name}`, err => {
    if (err) { 
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `http://192.168.0.195:8080/${file.name}` });
  }, )
});

app.get('/test', (req, res) => { 
  console.log("./ : ", path.resolve("./"));
  return res.status(200).json({msg: 'it\'s working'});
})

app.listen(5000, () => console.log("server started at the port 5000"));
