import React, { FC, useState, useEffect } from "react";
import "./styles.css";

const App: FC = (): JSX.Element => {
  const [user, setUser] = useState("X");
  const [currentShown, setCurrentShown] = useState(0);
  const [indexData, setIndexData] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [indexState, setIndexState] = useState<string[][]>([]);
  const [winner, setWinner] = useState("");

  const calculateWinner = () => {
    if (
      (indexData[0] === indexData[1] && indexData[0] === indexData[2]) ||
      (indexData[0] === indexData[3] && indexData[0] === indexData[6]) ||
      (indexData[0] === indexData[4] && indexData[0] === indexData[8])
    ) {
      return indexData[0];
    } else if (indexData[1] === indexData[4] && indexData[1] === indexData[7]) {
      return indexData[1];
    } else if (
      (indexData[2] === indexData[5] && indexData[2] === indexData[8]) ||
      (indexData[2] === indexData[4] && indexData[2] === indexData[6])
    ) {
      return indexData[2];
    } else if (indexData[3] === indexData[4] && indexData[3] === indexData[5]) {
      return indexData[3];
    } else if (indexData[6] === indexData[7] && indexData[6] === indexData[8]) {
      return indexData[6];
    }

    return "";
  };

  useEffect(() => {
    const len = indexState.length;
    if (len < 10 && currentShown === len) {
      let arr = [...indexState, [...indexData]];
      setIndexState(arr);
    }
    const result = calculateWinner();
    if (result !== "") {
      setWinner(result);
    }
  }, [indexData]);

  const changeData = (index: number) => {
    if (indexData[index] === "" && winner === "") {
      // console.log(indexState.length);
      if (indexState.length - 1 !== currentShown) {
        setIndexState(indexState.slice(0, currentShown + 1));
      }
      let arr = [...indexData];
      arr[index] = user;
      setIndexData(arr);
      setCurrentShown(currentShown + 1);
      user === "X" ? setUser("O") : setUser("X");
    } else {
      alert("You can't edit");
    }
  };

  const resetState = () => {
    let arr = ["", "", "", "", "", "", "", "", ""];
    setIndexData(arr);
    setCurrentShown(0);
    setIndexState([]);
    setWinner("");
  };

  const updateState = (item: string[], index: number) => {
    setCurrentShown(index);
    setIndexData(item);
  };

  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="rowState">
      <div>
        <div className="flex">
          {array.map((item, index) => (
            <div className="flexChild" onClick={() => changeData(index)}>
              <div className="text">{indexData[index]}</div>
            </div>
          ))}
        </div>
        <button className="button" onClick={resetState}>
          restart
        </button>
      </div>
      <div className="columnData">
        <div>
          {winner !== "" ? `Winner: ${winner}` : `Next Player: ${user}`}
        </div>
        <div className="clickColumn">
          {indexState.map((item, index) => {
            if (index === 0) {
              return (
                <div>
                  {index + 1}.{" "}
                  <button
                    disabled={currentShown === 0}
                    onClick={() => updateState(item, index)}
                  >
                    Go to game start{" "}
                    {index === currentShown ? "(Current)" : null}
                  </button>
                </div>
              );
            }
            return (
              <div>
                {index + 1}.{" "}
                <button
                  disabled={index === currentShown}
                  onClick={() => updateState(item, index)}
                >
                  Move to Step #{index}{" "}
                  {index === currentShown ? "(Current)" : null}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
