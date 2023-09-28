# Coding Guidelines

## HTTP Requests

- To make HTTP GET requests, use the `getRequest` function available in the `httpMethods.ts` module located in the `utils` folder.

- When calling the `getRequest` function, pass the API endpoint as a string and any necessary parameters as a `Record` object.

### Example:

```typescript
import { getRequest } from "./utils/httpMethods";

const apiUrl = "https://example.com/api";
const queryParams = { param1: "value1", param2: "value2" };

try {
  const responseData = await getRequest(apiUrl, queryParams);
  // Process the response data here
} catch (error) {
  // Handle errors using the error handling guidelines
}
```

## Error Handling

- Implement robust error handling using try-catch blocks when making HTTP requests.

- Utilize the `handleError` function provided in the `handleError.ts` module located in the `utils` folder to handle errors gracefully.

- Pass the caught error as an argument to the `handleError` function for consistent error handling.

### Example:

```typescript
import { handleError } from "./utils/handleError";

try {
  // Code that may potentially throw an error
} catch (error) {
  // Handle errors using the `handleError` function
  handleError(error);
}
```
