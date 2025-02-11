import { useEffect, useState } from 'react';
import VirtualKeyboard from './components/VirtualKeyboard';
import { Button, List } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  // Импортируем компоненты для графика

// Верхняя панель клавиш
const keyboardTop = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
// Боковая панель (NumPad) в виде сетки
const keyboardSide = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', ''], // 0 по центру
];


const COUNT_ROUND = 3
function App() {
  const [targetKey, setTargetKey] = useState(null);
  const [keyboardHk, setKeyboardHk] = useState("keyboardTop");
  const [useKeyboardSide, setUseKeyboardSide] = useState(false);
  const [useRandomKey, setUseRandomKey] = useState(true)
  const [keyPressed, setKeyPressed] = useState(null)

  const [pressedKey, setPressedKey] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [round, setRound] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key;
      setKeyPressed(keyPressed)
      if (keyboardTop.includes(keyPressed) || (useKeyboardSide && keyPressed.match(/[0-9]/))) {
        setPressedKey(keyPressed);
        if (keyPressed === targetKey) {
          const reactionTime = Date.now() - startTime;
          setReactionTimes((prev) => [...prev, { attempt: prev.length + 1, time: reactionTime }]);

          if (round < COUNT_ROUND - 1) {
            setTimeout(() => highlightRandomKey(), 1000);
            setRound(round + 1);
          } else {
            setGameStarted(false);
            setTargetKey(null)
            setKeyPressed(null)
          }
          setStartTime(Date.now());
        }
      }
    };

    if (gameStarted) {
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [targetKey, gameStarted, round, useKeyboardSide, startTime]);


  const highlightRandomKey = () => {
    let randomKey;
    if (useKeyboardSide && Math.random() > 0.5) {
      setKeyboardHk("keyboardSide");

    } else {
      setKeyboardHk("keyboardTop");
    }
    if (useRandomKey) {
      randomKey = Math.floor(Math.random() * 10).toString();
    } else {
      randomKey = targetKey != null ? targetKey : Math.floor(Math.random() * 10).toString();
    }
    setTargetKey(randomKey);
    setPressedKey(null);
    setStartTime(Date.now());
    setKeyPressed(null)
  };


  const startGame = () => {
    setReactionTimes([]);
    setRound(0);
    setGameStarted(true);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          highlightRandomKey();
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", padding: 50 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 20 }}>Таймер реакции</div>

        <Button type="primary" onClick={startGame} disabled={gameStarted || countdown > 0}>
          {gameStarted ? 'Игра идёт...' : countdown > 0 ? `Начало через ${countdown}...` : 'Начать игру'}
        </Button>

        <Button type={useKeyboardSide ? 'primary' : 'default'} onClick={() => setUseKeyboardSide(!useKeyboardSide)} disabled={gameStarted}>
          {useKeyboardSide ? 'Боковая панель: Включена' : 'Боковая панель: Выключена'}
        </Button>
      </div>

      {countdown > 0 && (
        <div style={{ fontSize: 30, textAlign: 'center', marginTop: 20 }}>
          Игра начнётся через: <strong>{countdown}</strong> секунд
        </div>
      )}

      {/* Вывод результатов и графика */}
      {reactionTimes.length > 0 && !gameStarted && (
        <div style={{ display: 'flex', marginTop: 20, gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h3>Результаты времени реакции:</h3>
            <List
              bordered
              dataSource={reactionTimes}
              renderItem={(item) => (
                <List.Item>
                  Попытка {item.attempt}: {item.time} мс
                </List.Item>
              )}
            />
          </div>

          {/* График справа */}
          <div style={{ flex: 1 }}>
            <h3>График времени реакции:</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reactionTimes} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" label={{ value: 'Попытки', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Время (мс)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#1890ff" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <VirtualKeyboard
        targetKey={targetKey}
        keyboardHk={keyboardHk}
        pressedKey={pressedKey}
        useKeyboardSide={useKeyboardSide}
        keyboardTop={keyboardTop}
        keyboardSide={keyboardSide}
        keyPressed={keyPressed}
      />
    </div>
  );
}

export default App;
