export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        {/* Left decorative card - folder stack */}
        <div className="-left-20 absolute top-0 hidden h-96 w-80 lg:block">
          <div className="relative h-full w-full">
            {/* Yellow card */}
            <div className="absolute top-0 left-0 h-80 w-72 rotate-[-5deg] transform rounded-2xl bg-[#FEFF00]" />
            {/* Blue card */}
            <div className="-rotate-2deg absolute top-4 left-4 h-80 w-72 transform rounded-2xl bg-[#60A5FA]" />
            {/* White card with UI */}
            <div className="absolute top-8 left-8 h-80 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-[#8751E6]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Layers Icon</title>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="text-gray-400 text-xs">PO</span>
              </div>
              <nav className="space-y-1 text-sm">
                <a
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                  href="/"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Home Icon</title>
                    <path
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Home
                </a>
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[#8751E6] hover:bg-gray-50"
                  type="button"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Integrations Icon</title>
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Integrations
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                  type="button"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Settings Icon</title>
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Settings
                </button>
              </nav>
              <div className="mt-4 border-gray-100 border-t pt-4">
                <div className="mb-2 text-gray-400 text-xs">Library</div>
                <div className="mb-2 text-gray-400 text-xs">Design system</div>
                <div className="mt-4 font-medium text-gray-500 text-xs">
                  Folders
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Folder Icon</title>
                      <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    Foundations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center content - Typography panel */}
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-gray-100 border-b px-4 py-3">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Foundations</span>
                <span>/</span>
                <span className="text-gray-900">Typography</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 rounded-lg bg-[#8751E6] px-3 py-1.5 text-sm text-white"
                  type="button"
                >
                  <span>✨</span>
                  First draft with AI
                </button>
                <button
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600 text-sm"
                  type="button"
                >
                  <span>✏️</span>
                  Edit
                </button>
              </div>
            </div>

            {/* Figma source */}
            <div className="border-gray-100 border-b px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{">"}</span>
                <span className="font-medium">Figma</span>
              </div>
            </div>

            {/* Typography list */}
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4 py-2">
                  <span className="w-4 text-gray-400 text-sm">{">"}</span>
                  <span className="w-20 font-medium text-sm">Subtitle</span>
                </div>
                <div className="flex items-center gap-4 py-2 pl-8">
                  <span className="w-20 text-sm">Regular</span>
                  <span className="w-16 text-gray-400 text-sm">14/20</span>
                  <span className="w-16 text-gray-400 text-sm">Inter</span>
                  <span className="font-mono text-gray-400 text-sm">
                    font-weight/400
                  </span>
                </div>
                <div className="flex items-center gap-4 py-2 pl-8">
                  <span className="w-20 text-sm">Medium</span>
                  <span className="w-16 text-gray-400 text-sm">14/20</span>
                  <span className="w-16 text-gray-400 text-sm">Inter</span>
                  <span className="font-mono text-gray-400 text-sm">
                    font-weight/500
                  </span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <span className="w-4 text-gray-400 text-sm">{">"}</span>
                  <span className="text-sm">UI Text Small</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <span className="w-4 text-gray-400 text-sm">{">"}</span>
                  <span className="text-sm">UI Text</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <span className="w-4 text-gray-400 text-sm">{">"}</span>
                  <span className="text-sm">Heading</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <span className="w-4 text-gray-400 text-sm">{">"}</span>
                  <span className="text-sm">Caption</span>
                </div>
              </div>
            </div>

            {/* Do's & Don'ts section */}
            <div className="border-gray-100 border-t p-4">
              <div className="mb-4 flex items-center gap-2 text-gray-500 text-sm">
                <span>📋</span>
                <span>{`Do's & Don'ts`}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-green-200 bg-green-50/50 p-4">
                  <span className="font-medium text-green-600 text-sm">{`Do's`}</span>
                  <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🖼️</span>
                      <span>Add an image</span>
                    </div>
                    <button
                      className="rounded border border-gray-200 px-3 py-1 text-xs"
                      type="button"
                    >
                      Select image
                    </button>
                  </div>
                  <div className="mt-2 text-gray-400 text-sm">Add text</div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
                  <span className="font-medium text-red-600 text-sm">{`Don'ts`}</span>
                  <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🖼️</span>
                      <span>Add an image</span>
                    </div>
                    <button
                      className="rounded border border-gray-200 px-3 py-1 text-xs"
                      type="button"
                    >
                      Select image
                    </button>
                  </div>
                  <div className="mt-2 text-gray-400 text-sm">Add text</div>
                </div>
              </div>
            </div>

            {/* Add image section */}
            <div className="border-gray-100 border-t p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500 text-sm">
                <span>🖼️</span>
                <span>Add an image</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border-2 border-gray-200 border-dashed p-6">
                <span className="text-gray-400 text-sm">
                  Drag image here or select one.
                </span>
                <button
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                  type="button"
                >
                  Select image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right decorative element - wave pattern */}
        <div className="-right-20 absolute top-0 hidden h-72 w-80 lg:block">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <div className="absolute inset-0 flex items-end">
              {/* Wave pattern */}
              <svg
                className="w-full"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
              >
                <title>Wave Pattern</title>
                <path
                  d="M0,100 Q50,50 100,100 T200,100 T300,100 T400,100 V200 H0 Z"
                  fill="#8751E6"
                />
              </svg>
            </div>
            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur">
              <span>👁️</span>
              Preview
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute right-10 bottom-20 hidden flex-col gap-3 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <title>Figma Icon</title>
              <path
                d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z"
                stroke="#F24E1E"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" fill="#F24E1E" r="3" />
            </svg>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
            <span className="text-xl">📦</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
            <span className="text-xl">✏️</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
            <span className="text-xl">💬</span>
          </div>
        </div>
      </div>
    </section>
  );
}
