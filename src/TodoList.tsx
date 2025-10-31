import React from "react";
import type { Todo } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string, name: string) => void;
};

const TodoList = (props: Props) => {
  // ソート処理
  // const todos = [...props.todos].sort((a, b) => {
  //   if (a.isDone !== b.isDone) {
  //     return a.isDone ? 1 : -1; // 未完了タスクを先に表示
  //   } else if (a.deadline === null) {
  //     return 1; // aの期限がnullなら後ろに
  //   } else if (b.deadline === null) {
  //     return -1; // bの期限がnullなら後ろに
  //   } else {
  //     return a.deadline.getTime() - b.deadline.getTime();
  //   }
  // });
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          remove={props.remove}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;