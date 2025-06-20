
## Salesmen Dashboard Backend — README

---

### What is this repository for?

This repository provides the **backend API** for the **Salesmen Dashboard**.
It exposes RESTful services to:

* **Add** a new salesman with manually provided 12-month sales history.
* **Retrieve** a list of salesmen with last month’s sale.
* **Update** or **delete** a salesman.
* **Get** a detailed summary (total, average, monthly breakdown) for a salesman.

Built with **Node.js, Express, and TypeScript** using a clean **Controller-Service-DAO pattern**.

---

### Version

**v1.0.0** — Initial version with full CRUD and summary endpoints.

---

### Quick Summary

**Tech Stack**

* Node.js
* Express
* TypeScript
* MongoDB (via Mongoose, assumed)
* Structured with Controller → Service → DAO → Model layers.

---

### How do I get set up?

1. **Clone the repository**

   ```bash
   git clone https://github.com/SreelekhaShownaka/custuk-sales-app.git
   cd salesmen-dashboard-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file:

   ```
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/salesApp-db
   ```

4. **Start the server (dev mode)**

   ```bash
   npm run dev
   ```

   Or build and run:

   ```bash
   npm run build
   npm start
   ```

5. **Server runs at:**

   ```
   http://localhost:8080
   ```

---

### Configuration

* `.env` holds environment-specific values.
* Ensure MongoDB is running and accessible at your URI.

---

### Dependencies

| Package    | Purpose                     |
| ---------- | --------------------------- |
| express    | REST framework              |
| typescript | Type safety and compilation |
| mongoose   | MongoDB modeling            |
| nodemon    | Auto-reload for dev         |
| dotenv     | Load environment variables  |

---

### Database Structure

**Collection:** `salesmen`

Each document includes:

```json
{
  "id": 1,
  "name": "John Doe",
  "sales": [1000, 1200, 1100, ...] // Provided manually by client request
}
```

---

### API Endpoints

| Method     | Endpoint                                | Description                              |
| ---------- | --------------------------------------- | ---------------------------------------- |
| **POST**   | `/salesmen/addSalesman`                 | Add a new salesman with full sales array |
| **GET**    | `/salesmen/getSalesman`                 | Get all salesmen with last month’s sale  |
| **DELETE** | `/salesmen/deleteSalesman/:id`          | Delete a salesman by ID                  |
| **PUT**    | `/salesmen/updateSalesman/:id`          | Update a salesman’s name                 |
| **GET**    | `/salesmen/getSalesmanById/:id/summary` | Get detailed summary for a salesman      |

---

### Request Example: Add Salesman

**POST** `/salesmen/addSalesman`

**Payload:**

```json
{
  "id": 1,
  "name": "John Doe",
  "sales": [1200, 1300, 1250, 1400, 1350, 1500, 1550, 1600, 1700, 1750, 1800, 1900]
}
```

**Response:**

```json
{
  "data": "Salesman created successfully",
  "salesman": {
    "id": 1,
    "name": "John Doe",
    "sales": [1200, 1300, ...]
  }
}
```

**Note:** The `sales` array **must contain 12 values**, representing sales for each month.

---

### How to run tests

* No automated tests included yet.
* Recommended: Use **Jest** and **Supertest** for unit and integration testing.

---

### Deployment instructions

1. **Build:**

   ```bash
   npm run build
   ```

2. **Run:**

   ```bash
   npm start
   ```

3. Use a production process manager (e.g., **PM2**) or a container (e.g., **Docker**) for robust deployment.

---

### Contribution guidelines

* Use clear branch names: `feature/xyz` or `bugfix/xyz`.
* Keep controllers thin; business logic belongs in services.
* Validate request payloads.
* Use async/await properly with try/catch or `.then/.catch`.

---

### Writing tests

* Suggested stack: Jest + Supertest.
* Use a test database or mock Mongoose.

---

### Code review

* Keep API routes RESTful.
* Return consistent response formats.
* Follow TypeScript best practices.
* Log errors clearly.

---

## Ready to integrate

This backend works seamlessly with your **Salesmen Dashboard Frontend**.

---

