var path = require('path');
module.exports = {
    api : 'http://127.0.0.1:5000/api',
    //final computed value of runtime_dir should be absolute path
    runtime_dir : path.join(__dirname, 'runtime')
};