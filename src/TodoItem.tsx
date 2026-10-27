import React from "react";
import type { Todo } from "./types";
import DateFormatter from "./DateFormatter";
import RenderPriorityStars from "./RenderPriorityStars";
import DeadlineIsComing from "./DateCheck";
import { borderPrColor, borderPrColorIsDone } from "./PrColorMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare as checkSquareSolid
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as squareRegular,
  faTrashCan as trashCanRegular
} from '@fortawesome/free-regular-svg-icons';
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string, name: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center">
      <label htmlFor={`${todo.id}-checkbox`} className="cursor-pointer flex items-center space-x-2">
        <input
          id={`${todo.id}-checkbox`}
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer hidden"
        />
        {todo.isDone ? (
          // チェックされている時のアイコン
          <FontAwesomeIcon icon={checkSquareSolid} className="text-blue-500 hover:text-blue-800 text-3xl" />
        ) : (
          // チェックされていない時のアイコン
          <FontAwesomeIcon icon={squareRegular} className="text-gray-400 hover:text-blue-800 text-3xl" />
        )}
      </label>

      <div
        className={twMerge(
          "rounded-md flex items-center border-3 px-3 py-2 grow bg-white",
            todo.isDone ? borderPrColorIsDone[todo.priority] || "" : borderPrColor[todo.priority] || ""
        )}
      >
        <div
          className={twMerge(
            "flex items-center border-r-3 pr-2 mr-2",
            todo.isDone ? borderPrColorIsDone[todo.priority] || "" : borderPrColor[todo.priority] || ""
          )}
        >
          {RenderPriorityStars(todo.priority, todo.isDone)}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <div className={
            todo.isDone ? "line-through text-gray-400" : ""
          }>
            {todo.name}
          </div>
          <div className={
            todo.isDone ? " text-gray-400" : todo.deadline !== null && DeadlineIsComing(todo.deadline) ? "text-red-500 font-bold" : ""
          }>
            期限: {todo.deadline ? DateFormatter(todo.deadline) : "なし"}
          </div>
        </div>

        <button
          onClick={() => props.remove(todo.id, todo.name)}
          className="rounded-md bg-red-500 px-2 py-1 ml-auto text-sm font-bold text-white shrink-0 hover:bg-red-700"
        >
          削除<FontAwesomeIcon icon={trashCanRegular} className="ml-1"/>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;