export function BlueprintChestArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 520"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* soft wood-ish hatch */}
        <pattern
          id="woodHatch"
          patternUnits="userSpaceOnUse"
          width="14"
          height="14"
          patternTransform="rotate(18)"
        >
          <path d="M0 7H14" stroke="currentColor" strokeWidth="2" opacity="0.18" />
          <path d="M0 0H14" stroke="currentColor" strokeWidth="1" opacity="0.10" />
        </pattern>

        {/* subtle grid dots */}
        <pattern id="dotGrid" patternUnits="userSpaceOnUse" width="26" height="26">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.18" />
        </pattern>
      </defs>

      {/* background field */}
      <g className="text-black/40 dark:text-white/40">
        <rect x="0" y="0" width="1200" height="520" fill="url(#dotGrid)" opacity="0.10" />
      </g>

      {/* light “interior” planes */}
      <g fill="none" stroke="currentColor" className="text-black/35 dark:text-white/35" opacity="0.55">
        {/* wall panel suggestion */}
        <path
          d="M80 130c120-60 260-88 420-84 96 2 180 16 252 42"
          strokeWidth="2"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
        {/* floor plane */}
        <path
          d="M120 430c160-40 330-54 510-44 130 8 260 34 390 78"
          strokeWidth="2"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
      </g>

      {/* main cabinet in perspective */}
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="text-black/55 dark:text-white/55"
      >
        {/* outer body */}
        <path
          d="M330 110L780 60l240 140-450 52-240-142Z"
          strokeWidth="3"
          opacity="0.85"
        />
        <path
          d="M330 110v280l240 140V252"
          strokeWidth="3"
          opacity="0.85"
        />
        <path
          d="M780 60v280l240 140V200"
          strokeWidth="3"
          opacity="0.85"
        />

        {/* top surface accent (graphite) */}
        <path
          d="M780 60l240 140-450 52-240-142 450-50Z"
          strokeWidth="2"
          className="text-[color:var(--accent)]/45"
          opacity="0.55"
        />

        {/* front opening frame */}
        <path
          d="M360 140v240l210 122V262L360 140Z"
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* drawer fronts (4) */}
        {[
          { y1: 152, y2: 198 },
          { y1: 205, y2: 252 },
          { y1: 259, y2: 306 },
          { y1: 313, y2: 360 },
        ].map((r, idx) => (
          <g key={idx} opacity="0.95">
            {/* face */}
            <path
              d={`M372 ${r.y1}v${r.y2 - r.y1}l178 104V${r.y1 + 110}L372 ${r.y1}Z`}
              strokeWidth="2.25"
            />
            {/* notch/handle */}
            <path
              d={`M438 ${r.y1 + 10}l48 28c10 6 22 8 34 6l40-6`}
              strokeWidth="2"
              className="text-black/45 dark:text-white/45"
              opacity="0.75"
            />
            {/* small separation line */}
            <path
              d={`M372 ${r.y2}l178 104`}
              strokeWidth="2"
              opacity="0.55"
              strokeDasharray="8 10"
            />
          </g>
        ))}

        {/* drawer slides hint on right side (simple) */}
        <g className="text-black/40 dark:text-white/40" opacity="0.65" strokeWidth="2">
          <path d="M705 220l120 70" />
          <path d="M705 280l120 70" />
          <path d="M705 340l120 70" />
        </g>
      </g>

      {/* wood-ish shading on drawer faces (very subtle) */}
      <g className="text-[color:var(--accent)]/35" opacity="0.35">
        <path
          d="M372 152v46l178 104v-46L372 152Z"
          fill="url(#woodHatch)"
        />
        <path
          d="M372 205v47l178 104v-47L372 205Z"
          fill="url(#woodHatch)"
        />
        <path
          d="M372 259v47l178 104v-47L372 259Z"
          fill="url(#woodHatch)"
        />
        <path
          d="M372 313v47l178 104v-47L372 313Z"
          fill="url(#woodHatch)"
        />
      </g>

      {/* dimension lines (blueprint-ish) */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-[color:var(--accent)]/55"
        opacity="0.7"
      >
        {/* width */}
        <path d="M300 86h520" />
        <path d="M330 96v-18M780 96v-18" />
        <path d="M355 90l-14-4 14-4" />
        <path d="M755 90l14-4-14-4" />

        {/* height */}
        <path d="M290 120v290" />
        <path d="M300 140h-18M300 390h-18" />
        <path d="M292 165l-4-14-4 14" />
        <path d="M292 365l-4 14-4-14" />

        {/* depth */}
        <path d="M820 46l250 146" />
        <path d="M832 58l-16 2 8-14" />
      </g>
    </svg>
  );
}
