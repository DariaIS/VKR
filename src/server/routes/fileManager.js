const fs = require('fs');
const fileUpload = require('express-fileupload');

module.exports = function(app) {

    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }
    
    app.use(fileUpload());

    app.get('/fileManager', (req, res) => {
        const base = './files/';
        let path = '';

        if ('path' in req.query) {
            path = req.query.path;
        }

        if (isFolder(base + path)) {
            let files = fs.readdirSync(base + path).map(item => {
                const isDir = fs.lstatSync(base + path + '/' + item).isDirectory();
                let fileInfo = fs.statSync(base + path + '/' + item);

                return {
                    name: item,
                    dir: isDir,
                    size: fileInfo.size,
                    birthTime: fileInfo.birthtime
                }
            })
            res.json({
                path: path,
                result: true,
                files: files
            });
        }
    });

    app.get('/removefile', (req, res) => {
        const base = './files/';
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
        const base = './files/';
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
        const base = './files/';
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