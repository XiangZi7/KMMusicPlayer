import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

export const renderMarkdown = (text: string): string => {
  const md = new MarkdownIt({
    highlight: (str: string, lang: string): string => {
      const copyButton = `<button class="copy-code-btn absolute top-2 right-2" onclick="copyCode(this)">复制代码</button>`
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          return `<pre class="hljs"><code>${copyButton}${highlighted}</code></pre>`
        } catch {
          return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    },
  })

  let html = md.render(text)
  html = html.replace(
    /<a\s+([^>]*\s+)?href="([^"]*\.m3u8)"\s*([^>]*)>/g,
    '<a $1href="#/video?videoUrl=$2&videoType=application/x-mpegURL" $3>'
  )
  return html.replace(/<a /g, '<a target="_blank" ')
}