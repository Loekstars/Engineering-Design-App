import network
import socket
from time import sleep
import machine
from machine import Pin
import urequests
import _thread
from bh1750 import BH1750

ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password
serverIP = '192.168.137.30'
serverURL = "http://" + serverIP
led = Pin(13, Pin.OUT)

#the light sensor
i2c = machine.I2C(0, scl = Pin(17), sda = Pin(16))
sensor = BH1750(i2c)

#the second thread
def second_thread(measureInterval):
    while True:
       print(sensor.luminance(BH1750.ONCE_HIRES_1))
       sleep(measureInterval)

#connect to a wlan and return the ip adress
def connect(_ssid, _password):
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(_ssid, _password)
    print('1')
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
        ip = status[0]
        print ('ip: ' + ip)
        return ip

#send the data requests
def sendData():
    while True:
        ai = socket.getaddrinfo(serverIP, 80)
        addr = ai[0][-1]
        s = socket.socket()
        s.connect(addr)
        #make the message
        s.send(b"GET Data")
        
        #store the response
        resp = str(s.recv(512))
        print(resp)
        s.close()
        sleep(5)

#main code
try:
    ip = connect(ssid, password)
    #connection succes blink
    for i in range(0, 10):
        led.value(1)
        sleep(0.25)
        led.value(0)
        sleep(0.25)
    sendData()
except KeyboardInterrupt:
    machine.reset()