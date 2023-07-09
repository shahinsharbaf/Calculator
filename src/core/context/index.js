import { createContext, useContext, useReducer, useMemo } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Calculator React main context
const Calculator = createContext();

// Setting custom name for the context which is visible on react dev tools
Calculator.displayName = "Calculator";

// Calculator React reducer
function reducer(state, action) {
  try {
    switch (action.type) {
      case "LOADING": {
        return { ...state, loading: action.value };
      }
      case "login": {
        const newData = {
          ...state,
          authenticated: true,
          name: action.value.name,
          email: action.value.email,
          userRole: action.value.userRole,
          id: action.value.id,
          image: action.value.image,
          wallet: action.value.wallet,
        };
        localStorage.setItem("@user", JSON.stringify(newData));
        return newData;
      }
      case "logout": {
        const newData = {
          authenticated: false,
          name:"",
          email: "",
          userRole: "",
          id: "",
          image: "",
          wallet: 0,
        };
        localStorage.setItem("@user", JSON.stringify(newData));
        return newData;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  } catch (err) {
    return state;
  }
}
let initialState =
  typeof window !== "undefined" ? localStorage.getItem("@user") : null;

if (!initialState) {
  initialState = {
    authenticated: false,
    name: "",
    email: "",
    userRole: "",
    id: "",
    image: "",
    wallet: 0,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("@user", JSON.stringify(initialState));
  }
} else {
  initialState = JSON.parse(initialState);
}

function CalculatorControllerProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <Calculator.Provider value={value}>{children}</Calculator.Provider>;
}

// Calculator React custom hook for using context
function useCalculatorController() {
  const context = useContext(Calculator);
  if (!context) {
    throw new Error(
      "use Controller should be used inside the  ControllerProvider."
    );
  }
  return context;
}

// Typechecking props for the  ControllerProvider
CalculatorControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setLoading = (dispatch, value) => dispatch({ type: "LOADING", value });
const setLogin = (dispatch, value) => dispatch({ type: "login", value });
const setLogOut = (dispatch) => dispatch({ type: "logout" });

export {
  CalculatorControllerProvider,
  useCalculatorController,
  setLoading,
  setLogin,
  setLogOut,
};
