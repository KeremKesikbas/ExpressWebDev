# Start Server
node ./server/bin/www

# Info
Change "use_mysql" variable in the config.json to false to start the server without database connection.

Create mysql server before starting nodejs server and set your account with config.json, if you want to start server with database connection.

It is recommended to use "xampp" to open mysql server, download link: https://www.apachefriends.org/index.html

# Connect mysql server with nodejs(using xampp):
- Start Apache and Mysql modules
- Click "admin" button to the right of mysql, this will open a webpage called "phpMyAdmin"
- Click "Import" button at the top of the page
- Choose "database.sql" file and click "go" button at the bottom of the page
- A new database called "main" will appear in the right menu
- Replace connection parameters in the config.json file with your account
- note: if you didn't set your password check out "Changing xampp password" title

# Change xampp password
- Go to main menu
- Click "User accounts" button at the top of the page
- Click "Edit privileges" at the right of root-localhost
- Click "Change password" at the top of the newly opened page
- Change your password and click go button
- An error called "Access denied" will appear when you refresh the page
- To solve this error, go to where you downloaded xampp and open phpMyAdmin/config.inc.php file
- Replace "$cfg['Servers'][$i]['password'] = '';" with your password and save the file.