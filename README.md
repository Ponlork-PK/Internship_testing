# Product CRUD App

A full-stack product management system using:

- Backend: Node.js + Express + SQL Server
- Frontend: Flutter (Mobile App)
- Database: SQL Server

---

## API Base URL

http://localhost:5000


---

## Backend Setup (Node.js + Express + MSSQL)

### Prerequisites

- Node.js v18+  
- SQL Server installed and running (e.g., MSSQL Server Express)  
- Open SSMS
    For Authentication select "Windows Authentication"
- Create a database named `productdb` and table `PRODUCTS`

sql
```
CREATE TABLE PRODUCTS (
  PRODUCTID INT PRIMARY KEY IDENTITY(1,1),
  PRODUCTNAME NVARCHAR(100) NOT NULL,
  PRICE DECIMAL(10, 2) NOT NULL,
  STOCK INT NOT NULL
);
```

DB config is set directly in the file:
```
var dbConfig = {
  server: 'Your_SQLServer_name',
  database: 'productdb',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
  }
};
```

Install Dependencies
```npm install```

Dependencies used:
- express
- cors
- body-parser
- mssql
- msnodesqlv8
- nodemon

Run the server
```npm start```

Output:
Connected to database
Server running on port: http://localhost:5000


## Frontend Setup (Flutter)

### Requirements

- Flutter SDK installed
- Android Studio / VS Code
- Real device or emulator

### Install Packages
```flutter pub get```

### 📌 Notes for Real Devices

If running on a real device, replace localhost in the API base URL with your computer’s IP address in Flutter’s API service file:
```final String baseUrl = "http://192.168.x.x:5000"; // Replace with your PC IP```

## App Features
- Display product list from SQL Server
- Add product with validation:
	- Product Name is required
	- Price and Stock must be positive numbers
- Edit product with updated values
- Delete product with confirmation dialog
- Snackbar shows success/failure messages
- Uses Provider for state management
- CORS enabled for Flutter access



# Made by Ponlork
