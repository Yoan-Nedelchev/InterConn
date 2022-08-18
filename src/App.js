import './App.css';
import "react-datetime/css/react-datetime.css"

import Navigation from './components/navComponent/Navigation'
import HomePage from './components/homePage/HomePage'
import UserLogin from './components/userLogIn/UserLogin'
import UserRegistration from './components/userRegister/UserRegistration'
import Footer from './components/footer/Footer'
import UserPublications from './components/userPublications/UserPublications'
import Categories from './components/categories/allCategoriesView/AllCategoriesView'
import DetailsComponent from './components/detailsComponent/DetailsComponent'
import DynamicCategoryList from './components/categories/dynamicCategoryList/DynamicCategoryList'
import AddPublication from './components/addPublication/AddPublication'
import EditComponent from './components/editComponent/EditComponent'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import { MainProvider } from './contexts/mainContext'

function App() {
  return (
    <MainProvider>
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Navigation />
          </header>
          <main className="main">
            <Routes>
              <Route path="/" c element={<HomePage />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/add" element={<AddPublication />} />
              <Route path="/mypublications"  >
                <Route index element={<UserPublications />} />
                <Route path=":id" element={<DetailsComponent />} />
              </Route>
              <Route path="/edit">
                <Route path=":id" element={<EditComponent />} />
              </Route>
              <Route path="categories" >
                <Route index element={<Categories />} />
                <Route path="meetups" >
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="learning">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="sports">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="music">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="travel">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="networking">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
                <Route path="other">
                  <Route index element={<DynamicCategoryList />} />
                  <Route path=":id" element={<DetailsComponent />} />
                </Route>
              </Route>
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </div >
    </MainProvider>
  );
};

export default App;
