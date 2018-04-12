module.exports = function(app) {
    
    const blog = require('../controllers/blog.controller');

    app.get('/checkConnection',blog.check);

    app.post('/createIndex',blog.createIndex);

    app.post('/addDocument',blog.addDocument);

    app.get('/searchDocumentByPostName',blog.searchDocumentByPostName);

    app.delete('/deletAllIndex',blog.deleteAllIndex);

    app.delete('/deleteADocument',blog.deleteADocument);
}