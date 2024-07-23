## CRM

This CRM application is designed to help businesses manage customer relationships efficiently. It offers features for:

- Manage customer profiles effectively.
- Track and analyze communication history.
- Gather valuable customer feedback.
- Generate insightful reports for data-driven decision making.

The application leverages a full-stack development approach:

- **Frontend:** React
- **Backend:** Node.js (Express.js) & MongoDB

**Features**

- **Robust User Management:**
    - Secure login and registration processes.
    - Role-based access control (Admin, Manager, Employee) for enhanced security.
- **Comprehensive Customer Management:**
    - CRUD (Create, Read, Update, Delete) functionalities for customer profiles.
    - Track customer purchase history and preferences for personalized experiences.
- **Streamlined Communication Tracking:**
    - Record and manage all customer interactions (emails, meetings) for a centralized view.
    - Maintain a detailed communication history for future reference.
- **Efficient Feedback and Query Handling:**
    - Collect and manage employee feedback to improve internal processes.
    - Provide timely responses to employee inquiries, enhancing satisfaction.
- **Detailed Reports and Analytics:**
    - Generate reports on key CRM metrics, such as lead conversion rates and source & status analysis.
    - Utilize data visualization tools for clear and actionable insights.

**Key Application Components**

- **Registration Form:** Creates a new user account and set user role as `new`. Admin only set user role.
- **Login Form:** Access based on designated role
- **Dashboard:** Role-specific dashboards displaying customer statistics and conversion rates (Admin/Manager/Employee)
- **User Management:** User list with role assignment and deletion (Admin-only)
- **Customer Management:**
    - Customer list with search options
    - Detailed customer profiles with conditional access (Admin: edit/delete, Manager: edit, Employee: view)
    - Service assignment (Admin -> Manager -> Employee)
- **Communication Management:** Form for logging and viewing customer interactions
- **Feedback Management:** Feedback submission (Employee) and response system (Management)
- **Reporting:** List of generated reports

**React Application Routes**

- `/`: Home page
- `/login`: Login and Registration functionalities
- `/create`: Dedicated route for new user registration
- `/forgot-password`: Link generation for password reset
- `/reset-password`: Route to complete password reset process
- `/dashboard`: Role-specific dashboard (Admin, Manager, Employee)
- `/create-new`: Admin-restricted route for creating new customers
- `/customer`: Role-based customer view (Admin: all, Manager: assigned, Employee: assigned by manager)
- `/overview`: Detailed customer profile with relevant information
- `/users`: Admin-only route for managing user accounts and roles
- `/communication`: Send emails and view communication history for each customer
- `/feedback`: Employee feedback submission and Management response system

**Default Credentials (Development Only)**

**Please note:** The following credentials are solely for development purposes and should be replaced with secure credentials in production environments.

- **Admin:**
    - Email: `admin@gmail.com`
    - Password: `admin`
- **Manager:**
    - Email: `manager@gmail.com`
    - Password: `12345`
- **Employee:**
    - Email: `employee@gmail.com`
    - Password: `12345`

**Development Setup**

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository using Git.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.
5. Access the application in your browser at http://localhost:3000/.

**Additional Notes**

- It's recommended to remove the default credentials section entirely for production environments.
- Consider including a section on contributing to the project if applicable (e.g., for open-source projects).