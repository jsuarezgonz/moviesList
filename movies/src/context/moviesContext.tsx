import { createContext, useReducer, useContext } from "react";
import { Movie } from "../common/types";

type MoviesContextTypes = {
  myList: [];
  dispatch: React.Dispatch<any>;
};
type ProviderProps = {
  children?: React.ReactNode;
};

export const updateLocalStorage = (state: any) => {
  window.localStorage.setItem("myList", JSON.stringify(state));
};

export const MoviesContext = createContext({} as MoviesContextTypes);

const useMoviesContext = (): MoviesContextTypes => {
  return useContext(MoviesContext);
};

const initialState = {
  myList: JSON.parse(window.localStorage.getItem("myList") || "[]"),
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_MOVIE": {
      const movieId = action.value.id;
      const duplicated = state.myList.findIndex(
        (movie: { id: any }) => movie.id === movieId
      );

      if (duplicated >= 0) {
        const unifiedArray = state.myList.map((item: { id: Movie }) => {
          if (item.id === movieId) {
            return {
              ...item,
              my_vote: action.value.my_vote,
            };
          }
          return item;
        });
        const newState = {
          ...state,
          myList: unifiedArray,
        };
        updateLocalStorage(newState.myList);
        return newState;
      }

      const newState = {
        ...state,
        myList: [...state.myList, action.value],
      };
      updateLocalStorage(newState.myList);
      return newState;
    }
  }
  return state;
};

const MoviesProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MoviesContext.Provider value={{ myList: state.myList, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
export { MoviesProvider, useMoviesContext };
