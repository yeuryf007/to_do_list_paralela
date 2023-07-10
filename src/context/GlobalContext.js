import React from 'react';
import $ from 'jquery';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

  const characterCounter = (e) => {
    const maxLength = e.target.getAttribute("data-length");
    const currentLength = e.target.value.length;
  
    if (currentLength >= maxLength) {
      e.target.value = e.target.value.substring(0, maxLength);
    } else {
      $(".character-counter").text(10 - maxLength);
    }
  }

  return (
    <GlobalContext.Provider value={{
      characterCounter
    }}>
      {children}
    </GlobalContext.Provider>
  );
}