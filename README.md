# URL Shortener

A full-stack URL shortener web application built with Node.js, Express, MongoDB, and EJS. Users can register, log in, shorten URLs, view analytics, and manage their links. The app features authentication, user roles, and a responsive UI.

---

## Features

* **User Authentication:** Sign up and log in with email and password.
* **URL Shortening:** Generate short links for long URLs.
* **User Roles:** Supports `NORMAL` and `PRO` users with different access levels.
* **Analytics:** Track total clicks and visit history for each short URL.
* **Admin Panel:** `PRO` users can view all URLs in the system.
* **Responsive UI:** Clean, modern interface with custom CSS for home, login, and signup pages.

---

## Project Structure

```
C:.
│   connection.js
│   index.js
│   package-lock.json
│   package.json
│
├───controllers
│       url.js
│       user.js
│
├───middlewares
│       auth.js
│
├───models
│       url.js
│       user.js
│
├───public
│   └───css
│           home.css
│           login.css
│           signup.css
│
├───routes
│       static.js
│       url.js
│       user.js
│
├───Service
│       auth.js
│
└───views
        home.ejs
        login.ejs
        signup.ejs
```

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kris143k/URL-Shortener
   cd urlshortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start MongoDB:** Make sure MongoDB is running locally on port `27017` (default) or on atlas cloud.

4. **Start the server:**

   ```bash
   node index.js
   ```

5. **Visit the app:** Open `http://localhost:8001` in your browser.

---

## Usage

* **Sign Up:** Register a new account via `/signup`.
* **Log In:** Log in with your credentials at `/login`.
* **Shorten URLs:** Use the home page form to generate short links.
* **View Your URLs:** See your own URLs and analytics on the home page.
* **Admin Access:** If your account has the `PRO` role, visit `/admin/urls` to see all URLs.

---

## API Endpoints

| Method | Route                     | Description                      | Auth Required | Role        |
| ------ | ------------------------- | -------------------------------- | ------------- | ----------- |
| POST   | `/user/`                  | Register a new user              | No            | -           |
| POST   | `/user/login`             | Log in and receive session token | No            | -           |
| GET    | `/`                       | Home page, list user's URLs      | Yes           | NORMAL, PRO |
| GET    | `/admin/urls`             | List all URLs (admin only)       | Yes           | PRO         |
| POST   | `/url/`                   | Create a new short URL           | Yes           | NORMAL, PRO |
| GET    | `/url/analytics/:shortId` | Get analytics for a short URL    | Yes           | NORMAL, PRO |
| GET    | `/url/:shortId`           | Redirect to the original URL     | No            | -           |

---

## Authentication & Authorization

* **Cookies:** Auth tokens are stored in cookies (`uid`).
* **Middleware:**

  * `checkForAuth`: Checks for valid authentication.
  * `restrictTo`: Restricts routes based on user roles.

---

## Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB (via Mongoose)
* **Frontend:** EJS templates, custom CSS
* **Other:** cookie-parser, jsonwebtoken, nanoid, uuid

---

## Customization

* **Styling:**

  * `public/css/home.css` - Home/dashboard page styles
  * `public/css/login.css` - Login page styles
  * `public/css/signup.css` - Signup page styles

* **Views:**

  * `views/home.ejs`   - Main dashboard
  * `views/login.ejs`  - Login form
  * `views/signup.ejs` - Signup form

---

## Example Code Snippets

### Shorten a URL

```js
// POST /url/
const shortID = nanoid();
await URL.create({
  shortId: shortID,
  redirectURL: req.body.url,
  visitHistory: [],
  createdBy: req.user._id,
});
res.render("home", { id: shortID, redirectUrl: req.body.url });
```

### User Signup

```js
// POST /user/
const user = await User.create({ name, email, password });
return res.redirect("/");
```

### Redirect Logic

```js
// GET /url/:shortId
const entry = await URL.findOneAndUpdate(
  { shortId },
  { $push: { visitHistory: { timestamp: Date.now() } } }
);
res.redirect(entry.redirectURL);
```

---

## License

ISC

---

## Author

krish patel

---

## Notes

* Ensure MongoDB is running before starting the server.
* Default port is `8001`. Change in `index.js` if needed.
* No automated tests included yet.
