# Frontend

[WEBSITE](https://pencil-70474.firebaseapp.com/)

# Backend

[API](https://pencil-assignment.herokuapp.com/api)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13491874-ada0fa83-e2b0-4d78-9f57-bdf3dcbb9305?action=collection%2Ffork&collection-url=entityId%3D13491874-ada0fa83-e2b0-4d78-9f57-bdf3dcbb9305%26entityType%3Dcollection%26workspaceId%3Dbfa44db8-2894-4da7-8919-f2b175b6f49c)

[EXAMPLE TOPIC LEVEL 1](https://pencil-assignment.herokuapp.com/api/topics/search?q=%22Cell%20Structure%20and%20Organisation%22)

[EXAMPLE TOPIC LEVEL 2](https://pencil-assignment.herokuapp.com/api/topics/search?q=%22Describe%20and%20explain%22)

[EXAMPLE TOPIC LEVEL 3](https://pencil-assignment.herokuapp.com/api/topics/search?q=%22Red%20blood%20cells%20%E2%80%93%20haemoglobin%20and%20oxygen%20transport%22)

Additional information can be obtained by passing an extra query param "logs" with any value, for e.g &logs=true <br>

This will return:

- Question numbers. <br>
- Topics used to find the questions. <br>
- Data from every question found. <br>
- The subtree of the query topic.

[EXAMPLE LOGS](https://pencil-assignment.herokuapp.com/api/topics/search?q=%22Cell%20Structure%20and%20Organisation%22&logs=true)
