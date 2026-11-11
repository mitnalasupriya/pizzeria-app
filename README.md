# Pizzeria

## Project Overview

Pizzeria is a React based pizza ordering web application developed as a frontend capstone project. The application allows users to browse pizzas, build custom pizzas, manage their cart, place orders, view order history, and submit reviews. It provides a responsive and userfriendly experience using modern React concepts.

## Features

- User Registration
- User Login and Logout
- Authentication using Context API
- Protected Routes
- Browse Available Pizzas
- Build Your Own Pizza
- Customize pizza
- Add to Cart
- Update Cart Quantity
- Remove Items from Cart
- Checkout Process
- Order Placement
- Order History
- Review and Rating System
- Responsive Design
- Popup Notifications

## Technologies Used

### Frontend

- React
- React Router DOM
- Local Storage
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite

### React Concepts
- Functional Components
- Props
- State Management
- useState
- useEffect
- useContext
- Context API
- Conditional Rendering
- Form Handling

### Storage

- Local Storage (Authentication Data, Orders, Reviews)

## Project Structure

src
│
- assets
- components
- context
- pages
- styles
- utils
- App.jsx
- main.jsx


## Main Pages
|
-Home Page
 Displays information about the restaurant, ingredients, chefs, and delivery services.

-Order Pizza Page
 Displays available pizzas along with descriptions and pricing.

-Build Your Own Pizza Page
 Allows users to customize pizza size, toppings/ingredients.

-Cart Page
 Displays selected items, quantities, and total amount.

-Checkout Page
 Collects customer details and confirms the order.

-Order History Page
 Displays all past placed orders for the logged in user.

-Login Page
 Allows existing users to authenticate and access protected features.

-Register Page
 Allows new users to create account.

## Authentication Flow
|
- User registers using the registration form.
- User logs in using valid credentials.
- Authentication information is maintained using Context API.
- Protected pages require user login.
- User can log out from the application.

## Key Functionalities
- User Authentication
- Cart Management
- Custom Pizza Creation
- Order Placement
- User Reviews and Ratings
- Responsive User Interface


## Future Enhancements
- Admin Dashboard
- Role Based Acces Control (Admin & Customers)
- Real Time Order Tracking
- Advanced Search and Filters


# Install dependencies:
npm install

# Start the development server:
npm run dev

## Author
Dinesh Kumar Pade
Advanced App Engineering Associate