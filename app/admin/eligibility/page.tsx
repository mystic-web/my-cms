'use client'
import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

interface EligibilityEntry {
  id: number
  visits: number
  status: string
  name: string
  phone: string
  email: string
  country: string
  education: string
  experience: string
  visaType: string
}

const initialData: EligibilityEntry[] = [
  { id: 1, visits: 3, status: 'Pending', name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@email.com', country: 'India', education: "Bachelor's", experience: '3 Years', visaType: 'Student' },
  { id: 2, visits: 1, status: 'Approved', name: 'Priya Singh', phone: '+91 91234 56789', email: 'priya@email.com', country: 'India', education: "Master's", experience: '5 Years', visaType: 'Work' },
  { id: 3, visits: 2, status: 'Rejected', name: 'Amit Kumar', phone: '+91 99887 76655', email: 'amit@email.com', country: 'Nepal', education: 'Diploma', experience: '1 Year', visaType: 'Tourist' },
  { id: 4, visits: 5, status: 'Pending', name: 'Sara Ali', phone: '+91 88776 65544', email: 'sara@email.com', country: 'Pakistan', education: "Bachelor's", experience: '2 Years', visaType: 'PR' },
  { id: 5, visits: 2, status: 'Approved', name: 'John Dsouza', phone: '+91 77665 54433', email: 'john@email.com', country: 'India', education: 'PhD', experience: '8 Years', visaType: 'Work' },
]

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

const emptyForm = {
  name: '', phone: '', email: '', country: '',
  education: '', experience: '', visaType: '',
  status: 'Pending', visits: 1,
}

const CSV_HEADERS = ['ID', 'Visits', 'Status', 'Name', 'Phone', 'Email', 'Country', 'Education', 'Experience', 'Visa Type']

export default function EligibilityPage() {
  const [data, setData] = useState<EligibilityEntry[]>(initialData)
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(30)
  const [showModal, setShowModal] = useState(false)
  const [editEntry, setEditEntry] = useState<EligibilityEntry | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [importMsg, setImportMsg] = useState('')
  const importRef = useRef<HTMLInputElement>(null)

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  )

  // ── Modal ────────────────────────────────────────────────────
  const openAddModal = () => {
    setEditEntry(null); setForm(emptyForm); setErrors({}); setShowModal(true)
  }
  const openEditModal = (entry: EligibilityEntry) => {
    setEditEntry(entry)
    setForm({
      name: entry.name, phone: entry.phone, email: entry.email,
      country: entry.country, education: entry.education,
      experience: entry.experience, visaType: entry.visaType,
      status: entry.status, visits: entry.visits,
    })
    setErrors({}); setShowModal(true)
  }
  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.country.trim()) e.country = 'Country is required'
    if (!form.education.trim()) e.education = 'Education is required'
    if (!form.experience.trim()) e.experience = 'Experience is required'
    if (!form.visaType.trim()) e.visaType = 'Visa type is required'
    return e
  }
  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    if (editEntry) {
      setData(prev => prev.map(item => item.id === editEntry.id ? { ...item, ...form } : item))
    } else {
      const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1
      setData(prev => [...prev, { id: newId, ...form }])
    }
    setShowModal(false)
  }
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this entry?'))
      setData(prev => prev.filter(item => item.id !== id))
  }
  const handleChange = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  // ── Helpers ──────────────────────────────────────────────────
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  // ── Export CSV ───────────────────────────────────────────────
  const exportCSV = () => {
    const rows = data.map(r => [r.id, r.visits, r.status, r.name, r.phone, r.email, r.country, r.education, r.experience, r.visaType])
    const csv = [CSV_HEADERS, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'eligibility_data.csv')
  }

  // ── Export Excel ─────────────────────────────────────────────
 const exportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(data.map(r => ({
    ID: r.id,
    Visits: r.visits,
    Status: r.status,
    Name: r.name,
    Phone: r.phone,
    Email: r.email,
    Country: r.country,
    Education: r.education,
    Experience: r.experience,
    'Visa Type': r.visaType
  })))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Eligibility')
  XLSX.writeFile(wb, 'eligibility_data.xlsx')
}

  // ── Import CSV ───────────────────────────────────────────────
const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
  setImportMsg('')
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const arrayBuffer = ev.target?.result as ArrayBuffer
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      
      // Pehli sheet lo
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      
      // JSON mein convert karo
      const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, { defval: '' })
      
      if (jsonData.length === 0) {
        setImportMsg('❌ File mein koi data nahi mila.')
        return
      }

      let maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0
      const imported: EligibilityEntry[] = []

      jsonData.forEach((row) => {
  maxId++
  
  // Kisi bhi key se value lo (case insensitive)
  const get = (keys: string[]) => {
    for (const k of keys) {
      const found = Object.keys(row).find(
        rk => rk.toLowerCase().trim() === k.toLowerCase().trim()
      )
      if (found && row[found]) return String(row[found])
    }
    return ''
  }

  const rawStatus = get(['status'])
  
  imported.push({
    id: maxId,
    visits: Number(get(['visits'])) || 0,
    status: ['Approved', 'Rejected', 'Pending'].includes(rawStatus) ? rawStatus : 'Pending',
    name: get(['name', 'full name', 'fullname']),
    phone: get(['phone', 'phone number', 'phonenumber', 'mobile', 'mobile number', 'contact', 'contact number']),
    email: get(['email', 'email address', 'emailaddress']),
    country: get(['country', 'country of origin', 'countryoforigin']),
    education: get(['education', 'qualification']),
    experience: get(['experience', 'work experience']),
    visaType: get(['visa type', 'visatype', 'visa']),
  })
})

      if (imported.length === 0) {
        setImportMsg('❌ Koi valid rows nahi mili file mein.')
        return
      }

      setData(prev => [...prev, ...imported])
      setImportMsg(`✅ ${imported.length} entries successfully import ho gayi!`)
    } catch {
      setImportMsg('❌ File parse karne mein error aaya.')
    }
    if (importRef.current) importRef.current.value = ''
  }

  // ✅ CSV aur XLSX dono handle karo
  reader.readAsArrayBuffer(file)
}

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Hidden file input for import */}
      <input ref={importRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleImport} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Check Your Eligibility</h1>
          <p className="text-sm text-gray-500">Home / Check Your Eligibility</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            ➕ New Check Your Eligibility
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm transition-colors" title="Search">🔍</button>

          {/* ⬆️ Import CSV */}
          <button
            onClick={() => importRef.current?.click()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
            title="Import CSV"
          >⬆️</button>

          {/* 🖨️ Print */}
          <button
            onClick={() => window.print()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors"
            title="Print"
          >🖨️</button>

          {/* 📊 Export Excel */}
          <button
            onClick={exportExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
            title="Export Excel (.xlsx)"
          >📊</button>
        </div>
      </div>

      {/* Import / status message */}
      {importMsg && (
        <div className={`mb-4 px-4 py-2 rounded text-sm font-medium flex items-center justify-between ${importMsg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <span>{importMsg}</span>
          <button onClick={() => setImportMsg('')} className="text-xs underline ml-4">Dismiss</button>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Showing 1 to {Math.min(perPage, filtered.length)} of {filtered.length} entries</span>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 border border-teal-300 rounded px-2 py-1 hover:bg-teal-50 transition-colors"
              title="Download as CSV"
            >
              ⬇️ Export CSV
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <div className="flex items-center gap-1 text-sm text-gray-600">
              Show
              <select
                value={perPage}
                onChange={e => setPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm ml-1 focus:outline-none"
              >
                <option>10</option><option>30</option><option>50</option><option>100</option>
              </select>
            </div>
          </div>
        </div>

      <div className="overflow-x-auto max-w-full">
           <table className="w-full text-xs">
           <thead className="bg-gray-50 border-b border-gray-200">
  <tr>
    <th className="px-2 py-2 text-left"><input type="checkbox" className="rounded" /></th>
    {['ID ↕', 'Visits ↕', 'Status ↕', 'Name', 'Phone Number', 'Email', 'Country of Origin', 'Education', 'Experience', 'Visa Type'].map(col => (
      <th key={col} className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{col}</th>
    ))}
    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
  </tr>
</thead>
           <tbody className="divide-y divide-gray-100">
  {filtered.slice(0, perPage).map(item => (
    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-2 py-2"><input type="checkbox" className="rounded" /></td>
      <td className="px-2 py-2 text-gray-700 font-medium">{item.id}</td>
      <td className="px-2 py-2 text-gray-600">{item.visits}</td>
      <td className="px-2 py-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] ?? 'bg-gray-100 text-gray-600'}`}>{item.status}</span>
      </td>
      <td className="px-2 py-2 text-gray-700">{item.name}</td>
      <td className="px-2 py-2 text-gray-600">{item.phone}</td>
      <td className="px-2 py-2 text-gray-600">{item.email}</td>
      <td className="px-2 py-2 text-gray-600">{item.country}</td>
      <td className="px-2 py-2 text-gray-600">{item.education}</td>
      <td className="px-2 py-2 text-gray-600">{item.experience}</td>
      <td className="px-2 py-2 text-gray-600">{item.visaType}</td>
      <td className="px-2 py-2">
        <div className="flex items-center gap-1">
          <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">Edit</button>
          <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors">Delete</button>
        </div>
      </td>
    </tr>
  ))}
  {filtered.length === 0 && (
    <tr><td colSpan={12} className="px-4 py-8 text-center text-gray-400 text-sm">No entries found</td></tr>
  )}
</tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">Showing 1 to {Math.min(perPage, filtered.length)} of {filtered.length} entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600">Previous</button>
            <button className="px-3 py-1 text-sm bg-teal-500 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600">Next</button>
          </div>
        </div>
      </div>

      {/* CSV format hint */}
      <p className="mt-3 text-xs text-gray-400">
        💡 Import ke liye CSV format: <code className="bg-gray-100 px-1 rounded">ID, Visits, Status, Name, Phone, Email, Country, Education, Experience, Visa Type</code>
      </p>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editEntry ? 'Edit Entry' : 'Add New Eligibility Check'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. Rahul Sharma"
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number *</label>
                <input type="text" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="e.g. +91 98765 43210"
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="e.g. rahul@email.com"
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.email ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Country of Origin *</label>
                <input type="text" value={form.country} onChange={e => handleChange('country', e.target.value)} placeholder="e.g. India"
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.country ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Education *</label>
                <select value={form.education} onChange={e => handleChange('education', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.education ? 'border-red-400' : 'border-gray-300'}`}>
                  <option value="">Select Education</option>
                  <option>Diploma</option><option>{"Bachelor's"}</option><option>{"Master's"}</option><option>PhD</option><option>Other</option>
                </select>
                {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Experience *</label>
                <input type="text" value={form.experience} onChange={e => handleChange('experience', e.target.value)} placeholder="e.g. 3 Years"
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.experience ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Visa Type *</label>
                <select value={form.visaType} onChange={e => handleChange('visaType', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400 ${errors.visaType ? 'border-red-400' : 'border-gray-300'}`}>
                  <option value="">Select Visa Type</option>
                  <option>Student</option><option>Work</option><option>Tourist</option><option>PR</option><option>Business</option><option>Other</option>
                </select>
                {errors.visaType && <p className="text-red-500 text-xs mt-1">{errors.visaType}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => handleChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400">
                  <option>Pending</option><option>Approved</option><option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Visits</label>
                <input type="number" min={0} value={form.visits} onChange={e => handleChange('visits', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors">Cancel</button>
              <button onClick={handleSubmit} className="px-5 py-2 text-sm bg-teal-500 hover:bg-teal-600 text-white rounded font-medium transition-colors">
                {editEntry ? 'Update Entry' : 'Add Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}