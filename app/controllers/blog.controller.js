const elasticClient = require('../connection/connection');

/**
* Check connection
*/
exports.check = async(req, res) => {
    
    let appData = {};
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        appData['error'] = 0;
        appData['message'] = 'Elastic search is up';
        res.status(200).json(appData);
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = 'Elastic search is down '+err.message;
        res.status(500).json(appData);
    }
};

/**
 * Create index
 */
exports.createIndex = async(req, res) => {
    
    let appData = {};
    let indexName = req.body.indexName;
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.indices.create({index: indexName});
            if(data){
                appData['error'] = 0;
                appData['message'] = 'Index Created';
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};

/**
 * Delete all index
 */
exports.deleteAnIndex = async(req, res) => {
    
    let appData = {};
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.indices.delete({index: '_all'});
            if(data){
                appData['error'] = 0;
                appData['message'] = 'All Index deleted';
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};

/**
 * Add a doucment to an index
 */
exports.addDocument = async(req, res) => {
    
    let appData = {};
    let postName = req.body.postName;
    let postType = req.body.postType;
    let postBody = req.body.postBody;
    let indexName = req.body.indexName;
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.index({
                index: indexName,
                type: 'posts',
                body: {
                    "postName": postName,
                    "postType": postType,
                    "postBody": postBody
                }
            });
            if(data){
                appData['error'] = 0;
                appData['message'] = data;
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};

/**
 * Delete a document
 */
exports.deleteADocument = async(req, res) => {
    
    let appData = {};
    let indexName = req.body.indexName;
    let id = req.body.id;
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.delete({
                index: indexName,
                type: 'posts',
                id: id,
              });
            if(data){
                appData['error'] = 0;
                appData['message'] = 'Document deleted';
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};

/**
 * Search for a document in an index by postName
 */
exports.searchDocumentByPostName = async(req, res) => {
    
    let appData = {};
    let indexName = req.query.index;
    let type = req.query.type;
    let searchQuery = req.query.searchQuery;
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.search({
                index: indexName,
                type: type,
                body:{
                    query:{
                        multi_match: {
                           'fields':  ['postName'],
                            'query':   searchQuery,
                            'fuzziness': 'AUTO'
                          }
                    }
                }
            });
            if(data){
                appData['error'] = 0;
                appData['message'] = data;
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};

/**
 * Delete all index
 */
exports.deleteAllIndex = async(req, res) => {
    
    let appData = {};
    
    try {
        let result = await elasticClient.ping({requestTimeout:30000});
        if(result){
            let data = await elasticClient.indices.delete({index: '_all'})
            if(data){
                appData['error'] = 0;
                appData['message'] = 'All Index deleted';
                res.status(200).json(appData);
            }
        }
    } catch (err) {
        appData['error'] = 1;
        appData['message'] = err.message;
        res.status(500).json(appData);
    }
};