import React, { useState } from 'react'

const DealForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    value: initialData?.value || '',
    stage: initialData?.stage || 'prospecting',
    owner: initialData?.owner || '',
    closeDate: initialData?.closeDate || '',
    notes: initialData?.notes || '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    onSubmit && onSubmit(form)
    setSubmitting(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="label font-medium">Deal Title</label>
          <input name="title" className="input input-bordered w-full" value={form.title} onChange={handleChange} required />
        </div>
        <div className="flex-1">
          <label className="label font-medium">Company</label>
          <input name="company" className="input input-bordered w-full" value={form.company} onChange={handleChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label font-medium">Value</label>
          <input name="value" type="number" className="input input-bordered w-full" value={form.value} onChange={handleChange} />
        </div>
        <div>
          <label className="label font-medium">Stage</label>
          <select name="stage" className="select select-bordered w-full" value={form.stage} onChange={handleChange}>
            <option value="prospecting">Prospecting</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label font-medium">Owner</label>
          <input name="owner" className="input input-bordered w-full" value={form.owner} onChange={handleChange} />
        </div>
        <div>
          <label className="label font-medium">Expected Close Date</label>
          <input name="closeDate" type="date" className="input input-bordered w-full" value={form.closeDate} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="label font-medium">Notes</label>
        <textarea name="notes" className="textarea textarea-bordered w-full" value={form.notes} onChange={handleChange} />
      </div>
      <div className="flex gap-2 justify-end mt-6">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Saving...' : 'Save Deal'}</button>
      </div>
    </form>
  )
}

export default DealForm