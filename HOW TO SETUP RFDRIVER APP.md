D:\Homey\GitHub>

Run npm i -g npm to update
> athom project --create

Hey developer, we're hiring! View our open position at https://go.athom.com/jobs
? What is your app's unique ID? net.PelliniScreenLine
? What is your app's name? ScreenLine Remote
? What is your app's description? Add support for ScreenLine Blinds
? What is your app's category? climate
? What is your app's version? 0.0.1
? What is your app's SDK version? 2
? What is your app's compatibility? >=1.5.0
? Seems good? Yes
Your app has been created at: D:\Homey\GitHub\net.PelliniScreenLine

> cd net.PelliniScreenLine
> git init
> git add .

> git commit -m "Initial Commit PelliniScreenLine"

[master (root-commit) 564e6a4] Initial Commit PelliniScreenLine
 Committer: Geurt Dijker <Geurt.Dijker@company.tld>
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
You can suppress this message by setting them explicitly. Run the
following command and follow the instructions in your editor to edit
your configuration file:

    git config --global --edit

After doing this, you may fix the identity used for this commit with:

    git commit --amend --reset-author
{reset to private email account}

 6 files changed, 50 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 app.js
 create mode 100644 app.json
 create mode 100644 assets/icon.svg
 create mode 100644 locales/en.json

> git config --global --edit
> git commit --amend --reset-author

> git remote add origin https://github.com/Dijker/net.PelliniScreenLine.git
> git push -u origin master

> md config\drivers
> md config\signals\433

create the 3 files:
 net.PelliniScreenLine\config\script.js // no changes
 net.PelliniScreenLine\config\drivers\screenline.js
 net.PelliniScreenLine\config\signals\433\screenline.js  

# net.PelliniScreenLine\config\signals\433\screenline.js  
 // add sof, eof, words of the signals, adjust timings if necessary

#  net.PelliniScreenLine\config\drivers\screenline.js
 module.exports = {
 	id: 'SL2392S159', // Somethin unique, Device ID from Remote
  // etc, etc.



 > homeyConfig compose

Composing folders into app.json
Composing signals
Composing drivers
Generating SL2392S159:undefined template version 1.0.0
Generating SL2392S159:undefined template version 1.0.0
Generating SL2392S159:undefined template version 1.0.0
done...

# drivers\SL2392S159\device.js
  static payloadToData(payload) { // Convert received data to usable variables
  static dataToPayload(data) { // Convert a data object to a bit array to be send
    and some helpers functions


cp blinds.svg drivers\SL2392S159\pair // default icon
$ Request nice svg from https://github.com/athombv/homey-vectors-public @IvoDerksen
cp remote.svg drivers\SL2392S159\pair


drivers\SL2392S159\pair\imitate.html
  uses the svg image
		svg: '../../../assets/RFDriver/svg/remote.svg',

drivers\SL2392S159\pair\test_switch.html
  uses the svg image
  		svg: '../../../assets/RFDriver/svg/blinds.svg',



Add AppStore Images  …
assets\images large.png 500x350 & small.png 250x175
Add app Icon assets\icon.svg (Company Logo)
