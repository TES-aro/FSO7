import { useState, useEffect } from 'react';
import anecdoteService from './services/anecdotes';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    form: {
      type,
      value,
      onChange
    },
    reset,
    //iffy about this one but laaazy
    value
  };
};

// modules can have several named exports
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
};

export const useAnecdotes = () => {
  const KEY = 'anecdote';
  const [anecdotes, setAnecdotes] = useLocalStorage(KEY, []);

  //I don't like this. it would be smarter so save the state in some other way
  // but this is the lazies option
  //
  // aaand now there's useCallback because useEffect wants init as a dependency
  // I'll just let it fetch from DB everytime
  /*
	const update = async () => {
		const item = window.localStorage.getItem(KEY);
		if (!item) {
			setAnecdotes( await anecdoteService.getAll());
			return;
		}
		return JSON.parse(item);
	};
	*/

  useEffect( () => {
    const init = async() => {
      setAnecdotes(await anecdoteService.getAll());
    };
    init();
  },[]);

  const createAnecdote = async (anecdote) => {
    try {
      const response = await anecdoteService.createNew(anecdote);
      console.log(response);
      setAnecdotes(anecdotes.concat(response));
    }
    catch (e) {
      console.error(e);
    }
  };

  const deleteAnecdote = async (anecdote) => {
    try {
      await anecdoteService.del(anecdote);
      setAnecdotes(anecdotes.filter(a => a.id !== anecdote.id));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    anecdotes,
    createAnecdote,
    deleteAnecdote
  };

};
