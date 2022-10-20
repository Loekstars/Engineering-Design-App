import network
import socket
from time import sleep
import machine
from machine import Pin


ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password

led = Pin(13, Pin.OUT)

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
        sleep(1)
    
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
    lux = 1
    while True:#add a hardware shutdown
        client,addr = _connection.accept()
        print('Client connected from: ',addr)
        request = client.recv(1024)
        #request = str(request)
        
        #send the response stuff here
        
        #html = web_page(lux)
        client.send(b"1")#message revieved
        print(request)
        client.close()
        
#main code
try:
    ip = connect(ssid, password)
    #connection succes blink
    for i in range(0,5):
        led.value(1)
        sleep(0.5)
        led.value(0)
        sleep(0.5)
    connection = open_socket(ip)
    serve(connection)
except KeyboardInterrupt:
    machine.reset()