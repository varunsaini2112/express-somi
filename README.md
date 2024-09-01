# Express-somi

## Overview

This project is a Node.js backend using Express for routing and MongoDB for data storage. It provides a foundation for building robust server-side applications.

## Prerequisites

- Node.js installed (version 18.16.0)
- npm or yarn package manager

## Installation

1. Clone the repository:

git clone https://github.com/varunsaini2112/express-somi.git

2. Navigate to the project folder:

cd express-somi

3. Install dependencies:

npm install

## Configuration

1. Create a `.env` file in the root directory.

2. Add environment variables for MongoDB connection:

MONGO_URI=<your-mongodb-uri>

ACCESS_TOKEN_SECRET=<your-jwt-access-token-secret>

REFRESH_TOKEN_SECRET=<your-jwt-refresh-token-secret>

use following command to generate a secret key node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Usage

- Start the server:

npm start
- The server will run on port 3000 by default. You can configure the port in the `.env` file.

## API Endpoints

- user/signup (POST)
- user/signin (POST)

- todo/add-item (POST)
- todo/get-items (GET)
- todo/{todo-item} (DELETE)
- todo/{todo-item} (PUT)

## Contact

- Provide your contact information for any inquiries or support.
