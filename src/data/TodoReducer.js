//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

const TodoReducer = async (state, action) => {
  const { todo } = state.todo;
  const item = action.payload;

  switch (action.type) {
    case 'UPDATE_TODO': {
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

          return { ...todo, todo: updatedTodo };
        } catch (error) {
          // Error saving data
        }
      } else {
        const newTodo = [...todo, item];

        try {
          await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));

          return { ...todo, todo: newTodo };
        } catch (error) {
          // Error saving data
        }
      }
      break;
    }
    case 'DELETE_TODO': {
      return {
        ...state,
        deleteTodo: action.payload,
      };
    }
    case 'UPDATE_SELECT_TASK': {
      const _previousTodo = [...todo];

      const newTodo = _previousTodo.map((data) => {
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

        return {
          ...state,
          todo: newTodo,
        };
      } catch (error) {
        // Error saving data
      }
      break;
    }
    case 'DELETE_SELECT_TASK': {
      const __previousTodo = [...todo];

      const _newTodo = __previousTodo.map((data) => {
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

      const checkForEmpty = _newTodo.filter((data) => {
        if (data.todoList.length === 0) {
          return false;
        }
        return true;
      });

      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));

        return {
          ...state,
          deleteSelectedTask: checkForEmpty,
        };
      } catch (error) {
        // Error saving data
      }
      break;
    }
  }
};

export default TodoReducer;
