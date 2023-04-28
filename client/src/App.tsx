import './App.css'

function App() {
  const url = import.meta.env.VITE_FULL_URI
  return (
    <div className="app">
      <header>
        <div className="filter">
          <div className="content">
            
          </div>
        </div>
        <img src="/layered-waves.svg" className="waves" />
      </header>
    </div>
  )
}

export default App
