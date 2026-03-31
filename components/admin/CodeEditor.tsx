'use client'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'html' | 'css' | 'javascript'
  placeholder?: string
}

const extensions: Record<string, any> = {
  html: html(),
  css: css(),
  javascript: javascript(),
}

export default function CodeEditor({ value, onChange, language, placeholder }: CodeEditorProps) {
  return (
    <div className="h-full min-h-96">
      <CodeMirror
        value={value}
        height="100%"
        theme={oneDark}
        extensions={[extensions[language]]}
        onChange={onChange}
        placeholder={placeholder}
        style={{ height: '100%', minHeight: '384px' }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}
