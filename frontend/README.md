
## **Salesmen Dashboard Frontend — README**

---

### **What is this repository for?**

This project is a **React + TypeScript Single Page Application (SPA)** to **manage salesmen data**. It displays a sortable table, supports **Add**, **Edit**, **Delete**, shows a **summary modal** for individual salesmen, and visualizes the **Top 5 salesmen** based on last month’s sales in a bar chart.

---

### **Version**

* `v1.0.0` — Initial version with fully functional:

  * Table with CRUD (Add, Edit, Delete)
  * Summary modal with total, average, and monthly sales
  * Top 5 comparison bar chart

---

### **Quick Summary**

**Tech Stack:**

* React 
* TypeScript
* TanStack Table (`@tanstack/react-table`)
* Recharts (`recharts`)

---

### **How do I get set up?**

#### **Setup Steps**

1️. **Clone the repository**

```bash
git clone https://github.com/SreelekhaShownaka/custuk-sales-app.git
cd salesmen-dashboard-frontend
```

2️. **Install dependencies**

```bash
npm install
```

3️. **Run the project locally**

```bash
npm start
```

4️. **Open in your browser**

http://localhost:3000
```

---

### **Configuration**

No special configuration is needed for local use.

**API calls** expect these backend endpoints:

* `/salesmen/getSalesman`
* `/salesmen/getSalesmanById/:id/summary`
* `/salesmen/addSalesman`
* `/salesmen/updateSalesman/:id`
* `/salesmen/deleteSalesman/:id`


---

### **Dependencies**

| Library                   | Purpose         |
| ------------------------- | --------------- |
| **react**                 | Core framework  |
| **typescript**            | Type safety     |
| **@tanstack/react-table** | Dynamic table   |
| **recharts**              | Chart rendering |

---

### **Backend API Requirements**

| Endpoint                                | Method | Description                                                |
| --------------------------------------- | ------ | ---------------------------------------------------------- |
| `/salesmen/getSalesman`                 | GET    | Get all salesmen                                           |
| `/salesmen/getSalesmanById/:id/summary` | GET    | Get a salesman's total, average, and monthly sales history |
| `/salesmen/addSalesman`                 | POST   | Add a new salesman (name, random sales, last month sale)   |
| `/salesmen/updateSalesman/:id`          | PUT    | Update a salesman's name                                   |
| `/salesmen/deleteSalesman/:id`          | DELETE | Delete a salesman by ID                                    |

**Sample Response for `/salesmen/getSalesman`:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "lastMonthSale": 2500
    }
  ]
}
```

**Sample Response for `/salesmen/getSalesmanById/:id/summary`:**

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "sales": [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400],
    "total": 26400,
    "average": 2200
  }
}
```

---

### **Key Features**

 **Table** — view all salesmen, sortable by ID.
 **Add Salesman** — via modal, generates random sales data.
 **Edit Salesman** — update name via modal.
 **Delete Salesman** — confirmation popup, removes salesman.
 **Summary Modal** — total & average sales with month-wise breakdown.
 **Top 5 Bar Chart** — shows top performers based on last month’s sales.

---

### **How to run tests**

 No automated tests yet.

## **Frontend User Flow**

| Screen              | Action                                   |
| ------------------- | ---------------------------------------- |
| Main Page           | Shows all salesmen in a table            |
| Add Salesman Button | Opens modal to add new salesman          |
| Edit Button         | Opens modal to edit salesman’s name      |
| Delete Button       | Confirms and deletes selected salesman   |
| Summary Button      | Opens modal with total, average, history |
| Top 5 Bar Chart     | Always visible below the table           |

---

