# angular-node-framework
ChangeLog V_0.0.4

Feature added : 

1) Update profile working now.

2) Change-password added to profile page.

3) Some UI modification.


ChangeLog V_0.0.3

Setup : Please find sql file 'DbAlterScriptV_0.0.3' under '/db' directory and import it to database.

                i) V_0.0.2 sql file import error has been fixed.
                
        Run "npm install" : To install new modules          
                
                

Feature added : 

1) Completed all UI pages-Popups desgin and flow.

2) Showing User detail in profile page.

3) Profile picture saving and changing feature from profile page completed.


ChangeLog V_0.0.2

Database setup : Please find sql file 'DbAlterScriptV_0.0.2' and import it to database.

Feature added : 

1) Intercom Integration.



ChangeLog V_0.0.1

Database setup : Please find sql file 'DbAlterScriptV_0.0.1' and import it to database.

Feature added : 

1) Forgot Password with valid email : Email has a link with reset password token.

2) Reset password using valid token

3) Login screen changed.

4) Some minor design issues.


Initial Set Up Required Following Step :

1) git clone https://github.com/agdesigns/freshmetrics.git

2) Go to root path then run "npm install" 

3) App is running on 3000 port default so url will be http://localhost:3000

4) Step-3 will redirect to dashboard path.

Database setup

1) Go to folder 'db/dbconfig.js' from root =>
   change setting according to your credentiol for database

2) find 'dbscript.sql' in 'db/' from root and import it to your mysql server. 


Following Ui-navigation is working without Database intraction.

i)My Profile page
ii)My Team page
iii)Notification page
iv)Billing page
v)Logout : Will redirect to login page.
vi)Singup from login
vii) Login from Login : Will redirect to Dashboard.

This commit has  database setup please follow above steps.   
