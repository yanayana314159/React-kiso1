import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const ThreadPage = () => {
  const [title, setTitle] = useState(""); // データを保持するステート
  return (
    <>
      <header>
        <p>掲示板</p>
        <Link to="/home">スレッド一覧にもどる</Link>
      </header>
      <div className="Child">
        <p>新しいスレッドを作成しよう</p>
        <input
          className="input-thread"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <button
          className="btn-thread"
          onClick={() => {
            PostThread(title);
            setTitle("");
          }}
        >
          作成
        </button>
      </div>
      <div className="App-body">
        <Link to="/home">Home</Link>
      </div>
    </>
  );
};

const PostThread = (Threadtitle) => {
  console.log(Threadtitle);
  const BaseUrl = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com";
  const requestBody = {
    title: Threadtitle,
  };

  fetch(`${BaseUrl}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSONデータを送信するために必要
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        console.log("送信できました");
        console.log(Threadtitle);
      } else {
        console.log("エラーが発生しました:", response.status);
        console.log(Threadtitle);
      }
    })
    .catch((error) => console.log("エラーが発生しました:", error, Threadtitle));
};

export default ThreadPage;
