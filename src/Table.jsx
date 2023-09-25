import "./App.css";
import { Link } from "react-router-dom";

//import { useState, useEffect } from "react";
//propsは小文字始まり，コンポーネントは大文字始まり
//keyにはindexを使わずに，idを用いた方がいい
//テーブルタグ以外のリストとかで試してみる
export const Tablefunc = ({ data }) => {
  //console.log(data[0]);
  return (
    <div className="Child">
      <table border="1" className="table_class">
        <thead>
          <tr>
            <th>スレッドタイトル</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablefunc;
