# expressjs_fundamentals_lecture

Write server on node.js using express.js. 

Server should expose API with 4 endpoints for:

1. adding user
2. removing user
3. get user list
4. get user by id

API should be designed usign REST practices. (GET /users, GET /users/:id, POST /users etc.)

Create dataAccess module to handle create, get, delete oparations, API endpoints should call methods of those modules.

Inside dataAccess module write logic to get, create and delete user objects into/out of JSON file called users.json.

Write middleware to handle API errors, use HttpError (from previous lecture) to send errors connected with bad request, not found etc.

Write middleware that will check for Authorization header in request object and that it equals 123, if NO - return HttpError with 401 status.
