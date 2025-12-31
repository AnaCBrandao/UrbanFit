# 🏃‍♀️ UrbanFit

UrbanFit is a system developed during my undergraduate studies with the goal of connecting people to physical activity practices within their local community.  
The platform allows users to discover **events, groups, and challenges** that promote **health, well-being, and social interaction**.

## 🛠️ Technologies Used

### Frontend
- Angular
- TypeScript
- HTML5 & SCSS

### Backend
- Spring Boot
- Java
- RESTful APIs

### Other Tools
- Node.js & npm
- Git & GitHub
- Mapbox API (https://www.mapbox.com/)

## 📁 Project Structure
UrbanFit/

├── frontend/ # Angular application

├── backend/ # Spring Boot application

├── screens/ # Application screens / UI references

├── .vscode/ # VS Code configuration

├── README.md # Project documentation

├── package-lock.json


## ▶️ How to Run the Project

### Frontend (Angular)
`cd frontend`
`npm install`
`npm run start`

Some files downloaded by npm install may be in ".css" format. If you get errors in the console, simply rename them to ".scss".
The application should be available at:
http://localhost:4200

### Backend (Spring Boot)
`cd backend`
`mvn spring-boot:run`

The backend will run by default at:
http://localhost:8080

> To use the Mapbox geolocation API with your access key(you can get one in https://www.mapbox.com/), replace the value of "mapboxToken" in environment.ts file.
> Make sure you have Node.js, Angular CLI, Java JDK, and Maven properly installed.

## 📚 Academic Context

This project was developed as part of my **graduation requirements**, integrating concepts of:
- Software Engineering
- Web Development
- REST APIs
- Full-stack application architecture

## 👩‍💻 Author

**Ana Brandão**  
GitHub: [AnaCBrandao](https://github.com/AnaCBrandao)

## 📄 License

This project is for academic purposes.  
Feel free to explore, study, and adapt the code with proper credit.
