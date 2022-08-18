import { useState, createContext } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {

    const [userData, setUserData] = useState({});
    const [currentPublications, setPublications] = useState();
    const [chosenPublication, setChosenPublication] = useState()

    return (
        <MainContext.Provider value={{userData, setUserData, currentPublications, setPublications}}>
            {children}
        </MainContext.Provider>
    );
};
