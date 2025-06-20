import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface Salesman {
  id: number;
  name: string;
  lastMonthSale: number;
}

interface Summary {
  id: number;
  name: string;
  sales: number[];
  total: number;
  average: number;
}

const SalesmenTable: React.FC = () => {
  const [salesmen, setSalesmen] = useState<Salesman[]>([]);
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');

  const [editingSalesman, setEditingSalesman] = useState<Salesman | null>(null);
  const [editName, setEditName] = useState('');

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    fetch('/salesmen/getSalesman')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = [...data.data].sort(
          (a, b) => Number(a.id) - Number(b.id)
        );
        setSalesmen(sortedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSummaryClick = (id: number) => {
    fetch(`/salesmen/getSalesmanById/${id}/summary`)
      .then((response) => response.json())
      .then((data) => {
        setSummaryData(data.data);
        setShowModal(true);
      })
      .catch((error) => console.error('Error fetching summary:', error));
  };

  const handleDelete = async (id: number) => {
    const salesman = salesmen.find((s) => s.id === id);
    if (!salesman) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${salesman.name}?`
    );
    if (!confirmed) return;

    try {
      await fetch(`/salesmen/deleteSalesman/${id}`, { method: 'DELETE' });
      setSalesmen((prev) => prev.filter((s) => s.id !== id));
      alert(`Salesman "${salesman.name}" deleted successfully.`);
    } catch (err) {
      console.error('Error deleting salesman:', err);
      alert('Failed to delete salesman. Please try again.');
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) {
      alert('Name cannot be empty');
      return;
    }
    const newId = Math.max(0, ...salesmen.map((s) => s.id)) + 1;
    const randomSales = Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 5000) + 1000
    );
    const lastMonthSale = randomSales[randomSales.length - 1];

    const newSalesman = {
      id: newId,
      name: newName.trim(),
      sales: randomSales,
      lastMonthSale,
    };

    try {
      await fetch(`/salesmen/addSalesman`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSalesman),
      });
      setSalesmen((prev) => [...prev, newSalesman]);
      setNewName('');
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding salesman:', err);
      alert('Failed to add salesman.');
    }
  };

  const openEditModal = (salesman: Salesman) => {
    setEditingSalesman(salesman);
    setEditName(salesman.name);
  };

  const handleUpdate = async () => {
    if (!editingSalesman) return;

    try {
      await fetch(`/salesmen/updateSalesman/${editingSalesman.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      setSalesmen((prev) =>
        prev.map((s) =>
          s.id === editingSalesman.id ? { ...s, name: editName } : s
        )
      );
      alert(`Salesman name updated to "${editName}" successfully.`);
      setEditingSalesman(null);
      setEditName('');
    } catch (err) {
      console.error('Error updating salesman:', err);
      alert('Failed to update salesman.');
    }
  };

  const columns: ColumnDef<Salesman>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Last Month Sale',
      accessorKey: 'lastMonthSale',
    },
    {
      header: 'Summary',
      cell: ({ row }) => (
        <button onClick={() => handleSummaryClick(row.original.id)}>
          Summary
        </button>
      ),
    },
    {
      header: 'Edit',
      cell: ({ row }) => (
        <button onClick={() => openEditModal(row.original)}>Edit</button>
      ),
    },
    {
      header: 'Delete',
      cell: ({ row }) => (
        <button
          className="delete-button"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: salesmen,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const top5 = [...salesmen]
    .sort((a, b) => b.lastMonthSale - a.lastMonthSale)
    .slice(0, 5);

  return (
    <div className="App">
      <div className="table-container">
        <h2>Salesmen Table</h2>

        <button onClick={() => setShowAddModal(true)}>+ Add Salesman</button>

        <div className="table-scroll">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <div className="empty-state">
                    No salesmen found. Click "Add Salesman" to get started.
                  </div>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="graph-container">
        <h2>Top 5 Salesmen - Last Month Sale</h2>
        {top5.length === 0 ? (
          <div className="graph-empty-state">
            Not enough data to display the graph. Please add salesmen.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top5}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lastMonthSale" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {showModal && summaryData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Salesman Summary</h3>
            <p>
              <strong>Total Sales:</strong> {summaryData.total}
            </p>
            <p>
              <strong>Average Sales:</strong> {summaryData.average}
            </p>
            <h4>History:</h4>
            <div>
              {summaryData.sales.map((val, index) => (
                <div key={index}>
                  <strong>{monthNames[index] || `Month ${index + 1}`}:</strong>{' '}
                  {val}
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Salesman</h3>
            <input
              type="text"
              placeholder="Enter name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />

            <div className="modal-button-group">
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editingSalesman && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Salesman</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />

            <div className="modal-button-group">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingSalesman(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesmenTable;
