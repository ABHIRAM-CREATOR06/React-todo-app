
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodo } from '@/context/TodoContext';
import { Plus } from 'lucide-react';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full max-w-md">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow"
        data-test-id="new-todo-input"
      />
      <Button type="submit" size="icon" data-test-id="add-todo-button">
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add todo</span>
      </Button>
    </form>
  );
};

export default TodoForm;
