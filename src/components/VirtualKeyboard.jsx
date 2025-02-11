import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Typography } from 'antd';

const { Title } = Typography;



export default function VirtualKeyboard({ targetKey, keyboardHk, useKeyboardSide, keyboardTop,keyboardSide }) {


    return (
        <>



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
                                    backgroundColor:
                                        (targetKey === key && keyboardHk === "keyboardTop")
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
