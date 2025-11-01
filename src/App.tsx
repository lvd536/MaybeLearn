import { Link } from 'react-router-dom'
function App() {
  return (
    <div className='flex mt-100 items-center justify-center gap-4'>
    <Link to='/register' className='p-2 ring-1 ring-indigo-500'>Create your account</Link>
    <Link to='/login' className='p-2 ring-1 ring-indigo-500'>Login into account</Link>
    </div>
  )
}

export default App
