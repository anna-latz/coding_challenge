# Coding Challenge

## Problem Approach

After reading through the requirements, I made a list of high level problems that needed solving in order to build a &#39;Localz Driver Tracker&#39;:

1. **DB** : Storage of driver, location and session data
2. **REST API** : Communication of information
3. **LOGIC** : Processing of requests, responses and data

Then I thought about what architecture would be best suited to solve the above mentioned problems and decided on the following tech stack:

1. **MongoDB** to store driver, location and session data
2. **Node.js/Express** to build the application (API and server side logic)

**Why MongoDB?**

I have never used MongoDB before and am more familiar with SQL databases. However, I have always wanted to learn more about MongoDB and thought this would be a great opportunity. After doing my research, I decided MongoDB would be a good choice for the following reasons:

- Quick and easy setup with MongoDB Atlas
- Good for maintaining location-based data
- MongoDB supports GeoJSON object types
- Easy to scale and rich queries

**Why Node.js/Express?**

I am familiar with Node.js and have used Express in the past and know that both make sense when building web applications. To list some reasons:

- Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time apps)
- The node package manager provides access to lots of reusable packages
- js is portable and well supported by many web hosting providers
- Express is a minimal, flexible and easy to use web app framework and provides a robust set of features to develop web and mobile apps
- Express allows to set up middleware to respond to HTTP requests

**Validation**

I decided to use **joi** as a validation library as it provides a powerful schema description language and acts as a flexible data validator for JavaScript.

**Sessions**

To store session data between HTTP requests I decided to use express-sessions. This way, location and driver data can be associated during active sessions, but it also acts as a useful tool when managing login and logout actions.

After choosing tools, frameworks, libraries, etc., I came up with a high level structure for my project:

**Structure**

—- config                (contains environment and database configurations)

—- controllers                (contains the application logic)

—- models                (contains driver, session, location models/schemas)

—- routes                 (contains api routes)

—- tests                (contains unit tests)

—- utils                        (contains helpers for validation)

—- server.js                (contains application setup)

Then I decided on what the data models, controllers and endpoints should look like more specifically:

**Models**

- Driver
  - driverId: uuidv1
  - firstName: string
  - lastName: string

- Location
  - location: object
    - type: string
    - Coordinates: array
- Session
  - driverId: uuidv1
  - locations: array
  - isActive: boolean

**Controllers**

- auth-controller: handles registration, login and logout
- driver-controller: handles driver information retrieval
- location-controller: handles submission and retrieval of locations for active sessions

**Routes/Endpoints**

- auth
  - POST /auth/register
  - POST/auth/login
  - POST/auth/logout
- driver
  - GET /drivers
  - GET /drivers/:id
  - GET /drivers/:id/sessions
- session
  - GET /sessions/locations
  - POST /sessions/locations

**Test framework**

In order to test my application I used mocha, chai (chaiHttp), because I have used them before and there are quick and easy to implement. Mocha offers async support and before and after hooks and Chai is a good assertion library when unit testing HTTP calls.

After making some high level decisions I started coding. Of course I encountered problems from time to time which is why I made some small changes here and there. For instance:

- At first I started implementing authentication using emails and hashed passwords, but I decided it was out of scope for this challenge, so I simplified the login/logout system to simply use the driverId.
- I tried out a few different test frameworks and played around with seeding mongo dbs, but the implementation was taking too long, so I decided to go with mocha and chai for now.

**Thoughts**

I am still unsure whether the use of an express session is needed in this use case. I implemented it because I thought it was necessary when querying and submitting locations for active sessions. The way I understood the requirements was that locations can only be queried and submitted if a driver is logged in/ has an active session. Plus, using sessions seems to be the norm when handling logins/logouts. However, it could also be possible to pass the driverId as a parameter instead, which would make the use of an express session redundant. I would definitely like to get your opinion on this matter.

Further to this, sessions seem to be persistent in this use case as they simply change to &#39;inactive&#39; after logout. In a real life scenario, I would expect there to be A LOT of inactive sessions and storing them might become a problem. This is definitely something I was thinking about when working on this challenge.

If only I had more time …

If I had more time, I would love to learn more about seeding mongo dbs and how to properly set up tests. I definitely need to improve my testing skills and would love to find out what your ideas are around testing APIs. My current team constantly seems to battle with writing unit tests for APIs and trying to figure out how much time/effort should be spend setting up test environments, so please let me know what you think!

## How To Run

**Prerequisites**

- Node.js
- NPM
- MongoDB (Atlas) MongoURI i.e.
    - mongodb+srv://<db_user>:<db_pass>@cluster0-cuo2x.mongodb.net/<db_cluster>?retryWrites=true&w=majority
- **.env file with ENV variables**, a .env template is provided
     - for running the app, please specify **NODE_ENV='dev'**
     - for running the tests, please specify NODE_ENV='test'

**Run It**

Clone the repository
```
https://github.com/anna-latz/coding_challenge.git
```

Install packages for Node backend
``` bash
cd coding_challenge
npm install
```

Start dev server (make sure you have populated the .env file)
``` bash
npm run server
```

## How To Test

**Prerequisites**

- Node.js
- NPM
- MongoDB (Atlas) MongoURI i.e.
    - mongodb+srv://<db_user>:<db_pass>@cluster0-cuo2x.mongodb.net/<db_cluster>?retryWrites=true&w=majority
- .env file with ENV variables, a .env template is provided
     - for running the app, please specify NODE_ENV='dev'
     - for running the tests, please specify **NODE_ENV='test'**

**Test It**

Make sure you changed the **NODE_ENV** to **test** as stated in the prerequisites. I also recommend changing the **DB_CLUSTER** in the .env file to **test**.

Run the tests (make sure you have populated the .env file)
``` bash
npm run test
```
