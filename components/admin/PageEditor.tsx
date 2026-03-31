'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Load CodeMirror dynamically to avoid SSR issues
const CodeEditor = dynamic(() => import('@/components/admin/CodeEditor'), { ssr: false })

interface PageEditorProps {
  pageId?: string
}

type Tab = 'visual' | 'html' | 'css' | 'js'

export default function PageEditor({ pageId }: PageEditorProps) {
  const router = useRouter()
  const isNew = !pageId
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('visual')
  const [showPreview, setShowPreview] = useState(false)

  const [form, setForm] = useState({
    title: '',
    content: '',
    htmlCode: '',
    cssCode: '',
    jsCode: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (pageId) {
      fetch(`/api/pages/${pageId}`)
        .then(r => r.json())
        .then(data => setForm(data))
    }
  }, [pageId])

  const setField = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
  }

  const save = async (status?: 'draft' | 'published') => {
    setSaving(true)
    const payload = { ...form, ...(status ? { status } : {}) }

    const res = await fetch(isNew ? '/api/pages' : `/api/pages/${pageId}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const data = await res.json()
      if (isNew) router.push(`/admin/pages/${data._id}`)
    }
    setSaving(false)
  }

  const previewHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${form.cssCode}</style>
</head>
<body>
  ${form.htmlCode || `<div style="font-family:sans-serif;padding:2rem;">${form.content}</div>`}
  <script>${form.jsCode}</script>
</body>
</html>`

  const tabs: { id: Tab; label: string; lang?: string }[] = [
    { id: 'visual', label: '✎ Visual Editor' },
    { id: 'html', label: '</> HTML', lang: 'html' },
    { id: 'css', label: '🎨 CSS', lang: 'css' },
    { id: 'js', label: '⚡ JavaScript', lang: 'javascript' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-ink-200 px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/pages')}
          className="text-ink-500 hover:text-ink-800 font-body text-sm"
        >
          ← Pages
        </button>
        <div className="flex-1">
          <input
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            placeholder="Page Title"
            className="font-display text-2xl font-bold text-ink-900 bg-transparent outline-none w-full placeholder-ink-300"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`font-body text-sm px-4 py-2 rounded border transition-colors ${
              showPreview
                ? 'border-accent text-accent bg-accent-light'
                : 'border-ink-300 text-ink-600 hover:border-ink-500'
            }`}
          >
            {showPreview ? '✕ Close Preview' : '👁 Preview'}
          </button>
          <button
            onClick={() => save('draft')}
            disabled={saving}
            className="font-body text-sm px-4 py-2 rounded border border-ink-300 text-ink-600 hover:border-ink-500 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => save('published')}
            disabled={saving}
            className="font-body text-sm px-5 py-2 bg-accent hover:bg-accent-hover text-white rounded transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : form.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Editor Area */}
        <div className={`flex-1 flex flex-col ${showPreview ? 'w-1/2' : ''}`}>
          {/* Tabs */}
          <div className="bg-white border-b border-ink-200 px-6 flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-body text-sm px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-accent text-accent font-semibold'
                    : 'border-transparent text-ink-500 hover:text-ink-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor Content */}
          <div className="flex-1 bg-white">
            {activeTab === 'visual' && (
              <div className="p-6">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => setField('content', (e.target as HTMLDivElement).innerHTML)}
                  className="prose-editor min-h-64 text-ink-800 font-body text-base leading-relaxed focus:outline-none border border-ink-200 rounded-lg p-5"
                  dangerouslySetInnerHTML={{ __html: form.content }}
                />
                <p className="text-ink-400 text-xs font-body mt-2">
                  Tip: Type and format content here. For full control, use the HTML/CSS/JS tabs.
                </p>
              </div>
            )}

            {activeTab === 'html' && (
              <div className="h-full">
                <CodeEditor
                  value={form.htmlCode}
                  onChange={v => setField('htmlCode', v)}
                  language="html"
                  placeholder="<!-- Write your HTML here -->"
                />
              </div>
            )}

            {activeTab === 'css' && (
              <div className="h-full">
                <CodeEditor
                  value={form.cssCode}
                  onChange={v => setField('cssCode', v)}
                  language="css"
                  placeholder="/* Write your CSS here */"
                />
              </div>
            )}

            {activeTab === 'js' && (
              <div className="h-full">
                <CodeEditor
                  value={form.jsCode}
                  onChange={v => setField('jsCode', v)}
                  language="javascript"
                  placeholder="// Write your JavaScript here"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l border-ink-200 flex flex-col">
            <div className="bg-ink-50 border-b border-ink-200 px-5 py-2.5 text-ink-500 text-sm font-body font-semibold">
              Preview
            </div>
            <iframe
              srcDoc={previewHTML}
              className="flex-1 w-full"
              title="Page Preview"
              sandbox="allow-scripts"
            />
          </div>
        )}

        {/* Settings Sidebar */}
        <div className="w-72 bg-white border-l border-ink-200 p-5 space-y-5">
          <div>
            <h3 className="font-display font-semibold text-ink-800 mb-3">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-ink-500 text-xs font-body block mb-1">Meta Title</label>
                <input
                  value={form.metaTitle}
                  onChange={e => setField('metaTitle', e.target.value)}
                  className="w-full border border-ink-200 rounded px-3 py-2 text-sm font-body focus:outline-none focus:border-accent"
                  placeholder="SEO title..."
                />
              </div>
              <div>
                <label className="text-ink-500 text-xs font-body block mb-1">Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={e => setField('metaDescription', e.target.value)}
                  rows={3}
                  className="w-full border border-ink-200 rounded px-3 py-2 text-sm font-body focus:outline-none focus:border-accent resize-none"
                  placeholder="SEO description..."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-ink-100 pt-5">
            <h3 className="font-display font-semibold text-ink-800 mb-3">Status</h3>
            <select
              value={form.status}
              onChange={e => setField('status', e.target.value)}
              className="w-full border border-ink-200 rounded px-3 py-2 text-sm font-body focus:outline-none focus:border-accent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {!isNew && (
            <div className="border-t border-ink-100 pt-5">
              <h3 className="font-display font-semibold text-ink-800 mb-3">Live URL</h3>
              <code className="text-xs font-mono bg-ink-100 px-3 py-2 rounded block text-ink-600 break-all">
                /pages/[slug]
              </code>
            </div>
          )}

          <div className="border-t border-ink-100 pt-5">
            <h3 className="font-display font-semibold text-ink-800 mb-3 text-xs uppercase tracking-wider text-ink-400">Code Guide</h3>
            <div className="space-y-2 text-xs font-body text-ink-500">
              <p>📝 <strong>Visual</strong> - WYSIWYG editing</p>
              <p>🔤 <strong>HTML</strong> - Page structure</p>
              <p>🎨 <strong>CSS</strong> - Styling</p>
              <p>⚡ <strong>JS</strong> - Interactivity</p>
              <p className="text-ink-400 italic mt-2">HTML + CSS + JS are combined when page is rendered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
