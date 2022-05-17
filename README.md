<p align="center">
  <img src="https://user-images.githubusercontent.com/87240318/167636941-e3d6e24e-da11-4d2c-8e8e-7ff3353cc8dc.png" width="500"/>
</p>

<p align="center">
   <a href="https://henmo.herokuapp.com/home">Henmo</a> is a clone of venmo where chickens are the currency.
</p>


## Table of Contents
- [Getting Started](https://github.com/danguai/henmo#getting-started)
- [Technologies](https://github.com/danguai/henmo#technologies)
- [Feature List](https://github.com/danguai/henmo#feature-list)
- [Future Implementations](https://github.com/danguai/henmo#future-implementations)



## Getting Started
To get started, you can access the live site [here](https://henmo.herokuapp.com/home).

#### Step 1

From the home page, you can access the site via a demo user or by signing up. On the sign up form, you must enter a first name, last name, email, password, and select one of our chicken avatars.

#### Step 2

After signing up, you can now access Henmo! Have fun paying other people with chickens!

## Technologies
- Reactjs
- Redux
- Python
- SQLAlchemy
- PostgreSQL
- Heroku
- Docker

## Feature List
- Users can sign up, log in, and log out
- Logged-in users can create payment.
- Logged-in users can read all payments created byt themselves.
   - After that payment is created, logged-in users can update how many chickens they want to send (as long as it is more than 0) and also update the message in the 'transaction'
   - The logged-in user can delete the payment before approval, and it will be deleted in its entirety.
   - The logged-in user must approve the payment once everything is correct.
- Logged-in users can create comments on approved payments.
-Logged-in users can read all comments on approved payments.
   - After a comment is created, only owners of those comments can update or delete them.

## Future Implementations
A few ideas to expand the world of Henmo:
- Request Payment
- Funds
- Friends
- Currencies
