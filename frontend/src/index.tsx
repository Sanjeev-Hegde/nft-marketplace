import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {  BrowserRouter, Routes,Route } from 'react-router-dom';
import AddItem from './routes/addItem/AddItem';
import CreateCollection from './routes/createCollection/CreateCollection';
import Explore from './routes/explore/Explore';
import Profile from './routes/profile/Profile';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="explore" element={<Explore />} />
        <Route path="profile" element={<Profile />} >
          <Route path="create-nft-collection" element={<CreateCollection />} />
          <Route path="explore" element={<AddItem />} />
        </Route>        
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
