import './App.css';
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import AccountEdit from "./Pages/AccountEdit";
import AccountRegister from "./Pages/AccountRegister";
import { BrowserRouter as Router,
  Routes, Route} from "react-router-dom";
import CreateAdvertisement from "./Pages/Advertisement/CreateAdvertisement";
import EditAdvertisement from "./Pages/Advertisement/EditAdvertisement";
import ViewAllAdvertisement from "./Pages/Advertisement/ViewAllAdvertisement";
import Advertisement from "./Pages/Advertisement/Advertisement";

function App() {
  return (      <Router>
    <Routes>
      <Route exact path ='/' element={<Login />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<AccountRegister />} />
      <Route exact path='/account' element={<Account />} />
      <Route exact path='/edit_account' element={<AccountEdit />} />
      <Route exact path='/create_ad' element={<CreateAdvertisement/>}/>
      <Route exact path='/edit_ad/:id' element={<EditAdvertisement/>}/>
      <Route exact path='/ads' element={<ViewAllAdvertisement/>}/>
      <Route exact path='/ads/:id' element={<Advertisement/>}/>
    </Routes>
  </Router>);
}

export default App;
