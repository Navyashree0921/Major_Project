# 🌍 WanderLust

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-MIT-blue)

**WanderLust** is a full-stack travel listing web application inspired by Airbnb where users can explore destinations, create property listings, upload images, view locations on maps, and leave reviews.

The application includes user authentication, authorization, image uploads, and interactive maps.

---

## ✨ Features

* 🔐 User Authentication (Signup / Login / Logout)
* 🏠 Create, Edit, and Delete Listings
* 📸 Image Upload using Cloudinary
* ⭐ Review and Rating System
* 🗺 Interactive Maps using Leaflet + OpenStreetMap
* 👤 Authorization (only listing owners can edit/delete)
* 💬 Flash messages for user feedback
* 📱 Responsive UI using Bootstrap

---

## 🛠 Tech Stack

**Frontend**

* EJS
* HTML
* CSS
* Bootstrap
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* Passport.js
* express-session
* connect-mongo

**Other Tools**

* Cloudinary
* Multer
* Joi
* Leaflet

---

## 📂 Project Structure

```
WanderLust
│
├── controllers
├── models
├── routes
├── views
│   ├── listings
│   ├── users
│   └── layouts
├── public
│   ├── css
│   └── js
├── middleware.js
├── utils
├── app.js
└── package.json
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/yourusername/wanderlust.git
```

Navigate to project directory

```
cd wanderlust
```

Install dependencies

```
npm install
```

Create a `.env` file and add the following:

```
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

Run the project

```
node app.js
```

or

```
nodemon app.js
```

Open in browser

```
http://localhost:8080/listings
```

---

## 🚀 Future Improvements

* Search and filter listings
* Pagination
* Wishlist / favorites
* Booking system
* Payment integration

---

## 👩‍💻 Author

**Navyashree J S**

