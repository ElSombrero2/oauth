import { createBrowserRouter, Link, Outlet, RouterProvider, useActionData, useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import './App.css'


const Home = (): JSX.Element => {
  
  const [query, setQuery] = useSearchParams()
  const navigate = useNavigate()
  const data = useLoaderData()
  console.log(data)

  return (
    <div>
      Home
      <Link to='/waiting-for-user'>User</Link>
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: () => {
      console.log('Handle')
      return {name: 'Me'}
    },
    children: [
      {
        path: '/',
        element: (
          <div>
            First Page
          </div>
        )
      },
    ]
  },
  {
    path: '/waiting-for-user',
    element: (
      <div>
        Waiting For User
      </div>
    )
  },
  {
    path: '*',
    element: (
      <div>
        Not Found
      </div>
    )
  }
])

function App() {
  const url = import.meta.env.VITE_FULL_URI
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
