import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './Components/Header';
import Favorite from './pages/Favorite';
import Detail from './pages/Detail';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createContext, useState } from 'react';

export const globalContext = createContext({})

function App() {
  const [image, setImage] = useState("")
  
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <globalContext.Provider value={{image: [image, setImage]}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={
            <div>
              <Header/>
              <Home/>
            </div>
            }/>
            <Route path="/favorite" element={
            <div>
              <Header/>
              <Favorite/>
            </div>}/>
            <Route path="/detail/:name" element={
            <div>
              <Header/>
              <Detail/>
            </div>}/>
          </Routes>
        </BrowserRouter>
      </globalContext.Provider>
    </ApolloProvider>
  );
}

export default App;
