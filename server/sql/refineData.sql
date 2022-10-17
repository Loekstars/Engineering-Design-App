INSERT INTO refined_data(
    refined_data.timestamp,
    refined_data.sensor_id,
    refined_data.data
)
SELECT
    raw_data.timestamp AS t,
    raw_data.sensor_id AS s,
    TRUNC(
        AVG(sensor_data) OVER(
        GROUP BY
            sensor_index
        ORDER BY
            date_time ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
    ),
    2
    ) AS d
FROM
    raw_data
WHERE
    (t, s) NOT IN(
    SELECT
        refined_data.timestamp,
        refined_data.sensor_id
    FROM
        refined_data
)