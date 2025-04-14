import { ItemProvider } from './context/ItemContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './Router/AppRouter'

function App() {


  return (
    <ItemProvider>
      <AppRouter />
      <ToastContainer />
    </ItemProvider>
  )
}

export default App
