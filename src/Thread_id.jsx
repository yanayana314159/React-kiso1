//keyがおかしい，indexにするとエラーが起きないこと
//threadタイトルの引用方法
//useeffectの使い方
/*
1
//実際に自分が使った際にどうなるか
//ユーザーが使った際に，post状況を確認するべき
バリデーション
2
シンプルかつ正しい英語名
//変数名　命名規約，大文字小文字の使い方　JSはキャメルケース：複数の単語を先頭の文字を先頭．一番先頭は小文字
//アッパーキャメルケース
//スネークケース：データベース
//ケバブケース：HTML
//関数でケバブケースはない

*/
import "./App.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Thread_id = () => {
  //スネークケース
  const [message, setMessage] = useState(""); // データを保持するステート setMessage

  const thread_id = useParams();
  //console.log("thread_idは:", thread_id.thread_id);
  //22cc7b2e-d62d-469b-b9a0-9328e13f000a
  return (
    <>
      <header>
        <p>掲示板</p>
        <Link to="/home">スレッド一覧に戻る</Link>
      </header>
      <div className="App-body">
        <div className="Child">
          <p>スレッドに書き込む</p>
          <input
            className="input-thread"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></input>
          <button
            className="btn-thread"
            onClick={() => {
              Postreply({ message: message, id: thread_id.thread_id });
              setMessage("");
            }}
          >
            作成
          </button>
        </div>
        <div className="Child">
          <p>スレッド</p>
          <Getreply id={thread_id && thread_id.thread_id} />
        </div>
        <Link to="/home">Home</Link>
      </div>
    </>
  );
};
//useeffectでasync awaitを使えない時にPromiseを用いる
const Getreply = (id) => {
  //パスカルケース
  //console.log("idは:", id);
  const [replies, setreplies] = useState([
    { id: "1", post: "まだリプがありません" },
  ]); // データを保持するステート

  const BaseUrl = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com";

  // コンポーネントがマウントされた後にデータを取得
  fetch(`${BaseUrl}/threads/${id.id}/posts`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // レスポンスから posts 配列を取得
      const posts = data.posts;

      // 抜き出した posts 配列を使って何か処理を行う
      setreplies(posts);
    })
    .catch((error) => {
      console.error("データの取得中にエラーが発生しました", error);
    });
  if (replies.length === 0) {
    setreplies([{ id: "1", post: "まだリプがありません" }]);
  }

  return (
    <>
      <div className="Child">
        <table width="1000pc" border="1" className="table_class">
          <tbody>
            {replies.map((reply) => (
              <tr key={reply.id}>
                <td>{reply.post}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
//postReply
//コンポーネントにするか関数にするか揃えた方がいい
//async awaitが今の時流
const Postreply = ({ message, id }) => {
  //console.log(message, id);
  const BaseUrl = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com";
  const requestBody = {
    post: message,
  };

  fetch(`${BaseUrl}/threads/${id}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSONデータを送信するために必要
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        console.log("送信できました", message);
      } else {
        console.log("エラーが発生しました:", response.status);
      }
    })
    .catch((error) => console.log("エラーが発生しました:", error));
};
export default Thread_id;

/*

 */
