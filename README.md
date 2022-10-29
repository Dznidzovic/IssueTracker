## IMPORTANT
Before we get started, in case you don't have time to test this project, you can find a demo video that I've made here
https://we.tl/t-ff700Pcw8I .



## Getting Started
Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from both the client and server directories. After that run `npm install` from both the folders and use the app.

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `components` - This folder holds all of the different components
    - #### `styles` - This folder holds all of the css.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `MongoDB` - This holds all of our MongoDB files such as models and connection.
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Project Description
Project managment tool demo, that's intended as an internal tool whitin an organization.
ReactJs was used in fronted, NodeJs for backend and MongoDB for database.
Vanilla css was used with a little bit of sass. This app is also fully responsive, and supports mobile version aswell.
All the forms when it comes to creating and edditing accounts,projects,tickets and comments are secured in a way that user can't input bad information that will crash the program
and when they try to, they will be stopped and notified.
First it features an Authentication/Authorization system, where the user is given a choice if they want to make a new account or log in 
to existing one.
When the user makes the account a verification link is sent to their mail. Link expires in an hour or if another one was sent. Therefore
only the last link will be valid. If a user tries to log in without verification, they will be stopped and another link will be sent to their mail.
User can also change their password, where they will be asked for the email first and then the reset link will be sent to their mail, so they can choose another password.
Also only the last link sent will be valid.
After completing authentication process, user will go through authorization process via json web token. If it fails they will be redirected to the login page.
Once all of this is completed. User will be redirected to the dashboard. There they can create new projects, search them or delete them.
When creating a new project, user will be asked to choose all the developers working on it, project name and project description.
When clicking on the given project name in the dashboard, user will be redirected to the project details, where they can add or remove  developers on a project,
add and delete new tickets assigned to the project, and add and delete new comments assigned to the project.
Maximum 5 developers can be working on a project, so when trying to add new developer, if the number exceeds 5 people you will be stopped.
When adding a ticket, developer will be asked for ticket name, description, developers assigned to the ticket,type,status and priority of a ticket.
Only the developers working on the project that a ticket belongs to, can be added to a given ticket. Tickets also feature searching system and can be deleted.
Once the ticket is added you can click on it an all the specific information will be displayed. Also when the ticket is added, there are 3 pie charts located in the dashboard
representing statistics of all tickets based on status, type and priority, that will automatically be updated.
Comments are pretty straight forward and don't need any explanation.
After the dashboard, user can also go into tickets page, where all the tickets assigned to the logged in user will be displayed.
There the user can edit all the tickets assigned to them, but if they don't add themselves as a developer to the ticket when editing it, they won't have the access to that ticket anymore.
After editing the ticket, everything in the UI will be automatically changed and updated, including the charts on the dashboard.
Last but not least, If a logged in user has a role of an admin, they will have access to the administration page.
There they can edit and delte all the users but themselves. If an admin chooses to delete a certain user, that user will be automatically removed as a developer from all the projects and tickets that they work on.
But the comments of that user will still remain.
Hope you enjoy this IssueTracker demo, and kinda get an idea what a project managment tool like this works.

###IMPORTANT
If you try to make an account or reset the password, check all mail, spam trash,etc... Most likely the mail will end up there.
If you don't want to use your mail, here are the accounts you can use.
bugtrackeradmin@gmail.com
Admin123
This is an admin account

and for a developer account you can use:
bugtrackerdeveloper@gmail.com
Developer123 

