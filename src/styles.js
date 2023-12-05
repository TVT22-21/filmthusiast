const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'rubik',
    
  },

  header: {
    backgroundColor: '#111',
    padding: '10px',
    textAlign: 'center',
  },

  inputText: {
    padding: '8px',
    width: '300px',
  },
  
  inputTextPassword: {
    padding: '8px',
    width: 'calc(20% - 10px)',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },

  inputSubmit: {
    padding: '8px 15px',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },

  modal: {
    display: 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0, 0, 0)',
    paddingTop: '60px',
  },

  modalContent: {
    backgroundColor: '#fefefe',
    margin: '5% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },

  close: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
  },

  closeHoverFocus: {
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',
  },

  button: {
    zIndex: 2,
    marginLeft: '10px',
  },

  registrationButton: {
    zIndex: 2,
    padding: '1px',
    backgroundColor: '#fefefe',
    color: 'rgb(0, 0, 0)',
    cursor: 'pointer',
    margin: 'auto',
    borderRadius: '5px',
  },

  formContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      maxWidth: '800px',
  },
  formElement: {
    marginRight: '10px',
    
  },

  h1: {
    color: '#fefefe',
  },

  appContainer: {
    position: 'relative',
    zIndex: 2, 
  },
  
  form: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  form1: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  
};

export default styles; 