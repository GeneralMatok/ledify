var Datastore = require('nedb')
    , db = new Datastore({ filename: 'ledifyDB' });
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});

var insertData = function (isVal) {
    var doc = {
        valu: isVal, n: 5
        , today: new Date()
        , nedbIsAwesome: true
        , notthere: null
        , notToBeSaved: undefined  // Will not be saved
        , fruits: ['apple', 'orange', 'pear']
        , infos: { name: 'nedb' }
    };

    db.insert(doc, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });
}

insertData("test");

var getEntries = async function () {
    return new Promise(async (resolve) => {
        // Find all documents in the collection
        db.find({}, function (err, docs) {
            resolve(docs.length);
        });

    });
}


module.exports = {
    insertData: insertData,
    getEntries: getEntries
}