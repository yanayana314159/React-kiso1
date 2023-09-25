import "./App.css";
import Tablefunc from "./Table";
import ThreadPage from "./ThreadPage";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(["a", "a"]); // データを保持するステート
  const BaseUrl = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com";
  useEffect(() => {
    // コンポーネントがマウントされた後にデータを取得
    fetch(`${BaseUrl}/threads`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // データをステートにセット
        setData(data);
      })
      .catch((error) => console.log("エラーが発生しました:", error));
  }, []); // 空の配列を依存性として渡すことで、一度だけ実行

  return (
    <>
      <header>
        <p>掲示板</p>
        <Link to="/thread/new">スレッドをたてる</Link>
      </header>

      <div className="App-body">
        <div className="Child">
          <p>新着スレッド一覧</p>
          {/* データが取得されたら表示 */}
          {data && <Tablefunc data={data} />}
        </div>
      </div>
    </>
  );
}

export default App;
