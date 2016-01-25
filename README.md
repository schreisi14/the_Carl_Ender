# the_Carl_Ender v.0.0.3
- Project for DynWeb-ITM14-FHJ
- ALPHA!!
- Calender-Web-App to sync Events between multiple Users

#Requirements
- NodeJs
- MongoDB
- nodeunit (for testing -> "npm install nodeunit -g")

#Install
1. clone repo
2. npm install
3. start your MongoDB-Server, the App will create a DB named thecarlender
4. npm start
5. realize it's an alpha and doesn't work at the moment ;)

#Additional Information for Registration
#### Getting the confirm-link from the Console
- The confirm-link is logged to the console! <-- Copy&Paste into your browser

#### Activate the mailer
- A Mailer is implemented
- To activate it, uncomment the lines 73 - 93 in the /passport/ppconf.js
- Insert your fh-email instead of <YOUR EMAIL>
- You have to be in the FH-Network!

#### The Token in the DB will be set to 0 if the confirm-link is visited

#Testing
- test/unittest.js -> open with node
- test/testsuit.js -> open with nodeunit

# Team
* Simon Schrei
* Stefan Reip
* Helmuth Weithaler

#TODO
- Update Method
- Update Unittests
- user input validation
- TimePicker
- Update Profile-Page
- Comments :)
- addform -> add required to the input fields
