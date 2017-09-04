export const login = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_START',
    });

    window.login(username, password)
      .then(() => {

        window.getIdentityIAm()
          .then(data => {
            dispatch({
              type: 'LOGIN_OK',
              data,
            });
          })
          .catch(err => {
            dispatch({
              type: 'LOGIN_ERR',
              err,
            });
          });
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_ERR',
          err,
        });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    window.logout()
      .then(() => {
        dispatch({
          type: 'LOGOUT_OK',
        });
      })
      .catch(err => {
        dispatch({
          type: 'LOGOUT_ERR',
          err,
        });
      });
  };
};