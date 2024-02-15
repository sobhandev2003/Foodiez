
# Foodiez: Online Food Ordering Platform
Foodiez is an online platform designed to facilitate seamless transactions between sellers and buyers in the food industry. With a user-friendly interface, both sellers and buyers can easily navigate the website to fulfill their respective needs.

## User Types
### Seller
Sellers can register their restaurants on the platform and showcase their menu offerings. They have the capability to add and manage food items available for sale. Additionally, sellers can:

Monitor incoming orders
Update delivery status for pending orders
Receive feedback and ratings from buyers
### Buyer
Buyers can explore a variety of food options from registered restaurants and conveniently place orders. Key features for buyers include:

Adding food items to their cart
Selecting preferred payment methods
Utilizing automatic address detection for delivery
Cancelling orders when necessary
Providing feedback and ratings for delivered orders

## Features
### User Authentication
Foodiez prioritizes user security through a robust authentication system. Users must log in with valid credentials to access the platform, ensuring that only authorized actions are performed. The implementation of JSON Web Tokens (JWT) enhances authentication security.

### Order Management
Efficiently handle the entire order process, from placement to tracking and cancellation. Both buyers and sellers benefit from a streamlined and user-friendly order management system.

#### Buyer Actions
#####  Add to Cart: Conveniently add desired food items to the shopping cart.
#####  Place Order: Easily place orders for selected items in the cart.
##### Cancel Order with Reason: Buyers can cancel orders and provide a reason for cancellation, improving transparency.
##### Rating and Feedback: Buyers have the ability to leave ratings and feedback for delivered orders.
#### Seller Actions
##### Delivered Pending Order: Sellers can update the delivery status for pending orders to "delivered."
##### Cancel Order with Reason: Sellers can cancel orders and provide reasons, facilitating clear communication.
##### Update Delivered Status: Sellers can update the status of orders to reflect successful delivery.
### Location Services
Utilize automatic address detection based on the user's current location, enhancing the efficiency of the delivery process.



## Foodiez Technology Stack
### Frontend
##### React: A powerful JavaScript library for building user interfaces.
##### Redux: State management library for efficiently managing application state.
##### CSS: Cascading Style Sheets for styling and layout.
### Backend
##### Node.js: A JavaScript runtime for building scalable and efficient server-side applications.
##### Express.js: A web application framework for Node.js, providing a robust set of features for web and mobile applications.
### Database
##### MongoDB: A NoSQL database for efficient and flexible data storage and retrieval.
### API Integration
##### Nominatim (OpenStreetMap): Utilized for geocoding, enabling the retrieval of current addresses.
### Authentication
##### JSON Web Token (JWT): A secure and efficient method for user authentication.
