// source: https://dev.to/sgolovine/persisting-usereducer-with-a-custom-react-hook-1j27

import { useEffect, useReducer, useRef, useState } from "react"
import deepEqual from "fast-deep-equal/es6"

export function usePersistedReducer<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  storageKey: string
) {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const prevState = usePrevious(state)

  function init(): State {
    const stringState = localStorage.getItem(storageKey)
    if (stringState) {
      try {
        return JSON.parse(stringState)
      } catch (error) {
        return initialState
      }
    } else {
      return initialState
    }
  }

  useEffect(() => {
    const stateEqual = deepEqual(prevState, state)
    if (!stateEqual) {
      const stringifiedState = JSON.stringify(state)
      localStorage.setItem(storageKey, stringifiedState)
    }
  }, [state])

  return dispatch
}

function usePrevious(value: any) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function getItem(key: string) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch(error) {
        console.log(error);
    }
}

function setItem(key: string, value: any) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
        console.log(error);
    }
}

export function usePersistedState(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        const item = getItem(key);

        // upon first loading the app
        if (key == "projects" && item == null) {
            setItem("notes/Template", "--- All changes are saved automatically --- \n(Example)\n Row 1: 5 dc \n Row 2: 2 sc in each dc around");
        }

        return item || initialValue;
    });

    useEffect(() => {
        setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}