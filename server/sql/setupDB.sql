CREATE TABLE SensorData (
	date_time DEFAULT DATETIME NOT NULL,
	sensor_id int NOT NULL,
	sensor_data_raw int,
	sensor_data_refined,
	CONSTRAINT measurement PRIMARY KEY (date_time, sensor_id)
);

CREATE TABLE Sensors (
	sensor_id int PRIMARY KEY not NULL,
	room_id int NOT NULL
);

CREATE TABLE Lights (
	light_id int PRIMARY KEY NOT NULL,
	room_id int NOT NULL,
	light_lum int
)

CREATE TABLE Rooms (
	room_id int PRIMARY KEY NOT NULL,
	room_name varchar(255) NOT NULL,
	room_illum int,
	sensor_sens int
)