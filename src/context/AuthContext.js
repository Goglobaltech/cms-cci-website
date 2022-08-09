import React, { useReducer, createContext, useEffect } from "react";
import { auth } from "../firebase";

// reducer
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log(user?.auth?.currentUser, "user");
        user?.auth?.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            // console.log( "idToken" ,idToken);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: user?.email,
                token: idToken,
              },
            });
          })
          .catch(function (error) {
            // Handle error
          });

        // const idTokenResult = await user?.accessToken;
        // // console.log(idTokenResult , "token")
        // dispatch({
        //     type: 'LOGGED_IN_USER',
        //     payload: {
        //         email: user?.email,
        //         token: idToken,
        //     }
        // });
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
