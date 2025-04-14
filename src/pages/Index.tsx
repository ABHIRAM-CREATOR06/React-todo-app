
import React from 'react';
import { TodoProvider } from '@/context/TodoContext';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';

const Index: React.FC = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">Todo List</h1>
            <TodoForm />
            <TodoFilter />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default Index;
