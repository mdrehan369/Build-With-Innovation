import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext.js';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContextProvider value={{user, setUser}}>
            <Header />
            <Outlet />
        </UserContextProvider>
    )
}

export default App
