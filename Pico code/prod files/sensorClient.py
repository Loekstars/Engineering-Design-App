import network
import socket
from time import sleep
import machine
from machine import Pin
import urequests
import _thread
from bh1750 import BH1750
from picozero import pico_led

#the ssid and password of my test hotspot
ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password
serverIP = '192.168.137.30'#the ip adress of the master pico
sensorId = "1"#this is the first sensor
ROLLING_AVERAGE_SIZE = 5#the size of the list for the rolling average. make this bigger to make the brightness changes smoother

#the light sensor
i2c = machine.I2C(0, scl = Pin(21), sda = Pin(20))
sensor = BH1750(i2c)

#a status blinking function
def blinkLed(blinks, interval):
    for i in range(0,2*blinks):
        pico_led.toggle()
        sleep(interval/2)
        
#this is the list storing the last 5 light values
light_vals = []

#the second thread
def second_thread(measureInterval):
    try:#try catch because threads interact a bit weirdly with interrupts and this probably helps with closing the entire program
        while True:
            val = sensor.luminance(BH1750.ONCE_HIRES_1)#read the light level
            light_vals.append(val)#add the light to the list
            if len(light_vals) > ROLLING_AVERAGE_SIZE:#keep track of the last 5 measurements
                light_vals.pop(0)
            sleep(measureInterval)
    except KeyboardInterrupt:
        machine.reset()

#connect to a wlan and return the ip adress
def connect(_ssid, _password):
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(_ssid, _password)
    #wait for connection
    max_wait = 10
    while max_wait > 0:
        if wlan.status() < 0 or wlan.status() > 3:
            break
        max_wait -= 1
        print('Waiting for connection...')
        sleep(0.5)#this might not be the best value for this sleep but it is fine like this
    
    if wlan.status() != 3:
        raise RuntimeError('network connection failed')
    else:
        print('connected')
        blinkLed(3, 0.5)#connected
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
        blinkLed(2,0.5)
        
        #make the message
        sum = 0#summing for calculating the average
        i = 0#counter
        #calculate average to remove some spiking and make the brightness changes smoother
        for lv in light_vals:
            sum += lv
            i += 1
        #check if i is zero so we don't get a devide by zero error
        if i == 0:
            print('i was 0')
            continue
        
        avg_lv = round(sum/i)#calculate the rounded average of the latest few values
        s.send('send ' + str(avg_lv) + ' ' + sensorId)#send this as a message to the master
        
        #store the response
        resp = str(s.recv(512))
        #print(resp)
        s.close()
        sleep(5)#don't send messages too often or we'll overflow the database/overload the master

#main code
try:
    ip = connect(ssid, password)
    
    _thread.start_new_thread(second_thread, (2,))#start the sensor thread
    
    sendData()
except KeyboardInterrupt:
    machine.reset()