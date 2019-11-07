import React from 'react';
import passport from 'passport';

function App () {
  const onClickFaceBookPassport = () => {
    // passport.
  };
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <button
        onClick={ onClickFaceBookPassport } 
        style={{
          border: '0',
          width: '300px',
          height: '50px',
          borderRadius: '10px',
          backgroundColor: '#1c7ed6',
          color: 'white',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        FACEBOOK
      </button>
    </div>
  );
}

export default App;
