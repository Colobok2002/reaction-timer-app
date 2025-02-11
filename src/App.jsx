import { useEffect, useState } from 'react'
import VirtualKeyboard from './components/VirtualKeyboard'
import { Button } from 'antd';

// Верхняя панель клавиш
const keyboardTop = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
// Боковая панель (NumPad) в виде сетки
const keyboardSide = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', ''], // 0 по центру
];

function App() {
  const [targetKey, setTargetKey] = useState(null);
  const [keyboardHk, setKeyboardHk] = useState("keyboardTop");
  const [useKeyboardSide, setUseKeyboardSide] = useState(true);

  const [pressedKey, setPressedKey] = useState(null);

  const highlightRandomKey = () => {
    if (useKeyboardSide) {

      if (Math.random() > 0.5) {
        setKeyboardHk("keyboardTop")
        const randomKey = Math.floor(Math.random() * 9);
        setTargetKey(randomKey.toString());
        setPressedKey(null);
      } else {
        setKeyboardHk("keyboardSide")
        const randomKey = Math.floor(Math.random() * 9);
        setTargetKey(randomKey.toString());
        setPressedKey(null);
      }
    } else {
      setKeyboardHk("keyboardTop")
      const randomKey = Math.floor(Math.random() * 9);
      setTargetKey(randomKey.toString());
      setPressedKey(null);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key;
      if (keyboardTop.includes(keyPressed)) {
        setPressedKey(keyPressed.toString());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", padding: 50 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 20 }}>Таймер реакции</div>

        <Button type="default" onClick={highlightRandomKey}>
          Подсветить случайную клавишу
        </Button>

        <Button type={useKeyboardSide ? 'primary' : 'default'} onClick={() => setUseKeyboardSide(!useKeyboardSide)}>
          {useKeyboardSide ? 'Включено' : 'Выключено'}
        </Button>
        <div>
          Нажатая клавиша
          {pressedKey}
        </div>
      </div>
      <VirtualKeyboard targetKey={targetKey} keyboardHk={keyboardHk} pressedKey={pressedKey} useKeyboardSide={useKeyboardSide} keyboardTop={keyboardTop} keyboardSide={keyboardSide}></VirtualKeyboard>
    </div>
  )
}

export default App
