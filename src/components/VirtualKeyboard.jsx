import { Row, Col } from 'antd';


const KeyButton = ({ keyValue, targetKey, keyPressed, keyboardHk, constKeyboardHk }) => {

    let _keyPressed = null;
    let _keyboardHk = null;

    if (typeof keyPressed === 'string' && keyPressed.includes("__")) {
        const parts = keyPressed.split("__");
        if (parts.length === 2) {
            [_keyPressed, _keyboardHk] = parts;
        }
    }

    const getBackgroundColor = () => {

        if (keyValue === targetKey && keyboardHk === constKeyboardHk) {
            return 'rgba(0, 255, 0, 0.5)';
        }

        if (_keyboardHk != null && _keyboardHk != keyboardHk && _keyPressed == targetKey && _keyboardHk == constKeyboardHk && _keyPressed == keyValue) {
            return 'rgba(139, 0, 0, 0.5)';
        }

        if (_keyboardHk === constKeyboardHk) {
            if (_keyPressed === keyValue) {
                if (keyValue !== targetKey && targetKey != null) {
                    return 'rgba(139, 0, 0, 0.5)';
                }
            }
        }

        // }
        // if ()
        return 'rgba(255, 255, 255, 0.1)';
    };

    const buttonStyle = {
        width: 60,
        height: 60,
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: getBackgroundColor(),
        color: 'black',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        transform: keyPressed === keyValue && keyValue === targetKey ? 'scale(1.1)' : 'scale(1)',  // Увеличение при правильном нажатии
    };

    return <div style={buttonStyle}>{keyValue}</div>;
};

export default function VirtualKeyboard({ targetKey, keyboardHk, useKeyboardSide, keyboardTop, keyboardSide, keyPressed, useOneKeyboard }) {

    if (useOneKeyboard) {
        if (!useKeyboardSide) {
            return (
                <>
                    <Row justify="center" gutter={[10, 10]}>
                        {keyboardTop.map((key) => (
                            <Col key={key} gap={10}>
                                <KeyButton
                                    keyValue={key}
                                    targetKey={targetKey}
                                    keyPressed={keyPressed}
                                    keyboardHk={keyboardHk}
                                    constKeyboardHk="keyboardTop"
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )
        }

        return (<>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {keyboardSide.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        {row.map((key, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} F>
                                {key ? (
                                    <KeyButton
                                        keyValue={key}
                                        targetKey={targetKey}
                                        keyPressed={keyPressed}
                                        keyboardHk={keyboardHk}
                                        constKeyboardHk="keyboardSide"
                                    />

                                ) : (
                                    <div style={{ width: 60, height: 60 }}></div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>)
    }
    return (
        <>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 20px", minHeight: "30%" }}>

                <Row justify="center" gutter={[10, 10]}>
                    {keyboardTop.map((key) => (
                        <Col key={key} gap={10}>
                            <KeyButton
                                keyValue={key}
                                targetKey={targetKey}
                                keyPressed={keyPressed}
                                keyboardHk={keyboardHk}
                                constKeyboardHk="keyboardTop"
                            />
                        </Col>
                    ))}
                </Row>


                {useKeyboardSide && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {keyboardSide.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                {row.map((key, colIndex) => (
                                    <div key={`${rowIndex}-${colIndex}`} F>
                                        {key ? (
                                            <KeyButton
                                                keyValue={key}
                                                targetKey={targetKey}
                                                keyPressed={keyPressed}
                                                keyboardHk={keyboardHk}
                                                constKeyboardHk="keyboardSide"
                                            />

                                        ) : (
                                            <div style={{ width: 60, height: 60 }}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
