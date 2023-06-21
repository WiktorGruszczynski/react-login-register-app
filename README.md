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
### Create an account
You can register your account like on every other website and after registration you will be redirected to a login page

### Log in 
You can login to your account with your email address and correct password. 
Your password is stored safely in database in form of hash.

### Edit your profile settings
You are able to edit your username, password and profile picture. Changing password and removing account require passing current password due to a verification process.
In order to change your current profile picture you need to click your avatar inside settings menu.

![](https://github.com/WiktorGruszczynski/react-login-register-app/blob/main/images/settings.png)

### Add games to your favourite games list

