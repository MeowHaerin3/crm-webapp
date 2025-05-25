import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd, MdTrendingUp, MdAttachMoney, MdPeople, MdTimeline } from 'react-icons/md';
import DealForm from '../components/DealForm';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  // Stats calculations
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
  const openDeals = deals.filter(deal => deal.status === 'open').length;
  const wonDeals = deals.filter(deal => deal.status === 'won').length;

  // Fetch deals
  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:8000/api/deals/')
      .then(res => setDeals(res.data))
      .catch(() => setError('Failed to load deals'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Deals</h1>
          <p className="text-base-content/70 text-base">Track and manage your sales pipeline efficiently.</p>
        </div>
        <button 
          className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform min-w-[140px] text-lg"
          onClick={() => setShowDealForm(true)}
        >
          <MdAdd className="w-6 h-6" />
          New Deal
        </button>
      </div>

      {error && <div className="text-error text-base font-medium mb-2">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-40 text-base-content/60 text-lg">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Value Card */}
            <div className="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdAttachMoney className="w-7 h-7 text-primary" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-primary/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">${totalValue.toLocaleString()}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Total Pipeline Value</div>
                </div>
              </div>
            </div>

            {/* Active Deals Card */}
            <div className="card bg-gradient-to-br from-info/5 to-info/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-info/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdTimeline className="w-7 h-7 text-info" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-info/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{openDeals}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Active Deals</div>
                </div>
              </div>
            </div>

            {/* Won Deals Card */}
            <div className="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-success/20 rounded-2xl group-hover:scale-110 transition-transform">
                    <MdPeople className="w-7 h-7 text-success" />
                  </div>
                  <MdTrendingUp className="w-6 h-6 text-success/60" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-base-content">{wonDeals}</div>
                  <div className="text-sm font-medium text-base-content/70 mt-1">Won Deals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Deals Table */}
          <div className="card bg-base-100 shadow-lg border border-base-200 overflow-x-auto">
            <div className="card-body p-0">
              <table className="table table-hover">
                <thead className="bg-base-200/50 text-base-content/70">
                  <tr>
                    <th>Deal Name</th>
                    <th>Customer</th>
                    <th>Value</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map(deal => (
                    <tr key={deal.id} className="hover">
                      <td className="font-medium">{deal.name}</td>
                      <td>{deal.customer}</td>
                      <td>${deal.value?.toLocaleString()}</td>
                      <td>
                        <div className="badge badge-outline">{deal.stage}</div>
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold capitalize
                          ${deal.status === 'won' ? 'bg-success/10 text-success' : ''}
                          ${deal.status === 'open' ? 'bg-info/10 text-info' : ''}
                          ${deal.status === 'lost' ? 'bg-error/10 text-error' : ''}
                        `}>
                          {deal.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={() => {
                              setEditingDeal(deal);
                              setShowDealForm(true);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Deal Form Modal */}
      {showDealForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-base-200">
            <DealForm
              onSubmit={(data) => {
                // Handle form submission
                setShowDealForm(false);
                setEditingDeal(null);
              }}
              onCancel={() => {
                setShowDealForm(false);
                setEditingDeal(null);
              }}
              initialData={editingDeal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsPage;