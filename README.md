# Washer Production Backend
Backend for Inventory Management System of a company that produces washers

 
## API Documentation
Read the API documentation at https://documenter.getpostman.com/view/25770153/2s93sgXWKo

## Installation
- Install the required node packages using `npm i`
- Install MySQL and take note of the database name, username, and password

## Configuration
- Create a file named `.env` in the directory as follows:
```
DATABASE="database/schema_name"
DBUSER="username"
DBPASS="password"
```
- Run the `initialise.js` file to set up the database  
`node initialise.js`

## Running the server
To run the server, simply run the `server.js` file using `node server.js`

