// The course is fundamentally a sequence — modules unlock in order, then an
// exam, then a certificate. This rail makes that sequence the literal shape
// of the page rather than a generic card list.

const DOT_STYLES = {
  complete: 'bg-forest border-forest text-parchment',
  current: 'bg-amber border-amber text-parchment',
  locked: 'bg-parchment border-slate text-slate',
}

const LINE_STYLES = {
  complete: 'bg-forest',
  current: 'bg-hairline',
  locked: 'bg-hairline',
}

export default function ProgressRail({ stations }) {
  return (
    <ol className="relative">
      {stations.map((s, i) => {
        const isLast = i === stations.length - 1
        return (
          <li key={s.key} className="relative flex gap-5 pb-10 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px ${LINE_STYLES[s.status]}`}
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-medium ${DOT_STYLES[s.status]}`}
            >
              {s.status === 'complete' ? '✓' : String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-1 flex-col gap-1 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium text-ink">{s.label}</h3>
                {s.badge}
              </div>
              {s.sublabel && <p className="text-sm text-ink/60">{s.sublabel}</p>}
              {s.action && <div className="mt-2">{s.action}</div>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
