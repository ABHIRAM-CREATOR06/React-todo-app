
import React from 'react';
import { useTodo } from '@/context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { filteredTodos } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks to display
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
