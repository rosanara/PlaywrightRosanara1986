# CURA Healthcare Service Test Plan

## Application Overview

CURA Healthcare Service is a healthcare appointment booking application that allows users to login, create appointments, view appointment history, and manage their profiles. The application includes a login page, appointment booking form with multiple options (facility selection, healthcare program selection, hospital readmission checkbox), appointment confirmation, and appointment history viewing functionality.

## Test Scenarios

### 1. Login Scenarios

**Seed:** `seed.spec.ts`

#### 1.1. Login with Valid Credentials

**File:** `tests/login/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed with Username and Password fields
  2. Enter 'John Doe' in the Username field
    - expect: Username is populated in the field
  3. Enter 'ThisIsNotAPassword' in the Password field
    - expect: Password is populated (masked) in the field
  4. Click the Login button
    - expect: User is successfully logged in
    - expect: Redirected to the appointment booking page (#appointment)
    - expect: Navigation menu shows History, Profile, and Logout options

#### 1.2. Login with Invalid Username

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Enter 'InvalidUser' in the Username field
    - expect: Username is populated
  3. Enter 'ThisIsNotAPassword' in the Password field
    - expect: Password is populated
  4. Click the Login button
    - expect: Login fails
    - expect: Error message is displayed indicating invalid credentials
    - expect: User remains on the login page

#### 1.3. Login with Invalid Password

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Enter 'John Doe' in the Username field
    - expect: Username is populated
  3. Enter 'WrongPassword' in the Password field
    - expect: Password is populated
  4. Click the Login button
    - expect: Login fails
    - expect: Error message is displayed indicating invalid credentials
    - expect: User remains on the login page

#### 1.4. Login with Empty Username

**File:** `tests/login/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Leave the Username field empty
    - expect: Username field is empty
  3. Enter 'ThisIsNotAPassword' in the Password field
    - expect: Password is populated
  4. Click the Login button
    - expect: Either validation error for empty username is shown
    - expect: Or login fails with error message
    - expect: User remains on the login page

#### 1.5. Login with Empty Password

**File:** `tests/login/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Enter 'John Doe' in the Username field
    - expect: Username is populated
  3. Leave the Password field empty
    - expect: Password field is empty
  4. Click the Login button
    - expect: Either validation error for empty password is shown
    - expect: Or login fails with error message
    - expect: User remains on the login page

#### 1.6. Login with Both Fields Empty

**File:** `tests/login/both-fields-empty.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Leave both Username and Password fields empty
    - expect: Both fields are empty
  3. Click the Login button
    - expect: Validation errors are displayed for both fields
    - expect: Or generic error message is shown
    - expect: User remains on the login page

#### 1.7. Login with SQL Injection Attempt

**File:** `tests/login/sql-injection.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Enter "' OR '1'='1" in the Username field
    - expect: Username is populated with the injection string
  3. Enter 'password' in the Password field
    - expect: Password is populated
  4. Click the Login button
    - expect: SQL injection is prevented
    - expect: Login fails safely
    - expect: Error message is displayed

#### 1.8. Login with Special Characters in Username

**File:** `tests/login/special-chars-username.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Login page is displayed
  2. Enter '!@#$%^&*()' in the Username field
    - expect: Username is populated with special characters
  3. Enter 'ThisIsNotAPassword' in the Password field
    - expect: Password is populated
  4. Click the Login button
    - expect: Login fails with invalid credentials error
    - expect: User remains on login page

#### 1.9. Logout Functionality

**File:** `tests/login/logout.spec.ts`

**Steps:**
  1. Login with valid credentials (John Doe / ThisIsNotAPassword)
    - expect: User is logged in
    - expect: Appointment page is displayed
  2. Navigate to https://katalon-demo-cura.herokuapp.com/profile.php
    - expect: Profile page is displayed
  3. Click the Logout link
    - expect: User is successfully logged out
    - expect: Redirected to home page
    - expect: Navigation menu shows only Login option

### 2. Appointment Booking Scenarios

**Seed:** `seed.spec.ts`

#### 2.1. Book Appointment with Tokyo Facility and Medicare

**File:** `tests/appointment/book-appointment-tokyo-medicare.spec.ts`

**Steps:**
  1. Login with valid credentials (John Doe / ThisIsNotAPassword)
    - expect: User is logged in
    - expect: Appointment booking form is displayed
  2. Verify that Tokyo CURA Healthcare Center is selected by default in the Facility dropdown
    - expect: Tokyo CURA Healthcare Center is the selected facility
  3. Verify that Medicare is selected by default in Healthcare Program
    - expect: Medicare radio button is checked
  4. Ensure Apply for hospital readmission is unchecked
    - expect: Hospital readmission checkbox is unchecked
  5. Enter '28/02/2026' in the Visit Date field
    - expect: Date is populated in dd/mm/yyyy format
  6. Enter 'Regular checkup' in the Comment field
    - expect: Comment text is populated
  7. Click the Book Appointment button
    - expect: Appointment is booked successfully
    - expect: Confirmation page is displayed
    - expect: Confirmation shows: Tokyo CURA Healthcare Center, Medicare, 28/02/2026, Regular checkup
    - expect: Hospital readmission shows as 'No'

#### 2.2. Book Appointment with Hongkong Facility and Medicaid

**File:** `tests/appointment/book-appointment-hongkong-medicaid.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in on appointment page
  2. Select 'Hongkong CURA Healthcare Center' from the Facility dropdown
    - expect: Hongkong CURA Healthcare Center is now selected
  3. Select 'Medicaid' from Healthcare Program radio buttons
    - expect: Medicaid radio button is checked
  4. Enter '15/03/2026' in Visit Date
    - expect: Date is displayed in correct format
  5. Leave Comment field empty
    - expect: Comment field is empty (optional)
  6. Click Book Appointment
    - expect: Appointment is booked successfully
    - expect: Confirmation shows Hongkong facility and Medicaid program
    - expect: Comment shows as empty

#### 2.3. Book Appointment with Seoul Facility and None Healthcare Program

**File:** `tests/appointment/book-appointment-seoul-none.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in on appointment page
  2. Select 'Seoul CURA Healthcare Center' from Facility dropdown
    - expect: Seoul CURA Healthcare Center is selected
  3. Select 'None' from Healthcare Program radio buttons
    - expect: None radio button is checked
  4. Check the 'Apply for hospital readmission' checkbox
    - expect: Checkbox is checked
  5. Enter '01/05/2026' in Visit Date
    - expect: Date is populated
  6. Enter 'Post-operative followup' in Comment
    - expect: Comment is populated
  7. Click Book Appointment
    - expect: Appointment is booked successfully
    - expect: Confirmation shows Seoul facility, None program, hospital readmission as 'Yes'

#### 2.4. Book Appointment with Hospital Readmission Checked

**File:** `tests/appointment/book-appointment-readmission.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Select any facility
    - expect: Facility is selected
  3. Check the 'Apply for hospital readmission' checkbox
    - expect: Checkbox becomes checked
  4. Enter a valid future date in Visit Date field
    - expect: Date is populated
  5. Click Book Appointment
    - expect: Appointment is booked
    - expect: Confirmation page shows 'Apply for hospital readmission' as 'Yes'

#### 2.5. Book Appointment with Special Characters in Comment

**File:** `tests/appointment/book-appointment-special-chars.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Fill all required fields
    - expect: All fields are populated
  3. Enter '!@#$%^&*()_+-=[]{}|;:,.<>?' in the Comment field
    - expect: Special characters are displayed in the field
  4. Click Book Appointment
    - expect: Appointment is booked successfully
    - expect: Special characters are preserved in confirmation

#### 2.6. Book Appointment with Long Comment

**File:** `tests/appointment/book-appointment-long-comment.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Fill required fields and enter a very long comment (500+ characters)
    - expect: Long comment is accepted and displayed in the field
  3. Click Book Appointment
    - expect: Appointment is booked
    - expect: Full comment text is preserved in confirmation without truncation or data loss

### 3. Date Field Validation Scenarios

**Seed:** `seed.spec.ts`

#### 3.1. Book Appointment with Today's Date

**File:** `tests/appointment/date-today.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in on appointment page
  2. Enter today's date (20/02/2026) in Visit Date field
    - expect: Date is populated
  3. Fill other required fields
    - expect: All fields are populated
  4. Click Book Appointment
    - expect: System accepts today's date
    - expect: Appointment is booked successfully
    - expect: Or appropriate validation message is shown if same-day booking is not allowed

#### 3.2. Book Appointment with Past Date

**File:** `tests/appointment/date-past.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter a past date (10/02/2026) in Visit Date field
    - expect: Date is populated in the field
  3. Fill other required fields
    - expect: All fields are populated
  4. Click Book Appointment
    - expect: Either appointment is booked with past date
    - expect: Or validation error is shown preventing past date booking

#### 3.3. Book Appointment with Far Future Date

**File:** `tests/appointment/date-far-future.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter a far future date (20/02/2027) in Visit Date field
    - expect: Date is populated
  3. Fill other required fields
    - expect: All fields are populated
  4. Click Book Appointment
    - expect: Appointment is booked successfully

#### 3.4. Book Appointment with Invalid Date Format MM/DD/YYYY

**File:** `tests/appointment/date-invalid-format-mmddyyyy.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter date in MM/DD/YYYY format (02/28/2026) instead of dd/mm/yyyy
    - expect: Date is entered in the field
  3. Fill other required fields
    - expect: All fields are populated
  4. Click Book Appointment
    - expect: System either accepts it and interprets correctly
    - expect: Or shows validation error for incorrect format

#### 3.5. Book Appointment with Invalid Date Format YYYY-MM-DD

**File:** `tests/appointment/date-invalid-format-yyyymmdd.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter date in YYYY-MM-DD format (2026-02-28)
    - expect: Date is entered
  3. Fill other required fields with valid data
    - expect: Fields are populated
  4. Click Book Appointment
    - expect: System rejects the format and shows error
    - expect: Or interprets it correctly if flexible

#### 3.6. Book Appointment with Invalid Date (Non-existent)

**File:** `tests/appointment/date-non-existent.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter a non-existent date (30/02/2026) in Visit Date
    - expect: Date is entered in the field
  3. Fill other required fields
    - expect: All fields are populated
  4. Click Book Appointment
    - expect: System rejects the date and shows validation error
    - expect: Message indicates the date does not exist

#### 3.7. Book Appointment with Empty Date Field

**File:** `tests/appointment/date-empty.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in on appointment form
  2. Fill all fields except Visit Date
    - expect: All fields except Visit Date are populated
  3. Leave Visit Date field empty
    - expect: Visit Date field is empty
  4. Click Book Appointment
    - expect: Form validation error is shown for required Visit Date field
    - expect: Appointment is not booked
    - expect: User remains on the form

### 4. Appointment History and Confirmation Scenarios

**Seed:** `seed.spec.ts`

#### 4.1. View Appointment in History After Booking

**File:** `tests/appointment/view-history.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Book an appointment with specific details: Facility=Hongkong, Program=Medicaid, Date=15/03/2026, Comment='Test appointment'
    - expect: Appointment is booked successfully
  3. Navigate to the History page (https://katalon-demo-cura.herokuapp.com/history.php)
    - expect: History page is displayed
    - expect: Booked appointment is listed
  4. Verify the appointment details in history
    - expect: Facility: Hongkong CURA Healthcare Center
    - expect: Healthcare Program: Medicaid
    - expect: Visit Date: 15/03/2026
    - expect: Comment: Test appointment

#### 4.2. Multiple Appointments in History

**File:** `tests/appointment/multiple-history.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Book first appointment with Tokyo facility for 28/02/2026
    - expect: First appointment is booked
  3. Return to appointment form by clicking Make Appointment
    - expect: Appointment form is displayed with default values
  4. Book second appointment with Seoul facility for 15/03/2026
    - expect: Second appointment is booked
  5. Navigate to History page
    - expect: Both appointments are listed in history
    - expect: Each appointment shows correct details

#### 4.3. Appointment Confirmation Page Display

**File:** `tests/appointment/confirmation-page.spec.ts`

**Steps:**
  1. Login and book appointment with: Facility=Tokyo, Program=Medicare, Readmission=Yes, Date=28/02/2026, Comment='Routine checkup'
    - expect: Appointment is booked
  2. Verify confirmation page displays all details correctly
    - expect: Heading shows 'Appointment Confirmation'
    - expect: Facility: Tokyo CURA Healthcare Center
    - expect: Apply for hospital readmission: Yes
    - expect: Healthcare Program: Medicare
    - expect: Visit Date: 28/02/2026
    - expect: Comment: Routine checkup
  3. Click 'Go to Homepage' link on confirmation page
    - expect: User is redirected to home page

### 5. Navigation and UI Scenarios

**Seed:** `seed.spec.ts`

#### 5.1. Navigate Home from Different Pages

**File:** `tests/navigation/nav-home.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is on appointment form
  2. Click 'Home' in navigation menu
    - expect: User is navigated to home page
  3. Click 'Login' and log in again
    - expect: User is on appointment page
  4. Navigate to History page
    - expect: History page is displayed
  5. Click 'Home' link
    - expect: User is navigated to home page

#### 5.2. Navigate Using CURA Healthcare Title

**File:** `tests/navigation/nav-title.spec.ts`

**Steps:**
  1. Login and go to appointment page
    - expect: User is on appointment page
  2. Click 'CURA Healthcare' logo/title in navigation
    - expect: User is navigated to home page

#### 5.3. Access Make Appointment After Logout

**File:** `tests/navigation/nav-appointment-after-logout.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Click Logout
    - expect: User is logged out and on home page
  3. Click 'Make Appointment' button
    - expect: User is redirected to login page (profile.php#login)
    - expect: User must log in before accessing appointment form

#### 5.4. Profile Page Display

**File:** `tests/navigation/nav-profile-page.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Click 'Profile' in the navigation menu
    - expect: Profile page is displayed
    - expect: Page shows 'Under construction' message
    - expect: Logout link is available

### 6. Session Management Scenarios

**Seed:** `seed.spec.ts`

#### 6.1. Access Appointment Form Without Login

**File:** `tests/session/no-login-appointment.spec.ts`

**Steps:**
  1. Navigate directly to appointment page (https://katalon-demo-cura.herokuapp.com/index.php#appointment) without logging in
    - expect: Either redirected to login page
    - expect: Or appointment form is not displayed
    - expect: User cannot access appointment form without authentication

#### 6.2. Access History Without Login

**File:** `tests/session/no-login-history.spec.ts`

**Steps:**
  1. Navigate directly to history page (https://katalon-demo-cura.herokuapp.com/history.php) without logging in
    - expect: Either redirected to login page
    - expect: Or history is not displayed
    - expect: User cannot access history without authentication

#### 6.3. Session Persistence After Page Refresh

**File:** `tests/session/session-refresh.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in on appointment page
  2. Refresh the page (F5 or Ctrl+R)
    - expect: Page reloads while maintaining session
    - expect: Appointment form is still accessible
    - expect: User is still logged in

### 7. Edge Cases and Boundary Scenarios

**Seed:** `seed.spec.ts`

#### 7.1. Username with Whitespace and Case Sensitivity

**File:** `tests/edge-cases/username-whitespace.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter ' John Doe ' (with leading and trailing spaces) in Username
    - expect: Username is populated with spaces
  3. Enter valid password
    - expect: Password is populated
  4. Click Login
    - expect: System either trims spaces and logs in
    - expect: Or rejects with invalid credentials error

#### 7.2. Case Sensitivity in Login

**File:** `tests/edge-cases/username-case.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter 'john doe' (lowercase) in Username
    - expect: Username is populated
  3. Enter valid password
    - expect: Password is populated
  4. Click Login
    - expect: System either logs in if case-insensitive
    - expect: Or rejects if case-sensitive

#### 7.3. Rapid Consecutive Appointment Bookings

**File:** `tests/edge-cases/rapid-bookings.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Fill appointment form with valid data and submit
    - expect: Appointment 1 is booked
  3. Immediately fill and submit another appointment without delay
    - expect: Appointment 2 is booked successfully
    - expect: No race condition or duplicate booking issues

#### 7.4. Appointment Date Boundary - Leap Year

**File:** `tests/edge-cases/date-leap-year.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Enter 29/02/2026 in Visit Date field (invalid leap year date)
    - expect: Date is entered
  3. Fill other required fields
    - expect: Form is filled
  4. Click Book Appointment
    - expect: System rejects and shows validation error for invalid leap year date

#### 7.5. Maximum Length Input in Comment Field

**File:** `tests/edge-cases/max-comment.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Fill appointment form with valid data
    - expect: Form is filled
  3. Enter 10000 characters in Comment field
    - expect: Field either accepts up to max limit
    - expect: Or shows error when limit is exceeded
    - expect: Or truncates input
  4. Click Book Appointment
    - expect: System either books successfully
    - expect: Or shows error indicating field length exceeded

#### 7.6. Empty Session Cookie

**File:** `tests/edge-cases/empty-session.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Clear browser cookies/session data while on appointment page
    - expect: Session is cleared
  3. Attempt to navigate to History or Profile
    - expect: User is redirected to login page
    - expect: Session is properly terminated
