export default function Loading() {
  return <main className="nl-container nl-loading" aria-busy="true" aria-label="Loading newsletter">
    <div className="nl-skeleton nl-skeleton-title" /><div className="nl-skeleton nl-skeleton-lead" />
    <div className="nl-grid">{[0, 1, 2, 3].map(i => <div key={i} className="nl-skeleton nl-skeleton-card" />)}</div>
  </main>;
}
