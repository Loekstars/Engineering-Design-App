SELECT date_time, sensor_index, TRUNC(AVG(sensor_data) OVER(GROUP BY sensor_index ORDER BY date_time ROWS BETWEEN 3 PRECEDING AND CURRENT ROW), 2) AS refined_data
FROM SensorData