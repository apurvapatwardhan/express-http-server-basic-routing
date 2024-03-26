import express from "express";
import fs from "fs"
import path from "path";

const app = express();

app.get("/files", (req, res) => {
    const files = getFiles("./files"); ; // gives an array with names of all file and folders in directory
    console.log(files);
    if(files.length == 0) {
        res.sendStatus(404)
    }
    res.json({
        status: "SUCCESS",
        files
    })
})

app.get("/files/:fileName/:ext", (req, res) => {
    const params = req.params;
    const files = getFiles("./files"); // gives an array with names of all file and folders in directory
    if(files.length == 0) {
        return res.status(404).send("File Not Found");
    }
    const fName = params.fileName+"."+params.ext;
    if(!files.includes(fName)) {
        return res.status(404).send("File Not Found");
    }
    fs.readFile(path.join("./files", fName), 'utf-8', (err, fileContent) => {
        if(err) {
            res.sendStatus(500);
        }
        res.json({
            status: "SUCCESS",
            fileContent
        })
    })
})

function getFiles(fp) {
    const files = fs.readdirSync(fp);
    return files;
}

app.listen(3000)