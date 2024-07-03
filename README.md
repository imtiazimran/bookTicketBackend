# BookTicket Backend

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **Passport.js**: Simple, unobtrusive authentication for Node.js
- **Google OAuth 2.0**: Authentication protocol used by Google APIs
- **bcryptjs**: Library for hashing and comparing passwords
- **JSON Web Tokens (JWT)**: Compact, URL-safe means of representing claims to be transferred between two parties
- **WebSocket (ws)**: Simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript

## Features

- **User Authentication**: Implement Google OAuth 2.0 for user authentication.
- **Token-based Authentication**: Secure API endpoints using JSON Web Tokens (JWT).
- **Database Integration**: Use MongoDB with Mongoose for data persistence.
- **Session Management**: Handle user sessions with Express Session.
- **Password Hashing**: Securely store user passwords using bcryptjs.
- **API Routes**: Implement RESTful API routes for managing user and booking data.
- **Real-time Updates**: Utilize WebSocket (ws) for real-time communication.
- **Environment Variables**: Configure environment variables using dotenv for secure configuration.

## Project Structure

The project follows a typical structure for a Node.js backend application:
bookticketbackend/ ├── src/ │   ├── app/ │   │   ├── controllers/    # Route handlers │   │   ├── models/         # Mongoose models │   │   ├── routes/         # Express routes │   │   ├── services/       # Business logic services │   │   └── server.ts       # Express server setup │   ├── config/             # Configuration files (dotenv, etc.) │   └── typings/            # Custom type definitions ├── dist/                   # Compiled TypeScript files (generated on build) ├── .gitignore              # Git ignore file ├── package.json            # Project metadata and scripts └── tsconfig.json           # TypeScript configuration

