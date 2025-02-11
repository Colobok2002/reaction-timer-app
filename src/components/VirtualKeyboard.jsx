import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Typography } from 'antd';

const { Title } = Typography;



export default function VirtualKeyboard({ targetKey, keyboardHk, useKeyboardSide, keyboardTop, keyboardSide, keyPressed }) {


    return (
        <>

            {keyPressed}

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 20px", margin: "auto 0 0 0", minHeight: "30%" }}>
                <Row justify="center" gutter={[10, 10]}>
                    {keyboardTop.map((key) => (
                        <Col key={key} gap={10}>
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    fontSize: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,

                                    // Логика подсветки
                                    backgroundColor:
                                        key === targetKey && keyboardHk === "keyboardTop"  // Подсветка нужной клавиши
                                            ? 'rgba(0, 255, 0, 0.5)'  // Зелёная подсветка для нужной клавиши

                                            : keyPressed === key  // Подсветка нажатой клавиши
                                                ? (key === targetKey
                                                    ? 'red'          // Красная, если нажата правильная клавиша
                                                    : 'rgba(139, 0, 0, 0.5)'       // Жёлтая, если нажата неправильная клавиша
                                                )

                                                : 'rgba(255, 255, 255, 0.1)',  // Стандартный цвет для неактивных клавиш

                                    color: 'black',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    cursor: 'pointer',
                                    transition: '0.3s ease-in-out',  // Плавная анимация при смене цвета
                                    transform: keyPressed === key && key === targetKey ? 'scale(1.1)' : 'scale(1)',  // Анимация увеличения для правильного нажатия
                                }}
                            >
                                {key}
                            </div>
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
                                            <div
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    fontSize: 24,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                    backgroundColor:
                                                        (targetKey === key && keyboardHk === "keyboardSide")
                                                            ? 'rgba(0, 255, 0, 0.3)'
                                                            : 'rgba(255, 255, 255, 0.1)',
                                                    color: 'black',
                                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    cursor: 'pointer',
                                                    transition: '0.3s',
                                                }}
                                            >
                                                {key}
                                            </div>

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
