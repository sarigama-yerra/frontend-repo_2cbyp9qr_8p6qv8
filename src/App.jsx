import PageBook from './components/PageBook'

function App() {
  const pages = [
    function Page1() {
      return (
        <div>
          <div className="inline-flex items-center justify-center mb-8">
            <img src="/flame-icon.svg" alt="Flames" className="w-24 h-24 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Flames Blue</h1>
          <p className="text-xl text-blue-200 mb-8">Build applications through conversation</p>
          <p className="text-blue-200/80 max-w-2xl mx-auto">Scroll to flip through sections — each page reveals content with a modern fly-in style for a unique, book-like feel.</p>
        </div>
      )
    },
    function Page2() {
      return (
        <div>
          <h2 className="text-4xl font-semibold text-white mb-4">Describe your idea</h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">Tell the AI what you want to build. Your words become features, pages, and polished interfaces.</p>
        </div>
      )
    },
    function Page3() {
      return (
        <div>
          <h2 className="text-4xl font-semibold text-white mb-4">Watch it build</h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">See your app come to life instantly in this preview as components animate into place.</p>
        </div>
      )
    },
    function Page4() {
      return (
        <div>
          <h2 className="text-4xl font-semibold text-white mb-4">Refine and iterate</h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">Keep scrolling and keep improving. Ask for changes and we’ll update the pages in real-time.</p>
          <a href="/test" className="inline-flex mt-8 px-5 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white transition-colors">Check backend connection</a>
        </div>
      )
    },
  ]

  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_20%_20%,rgba(59,130,246,0.08),transparent),radial-gradient(700px_500px_at_80%_80%,rgba(16,185,129,0.08),transparent)]" />
      <PageBook pages={pages} />
    </div>
  )
}

export default App
