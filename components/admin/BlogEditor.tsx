'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface BlogEditorProps { blogId?: string }

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const router = useRouter()
  const isNew = !blogId
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'photos' | 'seo'>('details')
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [codeValue, setCodeValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    featuredImageName: '',
    tags: '',
    category: 'General',
    author: '',
    status: 'published' as 'draft' | 'published',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    slug: '',
  })

  useEffect(() => {
    if (blogId) {
      fetch(`/api/blogs/${blogId}`)
        .then(r => r.json())
        .then(data => setForm({
          ...data,
          tags: data.tags?.join(', ') || '',
          featuredImageName: data.featuredImage ? data.featuredImage.split('/').pop() : ''
        }))
    }
  }, [blogId])

  const setField = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')

  const handleImageUpload = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        const url = data.url || data.path || data.secure_url
        if (url) { setField('featuredImage', url); setField('featuredImageName', file.name) }
      } else alert('Failed to upload image.')
    } catch { alert('Error uploading image.') }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const deleteImage = () => { setField('featuredImage', ''); setField('featuredImageName', '') }

  // Open code editor with current content
  const openCodeEditor = () => {
    const html = editorRef.current?.innerHTML || form.content
    setCodeValue(html)
    setShowCodeEditor(true)
  }

  // Apply code editor changes back to editor
  const applyCodeChanges = () => {
    setField('content', codeValue)
    if (editorRef.current) editorRef.current.innerHTML = codeValue
    setShowCodeEditor(false)
  }

  const save = async (status?: 'draft' | 'published') => {
    if (!form.title.trim()) { alert('Please enter a title before saving!'); return }
    setSaving(true)
    const payload = {
      ...form,
      content: editorRef.current?.innerHTML || form.content,
      tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      ...(status ? { status } : {}),
    }
    const res = await fetch(isNew ? '/api/blogs' : `/api/blogs/${blogId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      if (isNew) router.push(`/admin/blogs/${data._id}`)
    }
    setSaving(false)
  }

  const tabStyle = (tab: string) =>
    `px-4 py-2.5 text-sm border-b-2 cursor-pointer flex items-center gap-1.5 transition-colors ${
      activeTab === tab ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'
    }`

  const labelStyle = "w-36 text-sm text-gray-700 font-medium pt-2 shrink-0"
  const inputStyle = "flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── INLINE CODE EDITOR MODAL ── */}
      {showCodeEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-lg shadow-2xl w-[90vw] max-w-5xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="text-white text-sm font-medium flex items-center gap-2">
                <span className="text-gray-400 font-mono">&lt;/&gt;</span> HTML Source Editor
              </span>
              <div className="flex items-center gap-2">
                <button onClick={applyCodeChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded flex items-center gap-1">
                  ✓ Apply Changes
                </button>
                <button onClick={() => setShowCodeEditor(false)}
                  className="border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm px-3 py-1.5 rounded">
                  ✕ Cancel
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="flex-1 overflow-hidden relative">
              <textarea
                value={codeValue}
                onChange={e => setCodeValue(e.target.value)}
                className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 resize-none focus:outline-none leading-6"
                style={{ fontFamily: 'Consolas, Monaco, Courier New, monospace' }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 border-t border-gray-700 flex items-center justify-between">
              <span className="text-gray-500 text-xs">
                HTML, CSS, JavaScript — all supported. Scripts will be saved as-is.
              </span>
              <span className="text-gray-500 text-xs font-mono">
                {codeValue.length} chars
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            ✏️ {isNew ? 'New Blog' : 'Edit Blog'}
          </span>
          <span className="text-xs text-gray-400">Home / Blog</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => save('draft')} disabled={saving}
            className="border border-gray-300 text-gray-600 text-sm px-4 py-1.5 rounded hover:bg-gray-50 disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => save('published')} disabled={saving}
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
            ← {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => router.push('/admin/blogs')}
            className="border border-gray-300 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-50">
            ✕ Cancel
          </button>
          <button className="border border-gray-300 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-50">
            ⋮ Options ▾
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-5 flex">
        <button className={tabStyle('details')} onClick={() => setActiveTab('details')}>
          <span className="text-gray-400">□</span> Topic Details
        </button>
        <button className={tabStyle('photos')} onClick={() => setActiveTab('photos')}>
          <span className="text-gray-400">🖼</span> Photos
        </button>
        <button className={tabStyle('seo')} onClick={() => setActiveTab('seo')}>
          <span className="text-gray-400">↗</span> SEO Settings
        </button>
      </div>

      <div className="p-6 max-w-6xl">

        {/* ── TOPIC DETAILS ── */}
        {activeTab === 'details' && (
          <div className="space-y-0 bg-white border border-gray-200 rounded">

            {/* Categories */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Categories</label>
              <div className="flex-1">
                <input value={form.category} onChange={e => setField('category', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-400 min-w-40"
                  placeholder="e.g. Work" />
              </div>
            </div>

            {/* Title */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Title</label>
              <input value={form.title}
                onChange={e => {
                  setField('title', e.target.value)
                  if (!form.slug) setField('slug', generateSlug(e.target.value))
                  if (!form.seoTitle) setField('seoTitle', e.target.value)
                }}
                className={inputStyle} placeholder="Blog post title" />
            </div>

            {/* Details */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Details</label>
              <div className="flex-1">
                {/* Toolbar */}
                <div className="border border-gray-300 rounded-t bg-gray-50 px-2 py-1.5 flex items-center gap-1 flex-wrap">
                  <button type="button" onClick={() => document.execCommand('bold')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-sm font-bold">B</button>
                  <button type="button" onClick={() => document.execCommand('italic')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-sm italic">I</button>
                  <button type="button" onClick={() => document.execCommand('underline')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-sm underline">U</button>
                  <button type="button" onClick={() => document.execCommand('strikeThrough')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-sm line-through">S</button>
                  <span className="w-px h-5 bg-gray-300 mx-0.5"></span>
                  <select onChange={e => { if (e.target.value) document.execCommand('fontName', false, e.target.value) }}
                    className="text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none bg-white">
                    <option>Roboto</option><option>Arial</option><option>Georgia</option><option>Times New Roman</option>
                  </select>
                  <span className="w-px h-5 bg-gray-300 mx-0.5"></span>
                  <button type="button" onClick={() => document.execCommand('insertUnorderedList')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">•≡</button>
                  <button type="button" onClick={() => document.execCommand('insertOrderedList')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">1.</button>
                  <select onChange={e => {
                    const cmds: any = { Left: 'justifyLeft', Center: 'justifyCenter', Right: 'justifyRight', Full: 'justifyFull' }
                    if (cmds[e.target.value]) document.execCommand(cmds[e.target.value])
                  }} className="text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none bg-white">
                    <option>= Align</option><option>Left</option><option>Center</option><option>Right</option><option>Full</option>
                  </select>
                  <span className="w-px h-5 bg-gray-300 mx-0.5"></span>
                  <select onChange={e => { if (e.target.value) document.execCommand('formatBlock', false, e.target.value) }}
                    className="text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none bg-white">
                    <option value="">Table</option>
                    <option value="p">Paragraph</option>
                    <option value="h1">H1</option><option value="h2">H2</option>
                    <option value="h3">H3</option><option value="h4">H4</option>
                  </select>
                  <button type="button" title="Link" onClick={() => {
                    const url = prompt('Enter URL:')
                    if (url) document.execCommand('createLink', false, url)
                  }} className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">🔗</button>
                  <button type="button" title="Image" onClick={() => {
                    const url = prompt('Enter image URL:')
                    if (url) document.execCommand('insertImage', false, url)
                  }} className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">🖼</button>
                  <button type="button" title="Video"
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">▶</button>
                  <button type="button" title="Remove formatting" onClick={() => document.execCommand('removeFormat')}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">✕</button>
                  {/* SOURCE CODE BUTTON */}
                  <button type="button" title="Edit HTML Source" onClick={openCodeEditor}
                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-700 hover:text-white bg-gray-800 text-white rounded text-xs font-mono transition-colors">
                    &lt;/&gt;
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded text-xs">?</button>
                </div>

                {/* Use drag & drop editor */}
                <div className="border-l border-r border-gray-300 px-3 py-2 bg-white">
                  <button type="button" className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                    <span className="text-green-500">⊞</span> Use drag & drop editor
                  </button>
                  <p className="text-xs text-gray-400 mt-1">ⓘ You will need to refresh this page after updating via drag & drop editor.</p>
                </div>

                {/* Editable content */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => setField('content', (e.target as HTMLDivElement).innerHTML)}
                  className="min-h-64 border border-gray-300 border-t-0 rounded-b px-4 py-3 text-sm focus:outline-none prose max-w-none bg-white"
                  dangerouslySetInnerHTML={{ __html: form.content }}
                />
              </div>
            </div>

            {/* Photo */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Photo</label>
              <div className="flex-1">
                {form.featuredImage && (
                  <div className="mb-3">
                    <img src={form.featuredImage} alt="Featured" className="max-w-xs rounded border border-gray-200" />
                    <p className="text-xs text-gray-500 mt-1">{form.featuredImageName}</p>
                    <button onClick={deleteImage} className="text-xs text-red-600 hover:underline mt-0.5">Delete</button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded cursor-pointer">
                      Choose File
                    </span>
                    <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.gif,.svg,.webp"
                      className="hidden" onChange={e => handleImageUpload(e.target.files?.[0] || null)} disabled={uploading} />
                  </label>
                  <span className="text-xs text-gray-500">{uploading ? 'Uploading...' : 'No file chosen'}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">ⓘ Extensions: .png, .jpg, .jpeg, .gif, .svg, .webp</p>
              </div>
            </div>

            {/* Custom Form */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Custom Form</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 w-64">
                <option>-- None --</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Status</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="status" value="published"
                    checked={form.status === 'published'} onChange={() => setField('status', 'published')}
                    className="accent-green-500" />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="status" value="draft"
                    checked={form.status === 'draft'} onChange={() => setField('status', 'draft')}
                    className="accent-gray-400" />
                  <span className="text-sm text-gray-700">Not Active</span>
                </label>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <label className={labelStyle}>Tags</label>
              <div className="flex-1">
                <input value={form.tags} onChange={e => setField('tags', e.target.value)}
                  className={inputStyle} placeholder="tag1, tag2, tag3" />
                <p className="text-xs text-gray-400 mt-1">Comma separated</p>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-start gap-4 px-5 py-4">
              <label className={labelStyle}>Author</label>
              <input value={form.author} onChange={e => setField('author', e.target.value)}
                className={inputStyle} placeholder="Author name" />
            </div>
          </div>
        )}

        {/* ── PHOTOS TAB ── */}
        {activeTab === 'photos' && (
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-start gap-4">
              <label className={labelStyle}>Photo</label>
              <div className="flex-1">
                {form.featuredImage && (
                  <div className="mb-4">
                    <img src={form.featuredImage} alt="Featured" className="max-w-xs rounded border border-gray-200" />
                    <p className="text-xs text-gray-500 mt-1">{form.featuredImageName}</p>
                    <button onClick={deleteImage} className="text-xs text-red-600 hover:underline">Delete</button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded">
                      Choose File
                    </span>
                    <input type="file" accept=".png,.jpg,.jpeg,.gif,.svg,.webp" className="hidden"
                      onChange={e => handleImageUpload(e.target.files?.[0] || null)} disabled={uploading} />
                  </label>
                  <span className="text-xs text-gray-500">{uploading ? 'Uploading...' : 'No file chosen'}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">ⓘ Extensions: .png, .jpg, .jpeg, .gif, .svg, .webp</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SEO SETTINGS TAB ── */}
        {activeTab === 'seo' && (
          <div className="flex gap-6">
            <div className="flex-1 bg-white border border-gray-200 rounded">
              <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
                <label className={labelStyle}>Page title</label>
                <input value={form.seoTitle} onChange={e => setField('seoTitle', e.target.value)}
                  className={inputStyle} placeholder="SEO page title" />
              </div>
              <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
                <label className={labelStyle}>Friendly URL</label>
                <div className="flex-1">
                  <input value={form.slug} onChange={e => setField('slug', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="my-blog-post-url" />
                </div>
              </div>
              <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
                <label className={labelStyle}>Meta Description</label>
                <textarea value={form.seoDescription} onChange={e => setField('seoDescription', e.target.value)}
                  rows={4} className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Meta description..." />
              </div>
              <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
                <label className={labelStyle}>Meta Keywords</label>
                <textarea value={form.seoKeywords} onChange={e => setField('seoKeywords', e.target.value)}
                  rows={4} className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="keyword1, keyword2..." />
              </div>
              <div className="px-5 py-4 flex items-center gap-3">
                <button onClick={() => save()} disabled={saving}
                  className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
                  ← {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => router.push('/admin/blogs')}
                  className="border border-gray-300 text-gray-600 text-sm px-4 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1">
                  ✕ Cancel
                </button>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="w-80 shrink-0">
              <div className="bg-white border border-gray-200 rounded p-4">
                <div className="border border-gray-200 rounded p-3 mb-3 bg-white">
                  <p className="text-blue-700 text-sm font-medium line-clamp-1">{form.seoTitle || form.title || 'Page Title'}</p>
                  <p className="text-green-700 text-xs mt-0.5">https://ggims.com/blog/{form.slug || 'your-slug'}</p>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-3">{form.seoDescription || form.excerpt || 'Meta description will appear here...'}</p>
                </div>
                <p className="text-xs text-gray-400 flex items-start gap-1">
                  <span className="mt-0.5">ⓘ</span>
                  Manage your page title, meta description, keywords and unique friendly URL. This helps you manage how this topic shows up on search engines.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}