import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Context } from './Context';

const DataTodoStore = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const _TODO = {
    updateTodo: (item) => _updateTodo2(item),
    deleteTodo: (item) => _deleteTodo(item),
    updateSelectedTask: (item) => _updateSelectedTask(item),
    deleteSelectedTask: (item) => _deleteSelectedTask(item),
    cleanAll: () => _cleanAll(),
    getTodos: async() => {
      try {
        await JSON.parse(AsyncStorage.getItem('TODO') ?? '[]')
      } catch (error) {

      }
    },
  };

  const _createTodo =  (currentDay, item) => {
    const creatTodo = {
      key:  uuidv4(),
      date: currentDay,
      todoList: [
        {
          key: item.key ? item.key :  uuidv4(),
          title: item.title,
          notes: item.notes,
          date: item.date,
          city: item.city,
          weather: {
            temp: item.weather.temp,
            description: item.weather.description,
          },
          alarm: {
            time: item.alarm.time,
            isOn: item.alarm.isOn,
            createEventAsyncRes: item.alarm.createEventAsyncRes,
          },
          color: item.color,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuidv4(),
            color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
              Math.random() * Math.floor(256)
            )},${Math.floor(Math.random() * Math.floor(256))})`,
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };

    return creatTodo;
  }

  const _cleanAll = async () => {
    try {
      await AsyncStorage.setItem('TODO', JSON.stringify([]));
      setTodo([]);
    } catch (error) {
      // Error saving data
    }
  };

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
      setTodo(checkForEmpty);
    } catch (error) {
      // Error saving data
    }
  };

  const _deleteTask = async (item, todo__) => {
    const previousTodo = [...todo__];
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
    return newTodo;
  };


  const _updateSelectedTask = async (itemAlterado) => {
    //data -> tasks de todos os dias
    var moveDate = false;
    const copyTodo = [];
    todo.forEach((val) => copyTodo.push(Object.assign({}, val)));

    copyTodo.forEach(async function (day, index) {
      if (day.date === itemAlterado.date) {
        day.todoList.forEach(async function (task, index2) {
          if (task.key === itemAlterado.todo.key) {
            var hash = require('object-hash');
            const h1 = hash(itemAlterado.todo);
            const h2 = hash(task);

            if (h1 !== h2 && itemAlterado.todo.date !== task.date) { // se o hash for diferente e as datas tbm, então houve mudança no dia da semana
              _deleteTask(itemAlterado, copyTodo);
              itemAlterado.date = itemAlterado.todo.date;
              moveDate = true;
            } else if (h1 !== h2) { // se só o hash for diferente, as datas não foram alteradas, apenas algum outro atributo
              copyTodo[index].todoList[index2] = Object.assign({}, itemAlterado.todo); 
            }
            //se o hash for igual, então não houve nenhuma alteração e pode passar direto
          }
        });
      }
    });

    

    if (moveDate) {
      var createDay = true; // caso não exista nada criado previamente para o dia a ser movido a task
      copyTodo.forEach(async function (day, index) {
        if (day.date === itemAlterado.date) {
          day.todoList.push(itemAlterado.todo);
          createDay = false;
        }
      });

      if (createDay) {
        const newDay = Object.assign({}, copyTodo[0]);
        newDay.key = uuidv4();
        newDay.date = itemAlterado.date;
        newDay.todoList = [];
        newDay.todoList.push(itemAlterado.todo);
        copyTodo.push(newDay);
      }
    }

    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(copyTodo));
      setTodo(copyTodo);
    } catch (error) {
      // Error saving data
    }
  };


  const _updateTodo2 = async (item) => {
    if (typeof todo === 'number') {
      await AsyncStorage.setItem('TODO', JSON.stringify([]));
      setTodo([]);
    }
    const datePresent = todo.length
      ? todo.find((data) => {
          if (data.date === item.date) {
            return true;
          }
        })
      : null;

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

        setTodo(updatedTodo);
      } catch (error) {
        // Error saving data
      }
    } else {
      const newTodo = todo.length ? todo : [];
      newTodo.push(item);

      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));

        setTodo(newTodo);
      } catch (error) {
        // Error saving data
      }
    }
  };

  const _deleteTodo = () => {};

  useEffect(() => {
    const effect = async () => {
      try {
        const todo = await AsyncStorage.getItem('TODO');
        if (todo !== null) {
          setTodo(JSON.parse(todo));
        }
      } catch (error) {
        // Error saving data
      }
    };

    effect();
  }, []);

  return <Context.Provider value={_TODO}>{children}</Context.Provider>;
};
export default DataTodoStore;
