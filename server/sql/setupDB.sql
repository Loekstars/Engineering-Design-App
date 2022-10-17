CREATE TABLE SensorData (
	date_time DATETIME PRIMARY KEY,
	sensor_id int PRIMARY KEY,
	sensor_data_raw int,
	sensor_data_refined int,
	--FOREIGN KEY (sensor_id)
)

CREATE TABLE Sensors (
	sensor_id int PRIMARY KEY,
	room_id int NOT NULL,
	--FOREIGN KEY (room_id)
)

CREATE TABLE Lights (
	light_id int PRIMARY KEY,
	room_id int NOT NULL,
	light_lum int
	--FOREIGN KEY (room_id)
)

CREATE TABLE Rooms (
	room_id int PRIMARY KEY,
	room_name varchar(255) UNIQUE NOT NULL,
	room_illum int,
	sensor_sens int
)