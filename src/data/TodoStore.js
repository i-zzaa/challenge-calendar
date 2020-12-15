import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useReducer } from 'react';

import { Context } from './Context';
import TodoReducer from './TodoReducer';

const DataTodoStore = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, { todo: null });

  useEffect(() => {
    console.log('fjdhkshufkhsudkfhsudkhfksduhfksdhfksudhfksf');
    const effect = async () => {
      try {
        console.log('teste');
        const _todo = await AsyncStorage.getItem('TODO');
        if (_todo !== null) {
          dispatch({ type: 'UPDATE_TODO', todo: JSON.parse(_todo) });
        }
      } catch (error) {
        // Error saving data
      }
    };

    effect();
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export default DataTodoStore;
