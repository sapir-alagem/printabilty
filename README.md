<a name="br1"></a> 



<a name="br2"></a> 

Description of the main goals of the application

1\. The application will provide a convenient and fast printing service for a network of

printers.

2\. The application will provide great tools to manage and monitor the network of

printers.

3\. The application will enable various companies and users to have web access to

authorized printers.

Tech spec

●

General information

○

The agent will operate on Windows systems.

Will be developed on Windows machines.

○

○

We will work on a network of 1-2 computers and 1 printer.

We will also test on a network of a few computers and 2-3 printers.

●

Programming Language:

○

○

Agent - will be developed in Python.

Application server - will be developed using Ruby / Node.JS as the primary

programming language, and Ruby on Rails as a framework.

User interface - Vanilla JS (ES6), HTML, SCSS.

○

●

●

Database Management System:

○

APIs:

○

PostgreSQL.

OpenPrinting CUPS - <https://openprinting.github.io/cups/>

Stripe - <https://stripe.com/>

○

●

●

●

Version Control:

Git will be used for version control, allowing collaborative development and

easy tracking of code changes.

Deployment Platform:

The application will be deployed on AWS (Amazon Web Services) for reliable

hosting and scalability.

Authentication and Authorization:

OAuth 2.0 will be employed for user authentication.

○

○

○



<a name="br3"></a> 

Architecture description



<a name="br4"></a> 

DB Architecture



<a name="br5"></a> 

**Users stories**

*Our customers will be addressed as Clients, and the customers using the printers will be*

*Users.*

New company self-onboarding

Description**:** *This feature allows a new company to be created, configured, and ready to go,*

*by following a process with a few steps.*

Installation process stages**:**

**1. Downloading agent to a computer in the client’s network: (high**

**priority)**

**a.** The client follows an intuitive guide for installation.

**b.** The client downloads our setup agent - from a link provided by

us

**c.** Once downloaded - the client must run the download ﬁle.

**2. Setting up the ﬁrst printer: (high priority)**

**a.** After setup, the user should be able to perform a test print to

ensure the printer is functioning correctly.

**b.** Upon successful setup and testing, the user should receive

conﬁrmation that the printer is ready for use.

3\. **conﬁgure the printer platform: (high priority)**

**a.** Clients can print ﬁles without charge from the dashboard.

**b.** Clients can set and modify the pricing structure for print jobs.

**c.** Clients can enable or disable color printing, as per the

organization's requirements.

BYOD - Opening Printable app

**1. Open App: (high priority)**

**a.** The user scans the QR code which is displayed on the printer - this will

display a link to our web app.

**b.** The user opens a link to our web app.



<a name="br6"></a> 

Local PC - Opening Printable app

**1. Open App: (high priority)**

**a.** Users must be connected to the Wiﬁ of the client’s company.

**b.** The user opens our app via Google Chrome browser.

General printing process

1\. **Printing ﬁles as a user (high priority)**

a. **Description**: The user begins the printing process by clicking on the

"upload ﬁle" button.

**b. User Interaction:**

i. Locates and selects the "upload ﬁle" option.

ii. Chooses a ﬁle from the ﬁle explorer on their device.

iii. Initiates the printing process.

**2. Selecting Printing Location: (low priority)**

**a. Description**: If multiple locations are available under the company, the

user must specify the location from which they want to perform the

printing.

**b. User Interaction:**

i. Choose the desired printing location from a list of available

options.

**3. Setting Printing Preferences: (high priority)**

**a. Description**: The user customizes printing settings, including

double-sided printing, page size, color preferences, and more.

**b. User Interaction:**

i. Conﬁgures printing preferences based on their requirements.

**4. Calculating Printing Cost: (high priority)**

**a. Description:** The system calculates the cost of the print job based on

selected preferences and other factors.

**b. User Interaction:**

i. Views the calculated cost of the print job.

**5. Conﬁrming Print Submission: (high priority)**

**a. Description:** The user conﬁrms the print submission, indicating their

readiness to proceed with the printing.

**b. User Interaction:**

i. Acknowledges and conﬁrms the print job submission.

ii. The print server will identify an available printer that is not

currently in use and transmit the print job to it.



<a name="br7"></a> 

**6. Entering Payment Details: (high priority)**

a. The customer will conﬁrm the payment

b. Upon clicking the payment conﬁrmation, the customer will be directed

to the transaction API server

**c. User Interaction:**

i. Enter the necessary payment details for processing.

**7. Print Status Tracker: (mid priority)**

**a. Description:** Upon completion of printing, a notiﬁcation is sent to

conﬁrm the print job's completion. Users may also have the option to

provide feedback.

**b. User Interaction:**

i. Receives a notiﬁcation indicating the successful completion of

the print job.

ii. May provide feedback if the option is available.

**8. Previewing Print Job: (low priority)**

**a. Description**: Users have the option to preview the print job before

conﬁrming the submission.

**b. User Interaction:**

i. Views a preview of the print job to ensure accuracy.

Competition:

Princh - <https://princh.com/>

● Main differences between our idea and Princh’s

○ **Installation** - to use Princh, customers must make an

appointment with Princh IT person, who will set the software onto

the printers and computer network.

○ **High customer service**:

■ Customers get the installation and any needed updates

remotely and need to do nothing on their own.

■ Fast human service.

■ Knowledge base and documentation.

○ **Scan & Copy** - Princh allows its users to print, scan, and copy.

○ **Local PC**- Princh allows local PC printing.



<a name="br8"></a> 

● Main similarity between our idea and Princh’s

○ **No onboarding printing**- allows you to print ﬁles from your own

device in guest mode after payment is made successfully.

○ **Payments API**- payments are also made via another service

provider API.

○ **Payments** - An annual subscription that includes everything and

all printing revenue goes to the client

○ **BYOD**  - both allow BYOD printing.

Phase 2 - More than MVP

**1. Security**

**a.** Downloading an agent to the customer's network should be

protected and prevent external access to our server from our

agent.

**b.** Sending print jobs should be secured as it happens as web

requests.

2\. **Signing in with a Google account**

a. Allowing printers users to log in with their accounts to have print

history.

**b.** Personal Wallet- allowing users to buy several prints instead of

payment for each print.

3\. **Printer prioritizing** - choosing to prioritize a printer over others in the

same network when other printers have more printing jobs to execute,

and the printer is close geographically to the user's location.



<a name="br9"></a> 

4\. **User Registration and Login/Logout:**

**a. Registration:**

i. **Description**: This state involves a user registering under a

speciﬁc company. It requires the user to log in with three

identiﬁcation details: company code, username, and an initial

(temporary) password provided by the company.

ii. **User Interaction:**

1\. Enter the company code, username, and initial password

during the registration process.

2\. Submits the information for veriﬁcation.

3\. After the ﬁrst login, the user is prompted to set a new,

personalized password.

**b. Login:**

i. **Description**: This state involves a user entering identiﬁcation

details including the company code, username, and password.

ii. **User Interaction**:

1\. Inputs the company code, username, and password.

2\. Submits the information to authenticate the user.

3\. Gains access to the app's features upon successful login.

**c. Logging Out:**

i. **Description:** This state involves the user logging out of their

account, and terminating the current session.

ii. **User Interaction:**

1\. Accesses the logout or sign-out option.

2\. Conﬁrms the decision to log out.

3\. Exits the app or is redirected to the login screen.



<a name="br10"></a> 

