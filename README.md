# slack-bot

slack-bot will provide information from the NHTSA database

Through a slack bot connected to a Node.js backend deployed in Heroku, you will be able to get information of a vehicle providing:
- VIN
- Make
- Model
- Year
- Fuel Type

Information you will get (among much others) from the vehicle will be Decoded (Suggested) VIN, Manufacturer, Plant City, Series, Base Price, etc.

To be able to use the NHTSA slack bot you just have to join Luis Millan slack workspace in the following link:
https://join.slack.com/t/luismillan/shared_invite/zt-xsqt44c0-UwALGuGx8F2cJ2DYrfE1uQ

Once there the channel `#nhtsa-bot` is already configured to chat with the bot, her name is `slack-bot` and she will be friendly and try to help you out

Also you can chat with `slack-bot` in a direct message channel, you just have to look for her and begin a conversation

Some specifications and example for fields required:
- VIN: 17 character string that does not contain letter O, I and Q
- Make: (e.g. Toyota, Honda, etc.)
- Model: (e.g. Camry, Civic, etc.)
- Year
- Fuel Type (e.g. Regular, Premium, etc.)

# Architecture

The slack-bot chat application is developed in Node.js platform to handle the requests and responses from bot to slack

Luis Millan'n slack workspace is configured and connected to a backend API which is deployed on Heroku cloud

In order to do a health check of the backend a `GET https://slack-bot-booster.herokuapp.com` can be done 
