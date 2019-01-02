# diabetes-self-management-app

<b>Express-REST-API-for-Diabetes-Self-Management-App</b><br>
Modifying the web app to store activity data in and fetch it from a node.js server. This node.js server supports REST API to fetch all the activities stored in memory of the server and also to create a new activity. The application front end is modified to use this API.<br>

REST (representational state transfer) is an architectural pattern for application programming interfaces (APIs). APIs are resource based, and resources are accessed based on a Uniform Resource Identifier (URI), aka an endpoint. To access and manipulate the resources, you use HTTP methods: GET, POST, PUT, PATCH, DELETE, and etc.<br>

<b>Express is a web application framework</b> which relies on other modules (middleware) to provide the functionality that most applications will need.<br>
Routing: Express takes a client request, matches it against any routes that are present, and executes the handler function that is associated with that route.<br>
Request Matching: When a request is received, request's method is matched with the route method.<br>
Route Parameters: named segments in the path specification that match a part of the URL.<br>
Route Lookup: Router match all routes in the order in which thy are installed so add more generic patern <i>after</i> the specific paths.<br>

Middleware functions: have access to the request object(req), the response object(res), and the next middleware function in the application's request-response cycle. Middleware can be at the application level (applies to all request) or the router level (applies to specific request path patterns).<br>

The List API: lists all activities. List of activities are stored in the server's memory, and the get route to the application is added, which sends out the global array of activities as a JSON using res.json(). nodemon package is used to automatically restart the server on changes.<br>

The Create API: creates a new activity. For POST, request body will contain the new activity object to be created. Express does not have an in-built parser that can parse request bodies to convert them into objects so body-parser npm package is used. Need to let Express know that this middleware should be used so that it can intercept request, look at the content type, and deal with the body appropriately. New activity is added from the request body (which is parsed by body-parser) and it is returned as a response to the request.<br>

Using the List API: use the List API in the application front end and replace the in-memory list of activities. To use the APIs, need to maek asynchronous API calls or Ajax calls. Modern browsers support asynchronous calls natively via the Fetch API. fetch() takes in the path of the URL to be fetched and returns a promise with the response as the value. loadData() in ActivityList component is modified.<br> 

Using the Create API: modify createIssue in ActivityList component to send new activity to the server and use the updated activity returned by the server to append to the list of activities. fetch() API for POST methods need an options object in the second parameter, which include the method, the Content Type header, and the body in JSON representation. With the JSON representation of the new activity created received back from the server, the new state is set by appending the new activity to the existing list of activities.<br>

Error Handling: error handling in the Create API. Using 422 Unprocessable Entity as the error status code. Return an object with a single property called message that holds a readable as the description. At the server: simply set the status using res.status() and send the error message as the response. At the client, code is modified to detect a non-success HTTP status code. Fetch API does not throw an error for failure HTTP status codes so must check the response's property, response.ok.