import { useState, useEffect } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./RenderModal";
import {
  faTriangleExclamation as triangleExclamationSolid
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan as trashCanRegular
} from "@fortawesome/free-regular-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  // 1. ポップアップの表示状態を管理するstate
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. ポップアップを開く/閉じるための関数
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length; // 未完了タスクの数え上げ

  // const openTrashCan = () => {
    
  // }

  const isValidTodoName = (name: string): string => {
    if (name.length > 32) {
      return "32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        console.log(`${todo.name} : ${todo.isDone}`);
        return { ...todo, isDone: value }; // スプレッド構文
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);};

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt ? new Date(dt) : null);
  };

  const removeCompletedTodos = () => {
    const isRemove = window.confirm("完了済みのタスクを削除しますか？") ;
    const updatedTodos = isRemove ? todos.map((todo) => {
      return todo.isDone ? { ...todo, deleted: true } : todo;
    }) : todos;
    setTodos(updatedTodos);
  };

  const remove = (id: string, name: string) => {
    const isRemove = window.confirm(`"${name}" を削除しますか？`)
    const updatedTodos = isRemove ? todos.map((todo) => {
      return todo.id === id ? { ...todo, deleted: true } : todo;
    }) : todos;
    setTodos(updatedTodos);
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName === "" ? "新しいタスク" : newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      deleted: false
    };
    // スプレッド構文を使って、先頭に新タスクを追加した配列を作成
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos); // 作成した配列をtodosにセット
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
  };

  return (
    <div className="mx-4 mt-10 max-w-4xl md:mx-auto">

      <div className="fixed top-4 right-4 z-10">
        <button
          type="button"
          onClick={openModal}
          className={
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          }
        >
          ゴミ箱<FontAwesomeIcon icon={trashCanRegular} className="ml-1"/>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">モーダルウィンドウ</h2>
        <p className="mb-6">
          これはポップアップのコンテンツです。
          背景をクリックするか、下の閉じるボタンを押してください。
        </p>
        <div className="flex justify-end">
          <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600">
            閉じる
          </button>
        </div>
      </Modal>

      <h1 className="py-5 flex justify-center border-gray-500 border-b-3 mb-4 text-blue-700 text-6xl font-bold">Welcome to TodoApp!</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <div className="flex-col border-l-3 border-gray-500 pb-2 pl-3">
        <div className="text-xl font-bold mb-3">
          Tasks
        </div>
        <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={removeCompletedTodos}
          className={
            "mt-5 rounded-md bg-red-500 px-3 py-1 ml-auto font-bold text-white hover:bg-red-600"
          }
        >
          完了済みのタスクを削除<FontAwesomeIcon icon={trashCanRegular} className="ml-1"/>
        </button>
      </div>

      <div className="mt-5 space-y-2 rounded-md border-3 p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "grow rounded-md border-3 p-2",
                newTodoNameError && "border-red-500 outline-red-500"
              )}
              placeholder="32文字以内で入力してください"
            />
          </div>
          {newTodoNameError && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon
                icon={triangleExclamationSolid}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {["低", "中", "高"].map((value, index) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={index+1}
                checked={newTodoPriority === index + 1}
                onChange={(e) => setNewTodoPriority(Number(e.target.value))}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border-3 px-2 py-0.5"
          />
        </div>

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
            newTodoNameError && "cursor-not-allowed opacity-50"
          )}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;