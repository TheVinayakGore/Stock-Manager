## 📦 Stock-Manager

Stock-Manager is a full-stack Inventory Management Web Application built using the MERN stack. It helps you efficiently manage products, categories, and stock levels in real time. The app is responsive, secure, and built for scalability.

🔗 [Live Demo](https://ownstockmanager.vercel.app/)

## 🚀 Tech Stack
-	Frontend : Next.js 14+, React.js, JavaScript, Tailwind CSS, Shadcn UI
-	Backend : Node.js, Express.js
-	Database : [MongoDB Atlas](https://account.mongodb.com/account/login) (cloud-based storage)
-	Auth : Custom (or extendable with [Clerk/Auth.js](https://clerk.com/))
-	Deployment : Vercel (Frontend), MongoDB Atlas (DB)


## ✅ Features
-	📦 Add, update & delete inventory items
-	🏷️ Categorize products
-	📊 Track stock levels in real time
-	🔍 Search & filter products
-	📱 Fully responsive design
-	⚙️ Built with scalable and maintainable code architecture
-	🧠 Easily customizable and extendable
-	🔐 Authentication-ready structure


## 🗂️ Project Structure

```bash
├── app             # Next.js app router logic
├── components      # UI components using Shadcn UI
├── lib             # Utility & DB connection helpers
├── public          # Static files and assets
├── README.md
├── next.config.mjs # Next.js configuration
└── ...
```


## 🛠 Getting Started

1. Clone the repository

```bash
git clone https://github.com/TheVinayakGore/Stock-Manager.git
cd Stock-Manager
```

2. Install dependencies

```bash
npm install
```

3. Add your environment variables

Create a .env.local file :

```bash
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.


## 📤 Deploy Your Own

Want to deploy your own version of Stock-Manager ?

You can easily deploy it using Vercel in just a few steps :

## 🚀 Steps to Deploy on Vercel

1.	Push the project to GitHub
  -	Make sure your code is committed and pushed to a GitHub repository.
2.	Login to Vercel
  -	Go to vercel.com and sign in with GitHub.
3.	Import your GitHub Repository
	-	Click on + New Project → Import Git Repository.
	-	Select the Stock-Manager repo from the list.
4.	Configure Environment Variables
	-	Add your environment variables during the setup:

```bash
MONGODB_URI=your_mongodb_connection_string
```

5.	Choose Framework Preset
	-	Vercel will auto-detect the Next.js framework. Leave the default settings unless custom.
6.	Deploy
	-	Click Deploy and wait for Vercel to build and deploy your app.
	-	Once done, you’ll get a live URL like:

```bash
https://your-project-name.vercel.app
```

7.	Post-Deployment
	-	Optionally, go to your project settings on Vercel and :
	-	Set up a custom domain.
	-	Configure automatic re-deployment on GitHub pushes.
	-	Enable serverless function logs and analytics.

🔗 Vercel Docs - [Getting Started](https://vercel.com/docs/getting-started-with-vercel)


## 🧩 Future Enhancements

-	🔐 Add JWT/Auth.js/Clerk-based user authentication
-	📈 Add analytics/dashboard to monitor inventory
-	📤 Export inventory as CSV/PDF
-	📱 PWA support for mobile usage

## 📫 Connect

Built with ❤️‍🩹 by Vinayak Gore

For queries or feedback, feel free to connect : [@vinayakgore.vercel.app](https://vinayakgore.vercel.app)

Let me know if you’d like a badge section, GIF demo preview, or GitHub stats added as well !


💻 Happy coding ! 🎉

⌲ Design.Implement.Inspire
