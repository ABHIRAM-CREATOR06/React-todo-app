
import React from 'react';
import { useTodo } from '@/context/TodoContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodo();

  return (
    <div className="flex justify-center gap-2 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilter('all')}
        className={cn(
          "text-sm",
          filter === 'all' && "bg-secondary"
        )}
        data-test-id="filter-all"
      >
        All
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilter('active')}
        className={cn(
          "text-sm",
          filter === 'active' && "bg-secondary"
        )}
        data-test-id="filter-active"
      >
        Active
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilter('completed')}
        className={cn(
          "text-sm",
          filter === 'completed' && "bg-secondary"
        )}
        data-test-id="filter-completed"
      >
        Completed
      </Button>
    </div>
  );
};

export default TodoFilter;
