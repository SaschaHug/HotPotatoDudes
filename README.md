# HotPotatoDudes
## Usage
### Requirements
You need [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) in oder to run this. 
### Installation
To install the required modules change to the cloned directory and run ```npm
install```:
```
$ cd HotPotatoDudes/
$ npm install
```
### Run it
After installing the required modules you can run it with:
```
$ node index.js
```

### Log in
Use a JSON WebToken to authenticate. One will be generated for you upon successful login.
This is an example body content for the login:
```
{
  "username" : "you",
  "password" : "yourPassword"
}
```


Your JWT will be passed as a JSON key-value pair in the response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRoYndrYV91c2VyIiwicGFzc3dvcmQiOiJha204OTkwIiwiaWF0IjoxNTAxNTIxNzk4fQ.RjFmTpIuEl9c_RKpK2wIKvp4ik1w7rK5pXRM9mSde14"
}
```


Use this token to authenticate either by putting it in the Header of your request or putting it inside the body.
Examples are as follows:

Using the Bearer Scheme in the Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRoYndrYV91c2VyIiwicGFzc3dvcmQiOiJha204OTkwIiwiaWF0IjoxNTAxNTIxNzk4fQ.RjFmTpIuEl9c_RKpK2wIKvp4ik1w7rK5pXRM9mSde14
```

Or simply put it in the body:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRoYndrYV91c2VyIiwicGFzc3dvcmQiOiJha204OTkwIiwiaWF0IjoxNTAxNTIxNzk4fQ.RjFmTpIuEl9c_RKpK2wIKvp4ik1w7rK5pXRM9mSde14"
 }
```
