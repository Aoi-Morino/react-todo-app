import React from "react";

// 引数の型を定義
type Props = {
  name: string;
  uncompletedCount: number;
};

// WelcomeMessage という関数コンポーネントの定義
const WelcomeMessage = (props: Props) => {
  // const currentTime = new Date();
  const uncompletedCount = props.uncompletedCount;
  // const greeting =
  //   currentTime.getHours() < 12
  //   ? "おはようございます"
  //   : currentTime.getHours() < 19 ? "こんにちは" : "こんばんは";

  // return (
  //   <div className="text-2xl pb-5">
  //     おかえりなさい、{props.name}さん。<br/>
  //     {uncompletedCount ? `未完了のタスクが ${uncompletedCount}個 残っています。` : `未完了のタスクはありません。`}
  //   </div>
  // );

  return (
    <div className="text-2xl pb-5">
      おかえりなさい。<br/>
      {uncompletedCount ? `未完了のタスクが ${uncompletedCount}個 残っています。` : `未完了のタスクはありません。`}
    </div>
  );
};

export default WelcomeMessage;