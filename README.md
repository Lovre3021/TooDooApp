
# TooDooApp

Welcome to the first iteration of the TooDooApp!

This App is primarily used as a way to learn web development using the MERN stack.




## How to run the app?

Before using this project first you'll have to install MongoDB. Download the MongoDB Community Server to get started.

https://www.mongodb.com/try/download/community?tck=docs_server

After that's done you'll have to open mongod.exe and mongo.exe in the terminal. These executables can be found in the bin folder in the MongoDB install folder. Run them using these commands: 

```bash
  ./mongod.exe
```
and

```bash
  ./mongo.exe
```
Now we can start cloning our repository. First create a folder where you plan to store the project. After navigation to that folder using the usual commands you can clone the TooDooApp repository using this command:

```bash
  $ git clone https://github.com/Lovre3021/TooDooApp.git
```
Open the project in Visual Studio code. First we have to install the necessary packages on the backend and frontend using:

```bash
  $ npm install
```
and:

```bash
  $ todo-frontend/npm install
```

afterwards run the server in the main folder:

```bash
  $ node server.js
```
and then the frontend in the todo-frontend folder using:

```bash
  $ todo-app/todo-frontend/node server.js
```

There we go! The page should load now!


## How to use the app?
Sign up using the sign up button and login afterwards. Start by adding a new Todo List, giving it a fancy title and description and afterwards clicking the edit button to fill it in with ne Todo Items.

If you want to set a Todo Item as completed simply click on it and will be crossed out.

If you want to share a current Todo List with someone, click on the edit button and on share afterwards. A link will be generated and immediately copied to your clipboard ( You will see an alert pop up).
## Notes

* This is my first time using React and Express.
* The App design is not finalized and is currently considered a placeholder.
* I haven't separeted controllers and services since this is a simple app and I don't intend to write tests.
* The Status field is currently used to see at a glance what Todo lists you have completed, they do not mark the available Todo items as completed. That feature is not implemented at this current time.
