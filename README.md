# Neha Home Healthcare Website

This React/Vite project provides booking and rental functionality for Neha Home
Healthcare. Customer details are emailed to `jaydev0018@gmail.com` via
[EmailJS](https://www.emailjs.com/) whenever a booking or rental request is
made.

To enable email notifications, create a free EmailJS account and configure a
service and email template. Replace the placeholder `YOUR_SERVICE_ID`,
`YOUR_TEMPLATE_ID` and `YOUR_USER_ID` values in `src/lib/leadEmail.js` with your
own credentials. You may also store them in a `.env` file (listed in
`.gitignore`) and load them via environment variables.
