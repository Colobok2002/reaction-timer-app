import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { List } from 'antd';

export default function Dashboard({ reactionTimes, gameStarted, }) {
    return (
        <div>
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
        </div>
    )
}
