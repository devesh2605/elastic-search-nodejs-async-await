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
                appData['message'] = 'Index Created ';
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
                    "PostName": postName,
                    "PostType": postType,
                    "PostBody": postBody
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
 * Search for a document in an index
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
                        match:{
                            'PostName':searchQuery
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