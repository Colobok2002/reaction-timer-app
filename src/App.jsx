import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Progress } from 'antd';

import VirtualKeyboard from './components/VirtualKeyboard';
import Dashboard from './components/Dashboard';

// Верхняя панель клавиш
const keyboardTop = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// Боковая панель (NumPad) в виде сетки
const keyboardSide = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', ''],
];

const COUNT_ROUND = 3;
const DELAY_NEXT_ROUND = 2
const DELAY_START_GAME = 2

function App() {
  const [targetKey, setTargetKey] = useState(null);
  const [targetKeyCache, setTargetKeyCache] = useState(null);

  const [keyboardHk, setKeyboardHk] = useState("keyboardTop");
  const [useOneKeyboard, setUseOneKeyboard] = useState(true)
  // TODO: на useRef
  const useKeyboardSide = useRef(false);
  const [useRandomKey, setUseRandomKey] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [round, setRound] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [nextRoundCountdown, setNextRoundCountdown] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key;


      if (keyboardTop.includes(keyPressed) || (useKeyboardSide.current && keyPressed.match(/[0-9]/))) {
        setKeyPressed(keyPressed + "__" + (event.code.replace(/[0-9]+$/, '') == "Digit" ? "keyboardTop" : "keyboardSide"));
        if (keyPressed === targetKey && ((event.code.replace(/[0-9]+$/, '') == "Digit" ? "keyboardTop" : "keyboardSide") == keyboardHk)) {
          const reactionTime = Date.now() - startTime;
          setReactionTimes((prev) => [...prev, { attempt: prev.length + 1, time: reactionTime }]);

          if (round < COUNT_ROUND - 1) {
            setRound(round + 1);
            setNextRoundCountdown(DELAY_NEXT_ROUND);
            setStartTime(Date.now())
          } else {
            setGameStarted(false);
            setTargetKey(null);
            setKeyPressed(null);
            setTargetKeyCache(null)
          }
        }
      }
    };

    if (gameStarted) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [targetKey, gameStarted, round, useKeyboardSide, startTime]);

  useEffect(() => {
    if (nextRoundCountdown > 0) {
      if (nextRoundCountdown == DELAY_NEXT_ROUND) {
        setTargetKey(null);
      }
      setTimeout(() => setNextRoundCountdown(nextRoundCountdown - 1), 1000)

    } else {
      if (gameStarted) {
        highlightRandomKey()
      }
    }
  }, [nextRoundCountdown]);

  const highlightRandomKey = () => {
    setTargetKey(null);

    let randomKey;
    console.log(useOneKeyboard)
    if (useOneKeyboard) {
      if (useKeyboardSide.current) {
        setKeyboardHk("keyboardSide");
      } else {
        setKeyboardHk("keyboardTop");
      }
    } else {
      if (useKeyboardSide.current && Math.random() > 0.6) {
        setKeyboardHk("keyboardSide");
      } else {
        setKeyboardHk("keyboardTop");
      }
    }

    if (useRandomKey) {
      randomKey = Math.floor(Math.random() * 10).toString();
    } else {
      randomKey = targetKeyCache != null ? targetKeyCache : Math.floor(Math.random() * 10).toString();
    }
    setTargetKey(randomKey);
    if (targetKeyCache == null) {
      setTargetKeyCache(randomKey);
    }

    setStartTime(Date.now());
    setKeyPressed(null);

  };

  const startGame = (levl = 1) => {
    if (levl == 1) {
      setUseOneKeyboard(true)
      useKeyboardSide.current = false;
      setUseRandomKey(false);
      setKeyboardHk("keyboardTop");
    }
    else if (levl == 2) {
      useKeyboardSide.current = false;
      setUseRandomKey(true);
      setUseOneKeyboard(true)
      setKeyboardHk("keyboardTop");
    }
    else if (levl == 3) {
      useKeyboardSide.current = true;
      setUseRandomKey(false);
      setUseOneKeyboard(true)
      setKeyboardHk("keyboardSide");
    }
    else if (levl == 4) {
      useKeyboardSide.current = true;
      setUseRandomKey(true);
      setUseOneKeyboard(true)
      setKeyboardHk("keyboardSide");
    }
    else if (levl == 5) {
      setUseRandomKey(true);
      useKeyboardSide.current = true;
      setUseOneKeyboard(false);
      setKeyboardHk("keyboardSide");
    }
    setReactionTimes([]);
    setRound(0);
    setGameStarted(true);
    setCountdown(DELAY_START_GAME);

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
    <div style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", padding: 50, gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 20 }}>Таймер реакции</div>

        {!gameStarted && <>
          <Button type="primary" onClick={() => startGame(1)} disabled={gameStarted || countdown > 0}>
            {'Уровень 1'}
          </Button>
          <Button type="primary" onClick={() => startGame(2)} disabled={gameStarted || countdown > 0}>
            {'Уровень 2'}
          </Button>
          <Button type="primary" onClick={() => startGame(3)} disabled={gameStarted || countdown > 0}>
            {'Уровень 3'}
          </Button>
          <Button type="primary" onClick={() => startGame(4)} disabled={gameStarted || countdown > 0}>
            {'Уровень 4'}
          </Button>
          <Button type="primary" onClick={() => startGame(5)} disabled={gameStarted || countdown > 0}>
            {'Уровень 5'}
          </Button>
        </>}
      </div>

      {(countdown > 0 || nextRoundCountdown > 0) ? (

        <div style={{ fontSize: 30, textAlign: 'center', marginTop: 20 }}>
          {countdown > 0 && (
            <div>
              <div style={{ marginBottom: 10 }}>
                <>Тест начнётся через: {countdown}</>
              </div>
              {/* <Progress
                type="circle"
                percent={(100 * (DELAY_START_GAME - countdown)) / DELAY_START_GAME}
                format={() => `${countdown} сек`}
                strokeColor="#1890ff"
              /> */}
            </div>
          )}

          {nextRoundCountdown > 0 && (
            <div style={{ fontSize: 24, marginTop: 40 }}>
              {/* <Progress
                type="circle"
                percent={(100 * (DELAY_NEXT_ROUND - nextRoundCountdown + 1)) / DELAY_NEXT_ROUND}
                format={() => `${nextRoundCountdown} сек`}
                strokeColor="#1890ff"
              /> */}
              <div style={{ marginBottom: 10 }}>
                <>Тест начнётся через: {nextRoundCountdown}</>
              </div>

            </div>
          )}
        </div>
      ) : (
        <>
          {gameStarted && (
            <VirtualKeyboard
              targetKey={targetKey}
              keyboardHk={keyboardHk}
              useKeyboardSide={useKeyboardSide.current}
              keyboardTop={keyboardTop}
              keyboardSide={keyboardSide}
              keyPressed={keyPressed}
              useOneKeyboard={useOneKeyboard}
            />
          )}
        </>
      )}
      <Dashboard reactionTimes={reactionTimes} gameStarted={gameStarted}></Dashboard>
    </div>

  );
}

export default App;
