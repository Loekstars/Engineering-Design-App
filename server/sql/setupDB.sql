CREATE TABLE RawData (
	date_time DEFAULT DATETIME NOT NULL,
	sensor_id int NOT NULL,
	sensor_data_raw int,
	CONSTRAINT measurement PRIMARY KEY (date_time, sensor_id)
);

CREATE TABLE RefinedData (
	date_time DEFAULT DATETIME NOT NULL,
	sensor_id int NOT NULL,
	sensor_data_refined int,
	CONSTRAINT measurement PRIMARY KEY (date_time, sensor_id)
);

CREATE TABLE Sensors (
	sensor_id int PRIMARY KEY,
	room_id int
);

CREATE TABLE Lights (
	light_id int PRIMARY KEY,
	light_lum int,
	room_id int
)

CREATE TABLE Rooms (
	room_id int PRIMARY KEY,
	room_name varchar(255)
)