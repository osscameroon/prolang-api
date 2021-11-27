This page describes how to consume the API following the REST API standard.
You need an HTTP client to query the endpoints. 

You can use: [Postman](https://www.postman.com/downloads), [Insomnia](https://insomnia.rest/download), [Hoppscotch](https://hoppscotch.io/)

Or whatever client you are comfortable with.

## Data Pagination
For each response returned, only thirty items will be inside the body. You will also have metadata
that will help you query the following data.

## Rate Limiting
There is a maximum number of calls you can make on every endpoint during a specific interval.
In a window of fifteen minutes, you can make one hundred requests on any endpoints.

## API request logging

When sending a request to the API, the information about it is stored to process
some analytics. Here are the data stored: **the path**, **the IP address**, 
**the response status** and **the execution time**.

## Disable request logging
For some reason, if you don't want your request to be logged, you can disable it by
adding a custom header when sending your request.
* Header name: **x-client-origin**
* Header value: **brwsr**


