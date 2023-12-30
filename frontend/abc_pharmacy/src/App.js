
import './App.css';
import Home from './views/Home';
import CreateInvoice from './views/InvoiceVIews/CreateInvoice';
import ViewInvoices from './views/InvoiceVIews/ViewInvoices';
import CreateItem from './views/ItemViews/CreateItem';
import UpdateItem from './views/ItemViews/UpdateItem';
import ViewItems from './views/ItemViews/ViewItems';
import Login from './views/Login';
import AdminDashboard from './views/UserViews/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';
import UserRegisterView from './views/UserViews/UserRegisterView';
import ItemList from './views/ItemViews/ItemList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/addItem" element={<CreateItem/>} />
          <Route path="/register" element={<UserRegisterView/>} />
          <Route path="/updateItem/:id" element={<UpdateItem/>} />
          <Route path="/viewItems" element={<ViewItems/>} />
          <Route path="/addInvoice" element={<CreateInvoice/>} />
          <Route path="/viewInvoices" element={<ViewInvoices/>} />
          <Route path="/store" element={<ItemList/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
