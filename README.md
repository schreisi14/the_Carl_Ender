# the_Carl_Ender v.0.0.1
- Project for DynWeb-ITM14-FHJ
- ALPHA!!
- Calender-Web-App to sync Events between multiple Users

#Install
1. clone repo
2. npm install
3. start your MongoDB-Server, the App will create an DBs named thecarlender
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

# Team
* Simon Schrei
* Stefan Reip
* Helmuth Weithaler

#TODO
- SignUp ... add second password field
- create dynamic Content (Render is implementet -> create Layouts + something to fill them)
- Design-Stuff (Logout Button? -> atm: profile-button)
