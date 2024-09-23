import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

const InvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    invoiceNumber: '',
    date: '',
    items: [{ description: '', quantity: 0, price: 0 }] as InvoiceItem[],
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 0, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const InvoicePreview: React.FC = () => (
    <div ref={componentRef} className="bg-white p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Invoice</h1>
      <div className="mb-4">
        <p><strong>Customer:</strong> {invoiceData.customerName}</p>
        <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
        <p><strong>Date:</strong> {invoiceData.date}</p>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">Description</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">${item.price.toFixed(2)}</td>
              <td className="text-right">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <p><strong>Total: ${calculateTotal().toFixed(2)}</strong></p>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
      <div className="mb-4">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={invoiceData.customerName}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="date"
          value={invoiceData.date}
          onChange={handleInputChange}
          className="border p-2"
        />
      </div>
      {invoiceData.items.map((item, index) => (
        <div key={index} className="mb-2 flex items-center">
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
            className="border p-2 mr-2 flex-grow"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
            className="border p-2 mr-2 w-20"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
            className="border p-2 mr-2 w-24"
          />
          <button onClick={() => removeItem(index)} className="bg-red-500 text-white p-2 rounded">
            Remove
          </button>
        </div>
      ))}
      <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Item
      </button>
      <div>
        <button onClick={() => setShowPreview(true)} className="bg-green-500 text-white p-2 rounded mr-2">
          Preview
        </button>
        <button onClick={handlePrint} className="bg-purple-500 text-white p-2 rounded">
          Download PDF
        </button>
      </div>
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded max-w-3xl max-h-screen overflow-auto">
            <InvoicePreview />
            <button onClick={() => setShowPreview(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;