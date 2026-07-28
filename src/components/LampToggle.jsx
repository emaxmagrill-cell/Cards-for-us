export default function LampToggle({ light, onToggle }) {
  const lampOn = light === 'lamp'

  return (
    <button
      type="button"
      className="lamp"
      onClick={onToggle}
      aria-pressed={lampOn}
      aria-label={lampOn ? 'Turn the page back to daylight' : 'Dim the page for late night'}
    >
      <span className="lamp__paper" aria-hidden="true">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g filter="url(#ink-wobble)">
            {lampOn ? (
              <>
                <circle cx="12" cy="12" r="4.4" />
                <path d="M12 2.6v2.4M12 19v2.4M2.6 12H5M19 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
              </>
            ) : (
              <path d="M17.9 14.9A7.6 7.6 0 0 1 9.1 6.1a7.7 7.7 0 1 0 8.8 8.8Z" />
            )}
          </g>
        </svg>
      </span>
      <span className="hand lamp__label">{lampOn ? 'daylight' : 'late night'}</span>
    </button>
  )
}
