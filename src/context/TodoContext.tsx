
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Todo type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Define the context type
interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filteredTodos: Todo[];
}

// Create context with default values
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider component
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Filter state
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a todo
  const editTodo = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        )
      );
    }
  };

  // Get filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        filter,
        setFilter,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using the todo context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
