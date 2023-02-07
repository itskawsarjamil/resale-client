import { RouterProvider } from 'react-router-dom';
// import './App.css';
import routes from './components/routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='bg-white'>
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
