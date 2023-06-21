# react-login-register-app

# Client setup

Navigate to client directory: 
`cd client`

Install required packages:
`npm i axios react-router-dom@latest`

Replace ip inside serverUrl.js with your ip and port

# Server setup

Navigate to server directory:
`cd server`

Install required packages:
`npm i bcrypt cors dotenv express mongoose multer router`

# Database setup
In order for this project to work completly, you have to create an account on [mongodb website](https://www.mongodb.com/). Then create new deployment and connect to it using url.
Copy the url and paste it into your ".env" file like this:
- DB_URI=mongodburl

# How to run

Navigate to client directory and run the following command:

`npm run start`

Run index.js file located in server src directory

# How to use
- Create an account
- Log in
- Change profile picture
- Change username
- Change password
- Delete account
- Add games to your favourite games list


