import React from "react";
import type { Todo } from "./types";
import DateFormatter from "./DateFormatter";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string, name: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
        {todo.isDone && "[完] "}{todo.name} 優先度: {todo.priority} 期限: {todo.deadline ? DateFormatter(todo.deadline) : "なし"}
        <button
          onClick={() => props.remove(todo.id, todo.name)}
          className="rounded-md bg-red-500 px-2 py-1 ml-auto text-sm font-bold text-white hover:bg-red-700"
        >
          削除
        </button>
    </div>
  );
};

export default TodoItem;