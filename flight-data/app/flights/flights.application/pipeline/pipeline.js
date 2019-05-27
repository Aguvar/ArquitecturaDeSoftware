// var config = require('config');


function deferBinding() {
    let type = process.env.PIPELINE_TYPE || 'direct';
    // let type = config.get('pipeline.pipe') || 'direct';
    let implementation;
    try {
        implementation = require(`./${type}-pipeline`);
    } catch (err) {
        // Use default implementation
        implementation = require('./direct-pipeline');
    }
    return implementation;
}

module.exports = deferBinding();