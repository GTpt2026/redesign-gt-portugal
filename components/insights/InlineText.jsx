/**
 * InlineText — renders the tiny inline markup used in article text
 * (**bold**, _italic_, [label](url)) as React nodes. No HTML is ever
 * injected, so editor-supplied text can't carry markup of its own.
 */
import { Fragment } from 'react'

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/
const BOLD = /\*\*(.+?)\*\*/
const ITALIC = /(?<![\w])_(.+?)_(?![\w])/

function parse(str, key = 'n') {
  for (const [re, wrap] of [
    [LINK, (m, k, kids) => {
      const external = /^https?:\/\//.test(m[2])
      return (
        <a key={k} href={m[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {kids}
        </a>
      )
    }],
    [BOLD, (m, k, kids) => <strong key={k}>{kids}</strong>],
    [ITALIC, (m, k, kids) => <em key={k}>{kids}</em>],
  ]) {
    const m = re.exec(str)
    if (!m) continue
    const before = str.slice(0, m.index)
    const after = str.slice(m.index + m[0].length)
    return (
      <Fragment key={key}>
        {before && parse(before, `${key}b`)}
        {wrap(m, `${key}m`, parse(m[1], `${key}c`))}
        {after && parse(after, `${key}a`)}
      </Fragment>
    )
  }
  return str
}

export default function InlineText({ children }) {
  return <>{parse(String(children ?? ''))}</>
}
