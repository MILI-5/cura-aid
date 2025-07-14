import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_12345'); // Replace with your real Stripe publishable key

const mockTransactions = [
  { id: 'txn_1', date: '2024-06-01', amount: 100, status: 'Paid', method: 'Card', invoice: true, refundable: true },
  { id: 'txn_2', date: '2024-05-15', amount: 50, status: 'Refunded', method: 'Card', invoice: true, refundable: false },
  { id: 'txn_3', date: '2024-05-10', amount: 75, status: 'Pending', method: 'Card', invoice: false, refundable: false },
];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    if (!stripe || !elements) {
      setStatus('Stripe not loaded');
      setLoading(false);
      return;
    }
    // In a real app, create a PaymentIntent on the backend and confirm here
    setTimeout(() => {
      setStatus('Payment successful! (mock)');
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow mb-8">
      <h3 className="text-xl font-bold mb-4">Pay with Card</h3>
      <label className="block mb-2 font-medium">Amount (USD)
        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 mb-4"
          required
        />
      </label>
      <label className="block mb-2 font-medium">Card Details
        <div className="border rounded px-3 py-2 mt-1 mb-4 bg-white dark:bg-gray-800">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </label>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-primary text-white font-semibold"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {status && <div className="mt-4 text-green-600 font-medium">{status}</div>}
    </form>
  );
}

export default function Billing() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleRefund = (id: string) => {
    setTransactions(txns => txns.map(txn => txn.id === id ? { ...txn, status: 'Refunded', refundable: false } : txn));
    alert('Refund processed (mock)');
  };

  const handleDownloadInvoice = (id: string) => {
    // Mock invoice download
    const blob = new Blob([
      `Invoice for transaction ${id}\nAmount: $${transactions.find(t => t.id === id)?.amount}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTxns = transactions.filter(txn =>
    (filter === 'All' || txn.status === filter) &&
    (search === '' || txn.id.includes(search) || txn.status.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Billing & Payments</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        <div className="flex gap-4 mb-4">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Refunded">Refunded</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="text"
            placeholder="Search by ID or status"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="overflow-x-auto rounded border bg-white dark:bg-gray-900">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Method</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-4">No transactions found.</td></tr>
              )}
              {filteredTxns.map(txn => (
                <tr key={txn.id}>
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2">${txn.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{txn.status}</td>
                  <td className="px-4 py-2">{txn.method}</td>
                  <td className="px-4 py-2">{txn.id}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {txn.invoice && (
                      <button className="text-blue-600 hover:underline" onClick={() => handleDownloadInvoice(txn.id)}>Invoice</button>
                    )}
                    {txn.refundable && txn.status === 'Paid' && (
                      <button className="text-red-600 hover:underline" onClick={() => handleRefund(txn.id)}>Refund</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 