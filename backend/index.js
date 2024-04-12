const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000;

// multer 는 한글파일명이 깨지지 않도록 1.4.4 버전으로 설치한다.
// npm i multer@1.4.4

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./Upload");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // basename 은 확장자포함 파일명 여기에 두번째 인자로 확장자를 넣어주면 파일명만 돌려준다.
  }
})

const upload = multer({ storage: storage })

const multerMiddleware = upload.array("files")

app.use(express.json())
app.use(multerMiddleware);

app.get("/api/filelist", async (req, res) => {
  await fs.readdir("./Upload", (err, files) => {
    res.send(files);
  })
});

app.post("/api/upload", async (req, res) => {
  // console.log(req.files[0].originalname);
  // const ext = path.extname(req.files[0].originalname); 
  // console.log(path.basename(req.files[0].originalname, ext));
  console.log(req.body.title);
  console.log(req.body.content);
  res.send("success");
});

app.delete("/api/delete", async (req, res) => {
  await fs.readdir("./Upload", (err, files) => {
    files.forEach(file => fs.unlink("./Upload/" + file, err => {
      if(err) console.log(err);
    }));
    
    res.send("success");
  })
});

app.listen(port, () => {
  console.log("server is started..");
});
