const STYLES = {
  complete: 'bg-forest/10 text-forest border-forest/30',
  current: 'bg-amber/10 text-amber border-amber/40',
  locked: 'bg-slate/10 text-slate border-slate/30',
  failed: 'bg-clay/10 text-clay border-clay/30',
}

export default function StatusBadge({ status, children }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 ${STYLES[status] || STYLES.locked}`}
    >
      {children}
    </span>
  )
}
