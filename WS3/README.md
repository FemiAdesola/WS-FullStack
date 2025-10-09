# WS-3: Hands-on Exercises
## 🎬 OMDb Movie Browser

> A simple **Node.js + Express** web app that browse and search movies from the [OMDb API](https://www.omdbapi.com/).  
The app uses **Bootstrap (via jsDelivr CDN)** for styling — all in a single `movies.js` file.  

## **View the live of movie result website link [here](https://ws-fullstack.onrender.com/)**

<details>
<summary>👉Click to expand and see the details</summary>

---

## Features
- Fetches movie data from [OMDb](https://www.omdbapi.com/)  
- Displays results in a clean Bootstrap-styled table  
- Includes a search box to look up any movie title  
- Default view shows *Star Wars* movies  
- All logic (server + HTML rendering) is in **one file** (`movies.js`)  

---

## Requirements
- **Node.js** (v14 or higher recommended)
- **NPM**

---

## Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/FemiAdesola/WS-FullStack.git
   cd WS-FullStack/WS3
   ```

2. **Install dependencies**
   ```bash
   npm install express axios
   ```

3. **Get a free OMDb API key**
   - Visit [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
   - Choose the **Free** plan  
   - Enter your email and confirm  
   - Copy your **API key**

4. **Open `sermoviesver.js`** and replace:
   ```js
   const API_KEY = "xxxxxxxxx";
   ```
   with your own API key.

---

## Run the Server
```bash
node movies.js
```

Then open your browser and go to:  
👉 **[http://localhost:4000](http://localhost:4000)**

---

## Usage
- The page will load movies for **“Star Wars”** by default.

![FrontPage](/WS3/img/FrontPage.png)

- To search for something else:
  1. Type a title like **Batman** in the search bar.  
  2. Press **Enter** or click **Search**.  
  3. The page will reload with new results.

![Batmane](/WS3/img/Batman.png)

---

## How It Works
- Express serves `/` route.  
- Server requests movie data from OMDb using Axios.  
- The HTML page (with Bootstrap) is dynamically generated and sent to the browser.  
- Users can search via query parameter `?s=movie_name`.

---

## Built With
- [Express](https://expressjs.com/) – Web framework for Node.js  
- [Axios](https://axios-http.com/) – For HTTP requests  
- [Bootstrap 5](https://getbootstrap.com/) via [jsDelivr CDN](https://www.jsdelivr.com/)

---
</details>