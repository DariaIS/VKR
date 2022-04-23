const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');

module.exports = function(app) {



    app.use(fileUpload());

    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }

    const base = './files/';

    app.get('/fileManager', (req, res) => {
        let path = '';

        if ('path' in req.query) {
            path = req.query.path;
        }

        if (isFolder(base + path)) {
            const ext = ['jpeg', 'png', 'jpg']
            let files = fs.readdirSync(base + path).map(item => {
                const isDir = fs.lstatSync(base + path + '/' + item).isDirectory();
                let fileInfo = fs.statSync(base + path + '/' + item);
                let encodedBuffer = '';
                if (ext.includes(item.split('.')[1])) {
                    
                    // console.log(base + path + '/' + item);
                    // console.log(process.cwd() + base.split('.')[1] + path + '/' + item);
                    // res.download(process.cwd() + base.split('.')[1] + path + '/' + item);

                    fs.readFile(process.cwd() + base.split('.')[1] + path + '/' + item, (err, image) => {
                        // console.log(image)
                        encodedBuffer = image.toString('base64');

                        // res.write(image, 'binary');
                    });
                }

                return {
                    name: item,
                    dir: isDir,
                    size: fileInfo.size,
                    birthTime: fileInfo.birthtime,
                    // encodedBuffer: encodedBuffer
                }
            })
            res.json({
                path: path,
                result: true,
                files: files
            });
        }
    });

    app.get('/getImage', (req, res) => {

        // app = express();
        // let path = req.query.path.split('/')
        // path.pop();
        // console.log(path)
        // app.use('/images', express.static(process.cwd()+ base.split('.')[1] + path));
        // let path = '';

        // if ('path' in req.query) {
        //     path = req.query.path;
        // }
        // // console.log(process.cwd() + base.split('.')[1] + req.query.path)
        res.download(process.cwd() + base.split('.')[1] + req.query.path);
    });

    app.get('/removefile', (req, res) => {
        let path = '';

        if ('path' in req.query) {
            path = req.query.path;
        }
        fs.rmSync(base + path, { recursive: true });
        console.log(path)
        res.json({
            result: true,
        });
    });

    app.post('/renamefile', (req, res) => {
        let extension = '';
        let path = req.query.path;

        if (path.includes('.'))
            extension = path.split('.').pop();
        
        let tempPath = path.split('/');
        if (tempPath.length != 2)
            tempPath.shift();
        tempPath.pop()

        let oldPath = base + path;
        let newPath;
        if (tempPath.length != 0)
            newPath = base + tempPath.join('/') + '/' + req.body.newName + (extension != '' ? '.' + extension : extension)
        else newPath = base + req.body.newName + (extension != '' ? '.' + extension : extension)
        console.log(oldPath)
        console.log(newPath)
        
        fs.rename(
            oldPath, 
            newPath,
            () =>
                res.json({
                    result: true,
                })
        );
    });

    app.post('/uploadfile', (req, res) => {
        let path = '';

        if ('path' in req.query) {
            path = req.query.path;
        }

        req.files.file.mv(base + path + '/' + req.files.file.name,
            () =>
                res.json({
                    result: true,
                })
        )
    });
}