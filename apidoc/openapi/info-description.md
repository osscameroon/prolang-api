This page describes how to consume the API following the REST API standard.
You need an HTTP client to query the endpoints. 

You can use:
* [Postman](https://www.postman.com/downloads)
* [Insomnia](https://insomnia.rest/download)
* [Hoppscotch](https://hoppscotch.io/)

Or whatever client you are comfortable with.

## API request logging

When sending a request to the API, the information about the are stored to process
some analytics. Here are the data stored: **the path**, **the IP address**, 
**the response status** and **the execution time**.

## Disable request logging
If for some reason you don't want your request to be logged, you can disable it by
adding a custom header when sending your request.
* Header name: **x-client-origin**
* Header value: **brwsr**


