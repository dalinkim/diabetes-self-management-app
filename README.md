# diabetes-self-management-app

<b>MongoDB-for-Diabetes-Self-Management-App</b><br>
Modifying the server code of the diabetes self management app so that it uses a MongoDB database to store its data. Also the front end code is updated so that it works correctly with the modified server.<br>

MongoDB Basics<br>
MongoDB is a document database. (record = document or object)<br>
A document is a data structure composed of field and value pairs.<br>
Compared to a JSON object, a MongoDB document has support not only for the primitive data types boolean, numbers, and strings, but also other common data types such as dates, timestamps, regular expressions, and binary data.<br>

Collections<br>
Collections is like a table in a relational database. It is a set of documents, and you access each document via the collection. Primary key is mandated in MongoDB with the reserved field name _id.
Unlike a relational database, MongoDB does not require you to define a schema for a collection but just a unique _id. Actual documents may have completely different fields.<br>

Query Languages<br>
Unlike SQL, MongoDB query language is made up of methods to achieve various operations.
Unlike relational databases, no method that can operate on multiple collections at once. If needed, each collection has to be queried separately and manipulated by the client.<br>
Unlike relational databases, MongoDB encourages denormalization - storing related parts of a document as embedded subdocuments rather than as separate collections (tables) in a relational database.<br>

The Mongo Shell<br>
db; use 'db name'; show databases; show collections;<br>
db.employees.insert({...}); db.employees.find().pretty();<br>
supplying filter .find({ filter })<br>
restrict returned fields with second parameter .find({ filter }, { restriction })<br>
update a document .update({ filter }, {$set: { fields to update }})<br>
.remove({ filter })<br>

Shell Scripting<br>
mongo shell script is a regular JS program, with all the collection methods available as built-ins. One difference from interactive shell is that you don't have the convenience commands such as use and the default global variable db. You must initialize them within the shell script programmatcially.<br>

Schema Initialization<br>
No such thing as schema initialization but just create indexes that will prove useful for often used filters in the application.<br>

MongoDB Node.js Driver<br>
This is the Node.js driver that lets you connect and interact with the MongoDB server. (mongodb module from npm) To connect to the database from a Node.js program, use the connect method on the MongoClient object provided by the module.<br>
Use connect(URL-like string parameter, callback) to connect<br>
collection() to get a handle to any collection<br>
find() returns a cursor which you could iterate over
toArray() on the cursur runs through all the documents and make an array out of them. It calls the callback when the array is ready to be processed, passing the array as a parameter to the callback.<br>
ALl calls to the driver are asynchronous calls - you don't get the result of the call as a return value to the function call.<br>
Different paradigms for dealing with this asynchronous natutre: callbacks, promises, or co module and generator functions. (also async module)<br>

Reading from MongoDB<br>
Include the MongoDB driver in the server.js and connect to MongoDB server.<br>
Express server is started once we get the connection to MongoDB.
Endpoint handler is modified to read from the database. Front end is updated with the MongoDB _id field and now handles possible non-successful HTTP status code from the List API.<br>

Writing to MongoDB<br>
Using MongoDB's insert method to create a new record in the Create API.<br>
Need to read back the object that was just created and return it as the result of the API call.