import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './app/providers';
import { HomePage } from './app/home/page';
import Absence from './app/absence/page';
import { NotFoundPage } from './app/not-found/page';
import  Page  from './app/newTask/page';
import './app/global.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/absence" Component={Absence} />
        <Route path="*" Component={NotFoundPage} />
        <Route path="/task" Component={Page} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
