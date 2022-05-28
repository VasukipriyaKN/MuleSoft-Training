Web Application

_**Tech Stack: Node.js, SQLite, HTML & CSS, EJS**_

**Functionalities**

 1. Creating & connecting to a new SQLite database.
 2. Dynamically Inserting values into table.
 3. Dynamically Querying values using multiple parameters.
 4. Dropping Table.

_Prerequisite: Get Node.js installed_

Step 0: Run the following commands to initialize npm and to install required packages.

          npm init
          npm install express ejs body-parser sqlite3
   
Step 1: Run the following command to start the server.

           node app.js

Step 2: Open [`http://localhost:3000/`](http://localhost:3000/) on your browser. Good to go👍.

**Note: When the table is dropped, reset the database by clearing `movie.db` file and re-run the code so that new table is created.**
