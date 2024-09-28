
# Railway Management System API

This project is a **Railway Management System** built using Node.js, Express.js, and Sequelize (PostgreSQL). The system allows users to book train seats, view booking details, and admins to manage train information.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Features
- **User Authentication**: Register and login with JWT-based authentication.
- **Train Management (Admin)**: Admins can add new trains.
- **Booking Management**: Users can book train seats and view their bookings.
- **Seat Availability Check**: Users can check seat availability between stations.
- **Protected Routes**: Admin routes are protected using API keys, and user routes are protected using JWT.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **Sequelize**: ORM for database interactions.
- **PostgreSQL**: Database used for storing information.
- **JWT**: Authentication for users.
- **Bcrypt**: For password hashing.

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/Maahi7dec/Railway_Management_Assignment.git]
   ```

2. Navigate to the project directory:

   ```bash
   cd railway-management-system
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root of your project and add the following:

   ```bash
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   PORT=3000
   ```

5. Run the application:

   ```bash
   npm run start
   ```

   Alternatively, for development with automatic restarts on file changes:

   ```bash
   npm run dev
   ```

6. The API will be available at `http://localhost:3000`.

## Project Structure

```
.
├── config
│   └── database.js        # Sequelize database connection configuration
├── controllers
│   └── bookingController.js  # Booking management logic
├── middleware
│   └── auth.js             # JWT Authentication middleware
├── models
│   ├── booking.js          # Booking model
│   ├── Train.js            # Train model
│   └── User.js             # User model with password hashing
├── routes
│   ├── admin.js            # Admin routes for managing trains
│   ├── auth.js             # Authentication routes for users
│   ├── Booking.js          # Booking routes
│   └── user.js             # User routes for train availability check
├── node_modules            # Node.js modules
├── app.js                  # Entry point for the application
├── package.json            # Project configuration and dependencies
└── .env                    # Environment variables configuration
```

## Environment Variables

The following environment variables need to be configured in your `.env` file:

- `DB_NAME`: PostgreSQL database name.
- `DB_USER`: PostgreSQL database username.
- `DB_PASSWORD`: PostgreSQL database password.
- `DB_HOST`: Database host, default is `localhost`.
- `JWT_SECRET`: Secret key for JWT authentication.
- `ADMIN_API_KEY`: API key to protect admin routes.
- `PORT`: Port number for the server (default is `3000`).

## Usage

### Admin Functionality
Admins can add new trains to the system by providing an API key.

### User Functionality
- Users can register and log in to the system.
- Users can book train seats, check seat availability, and view their booking details.

## API Endpoints

### Authentication
| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login a user             |

### Admin
| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| POST   | `/api/admin/add-train` | Add a new train (Admin only)|

### User
| Method | Endpoint                   | Description                              |
|--------|----------------------------|------------------------------------------|
| GET    | `/api/user/seat-availability` | Check train seat availability            |

### Bookings
| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | `/api/Bookings/book-seat` | Book a seat (User)             |
| GET    | `/api/Bookings/my-bookings` | Get user booking details       |

## Database Schema

### User Model (`User`)
| Field     | Type       | Description                 |
|-----------|------------|-----------------------------|
| id        | Integer    | Primary key                 |
| username  | String     | Unique username             |
| password  | String     | Hashed password             |
| role      | String     | Role of the user (`user`/`admin`) |

### Train Model (`Train`)
| Field                | Type    | Description                        |
|----------------------|---------|------------------------------------|
| id                   | Integer | Primary key                        |
| source_station       | String  | Starting station of the train      |
| destination_station  | String  | Ending station of the train        |
| total_seats          | Integer | Total seats available in the train |
| available_seats      | Integer | Seats available for booking        |

### Booking Model (`Booking`)
| Field       | Type    | Description                             |
|-------------|---------|-----------------------------------------|
| id          | Integer | Primary key                             |
| seat_number | Integer | The seat number booked                  |
| userId      | Integer | Foreign key, references the `User` model|
| trainId     | Integer | Foreign key, references the `Train` model|

