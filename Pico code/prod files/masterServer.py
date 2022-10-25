import network
import socket
from time import sleep
import machine
from machine import Pin
import urequests


ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password

led = Pin(13, Pin.OUT)
buttonState = True

#set static ip
#sta_if.active(True)
#sta_if.ifconfig(('192.168.137.215', '255.255.255.0', 80,'8.8.8.8'))
#print(sta_if.ifconfig())
#('192.168.137.30', '255.255.255.0', '192.168.137.1', '192.168.137.1')

#connect to a wlan and return the ip adress
def connect(_ssid, _password):
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.ifconfig(('192.168.137.30', '255.255.255.0', '192.168.137.1', '192.168.137.1'))#set static ip adress?
    wlan.connect(_ssid, _password)
    #wait for connection
    max_wait = 10
    while max_wait > 0:
        if wlan.status() < 0 or wlan.status() > 3:
            break
        max_wait -= 1
        print('Waiting for connection...')
        sleep(0.5)
    
    if wlan.status() != 3:
        raise RuntimeError('network connection failed')
    else:
        print('connected')
        status = wlan.ifconfig()
        print(status)
        ip = status[0]
        print ('ip: ' + ip)
        led.value(1)
        return ip

#open a socket on port 80
def open_socket(_ip):
    address = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
    connection = socket.socket()
    connection.bind(address)
    connection.listen(1)
    print('Listening on: ', address)
    return connection

#start a web server
def serve(_connection):
    global buttonState
    while True:
        client,addr = _connection.accept()
        print('Client connected from: ',addr)
        request = client.recv(1024)
        request = str(request)
        #print(request)
        
        #process the request
        splitStr = request[2:len(request)-1]#remove the ' and b
        splitStr = splitStr.split(' ') 
        
        if splitStr[0] == 'req':
            #this is a request for a value
            #get the brightness value and state of the lamp from the app
            buttonState = splitStr[1]
            url = "http://192.168.137.199:3001/api/brightness"
            print('sending request to API')
            r = urequests.get(url)#get the brightness and buttonstate in a json format
            json = r.json()
            
            print(json)#[0] brightness, [1] state
            
            #todo process the stuff from the response here
            if json[1] == 1:
                buttonState = True
            elif json[1] == 0:
                buttonState = False
            else:
                print('invalid buttonstate')
                buttonState = True
            
            brightness = round((json[0]/10000)*65535)#calculate brightness value
            
            r.close()
            response = str(brightness) + ' ' + str(buttonState)
            print('response: ' +response + '\n's)
        elif splitStr[0] == 'send':
            #this is a sensor value that gets send
            response = 'MSGRECIEVED'#message recieved
                
            #send the value to the database
            sensorid = splitStr[2]#the third part is the sensor id
            url = "http://192.168.137.199:3001/api/insert?sensorid="+ sensorid +"&data="
        
            if buttonState:
                sensor_measurement = splitStr[1]#get the second part of the message and convert it to a percentage
            elif not buttonState:
                sensor_measurement = 65535#if the light is turned off, sends a full brightness value
            else:
                print('buttonstate invalid')
                sensor_measurement = 65535#in case of an error turn off the lamp
            dataURL = url + str(sensor_measurement)
                
            print("Sending to API...\n")
            r = urequests.head(dataURL)
            r.close()
        else:
            response = 'INVALIDMSG'
            print('INVALID REQUEST')
        
        client.send(response)#message revieved
        client.close()
        
#main code
try:
    ip = connect(ssid, password)
    connection = open_socket(ip)
    serve(connection)
except KeyboardInterrupt:
    machine.reset()