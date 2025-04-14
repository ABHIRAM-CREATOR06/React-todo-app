
import React, { useState } from 'react';
import { useTodo } from '@/context/TodoContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash, Edit, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(text);
  };

  const handleSave = () => {
    if (editedText.trim() && editedText !== text) {
      editTodo(id, editedText);
    } else {
      setEditedText(text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  return (
    <Card className="mb-3 p-4 shadow-sm hover:shadow transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={completed} 
          onCheckedChange={() => toggleTodo(id)}
          className="h-5 w-5"
          id={`todo-${id}`}
          data-test-id="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="flex flex-1 gap-2">
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="flex-1"
              autoFocus
              data-test-id="edit-todo-input"
            />
            <Button size="icon" variant="ghost" onClick={handleSave} data-test-id="save-edit-button">
              <Check className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} data-test-id="cancel-edit-button">
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        ) : (
          <>
            <label
              htmlFor={`todo-${id}`}
              className={cn(
                "flex-1 cursor-pointer text-sm",
                completed && "text-muted-foreground line-through"
              )}
            >
              {text}
            </label>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={handleEdit} data-test-id="edit-todo-button">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteTodo(id)} data-test-id="delete-todo-button">
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TodoItem;
