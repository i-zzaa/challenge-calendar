import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import { Context } from './Context';

const dataTodoStore = ({ children }) => {
  const [todo, setTodo] = useState({
    updateTodo: (item) => _updateTodo2(item),
    deleteTodo: (item) => _deleteTodo(item),
    updateSelectedTask: (item) => _updateSelectedTask(item),
    deleteSelectedTask: (item) => _deleteSelectedTask(item),
  });

  const _deleteSelectedTask = async (item) => {
    const previousTodo = [...todo];

    const newTodo = previousTodo.map((data) => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.filter((list) => {
          if (list.key === item.todo.key) {
            return false;
          }
          return true;
        });

        data.todoList = newTodoList;
        return data;
      }
      return data;
    });

    const checkForEmpty = newTodo.filter((data) => {
      if (data.todoList.length === 0) {
        return false;
      }
      return true;
    });

    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      setTodo({ ...todo, todo: checkForEmpty });
    } catch (error) {
      // Error saving data
    }
  };

  const _updateSelectedTask = async (item) => {
    const previousTodo = [...todo];

    const newTodo = previousTodo.map((data) => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.map((list) => {
          if (list.key === item.todo.key) {
            return item.todo;
          }
          return list;
        });
        data.todoList = newTodoList;
        return data;
      }
      return data;
    });

    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));

      setTodo({ ...todo, todo: newTodo });
    } catch (error) {
      // Error saving data
    }
  };

  const _updateTodo2 = async (item) => {
    const datePresent = todo.find((data) => {
      if (data.date === item.date) {
        return true;
      }
    });

    if (datePresent) {
      const updatedTodo = todo.map((data) => {
        if (datePresent.date === data.date) {
          data.todoList = [...data.todoList, ...item.todoList];
          return data;
        }
        return data;
      });
      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));

        setTodo({ ...todo, todo: updatedTodo });
      } catch (error) {
        // Error saving data
      }
    } else {
      const newTodo = [...todo, item];

      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));

        setTodo({ ...todo, todo: newTodo });
      } catch (error) {
        // Error saving data
      }
    }
  };

  const _deleteTodo = () => {};

  useEffect(async () => {
    try {
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) setTodo({ ...todo, todo: JSON.parse(todo) });
    } catch (error) {
      // Error saving data
    }
  }, [todo]);

  return <Context.Provider value={todo}>{children}</Context.Provider>;
};
export default dataTodoStore;