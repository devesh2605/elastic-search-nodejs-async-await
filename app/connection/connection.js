var elasticSearch = require('elasticsearch');
var elasticClient = new elasticSearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

module.exports = elasticClient;