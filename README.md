# slack-bot

slack-bot will provide with information from the NHTSA database

Through a slack bot connected to a backend deployed in Heroku, you will be able to get information of a vehicle providing:
- VIN
- Make
- Model
- Year
- Fuel Type

Information you will get (among much others) from the vehicle will be Decoded (Suggested) VIN, Manufacturer, Plant City, Series, Base Price, etc.

To be able to use the NHTSA slack bot you just have to join Luis Millan workspace in the following link:
https://join.slack.com/t/luismillan/shared_invite/zt-xsqt44c0-UwALGuGx8F2cJ2DYrfE1uQ

Once there the channel `#nhtsa-bot` is already configured to chat with the bot, her name is ***slack-bot*** and she will try to be very friendly and help 

Also you can chat in a direct message channel with the bot and she gladly will help you out

Some specifications and example for fields required:
- VIN: 17 character string that does not contain letter O, I and Q
- Make: (e.g. Toyota, Honda, etc.)
- Model: (e.g. Camry, Civic, etc.)
- Year
- Fuel Type (e.g. Regular, Premium, etc.)