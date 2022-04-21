const fs = require('fs');

module.exports = function(app) {

    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }

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
        console.log(base + path);
        fs.rmSync(base + path, { recursive: true });
        res.json({
            result: true,
        });
    });

    app.post('/renamefile', (req, res) => {
        const base = './files/';
        let path = '';

        if ('path' in req.query) {
            path = req.query.path;
        }
        console.log(base + path);
        fs.rename(base + path, base + req.body.newName, () => {
            console.log('file renamed')
        });
        res.json({
            result: true,
        });
    });
}