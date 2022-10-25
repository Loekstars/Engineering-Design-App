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
sensorId = "1"#this is the first sensor
led = Pin(13, Pin.OUT)

#the light sensor
i2c = machine.I2C(0, scl = Pin(21), sda = Pin(20))
sensor = BH1750(i2c)

#this is the list storing the last 5 light values
light_vals = []

#the second thread
def second_thread(measureInterval):
    try:#try catch because threads interact a bit weirdly with interrupts and this probably helps with closing the entire program
        while True:
            #lock.acquire()#aquire a lock so we don't get threading problems
            val = sensor.luminance(BH1750.ONCE_HIRES_1)
            light_vals.append(val)#add the light to the list
            if len(light_vals) > 10:
                light_vals.pop(0)
            #print(light_vals)
            #print(val)
            #lock.release()#release the lock again
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
        sleep(0.5)
    
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
        #lock.acquire()#aquire the lock so we can read/write the sensor data thread safe
        sum = 0#summing for calculating the average
        i = 0#counter
        for lv in light_vals:
            sum += lv
            i += 1
        #lock.release()#we don't need to interact with the array anymore
        #check if i is zero so we don't get a devide by zero error
        if i == 0:
            print('i was 0')
            continue#todo this might be wrong
        
        avg_lv = round(sum/i)#calculate the rounded average of the latest few values
        print('send ' + str(avg_lv) + ' ' + sensorId)
        s.send('send ' + str(avg_lv) + ' ' + sensorId)#send this as a message to the master
        
        #store the response
        resp = str(s.recv(512))
        #print(resp)
        s.close()
        sleep(5)

#main code
try:
    ip = connect(ssid, password)
    
    _thread.start_new_thread(second_thread, (2,))#start the sensor thread
    
    sendData()
except KeyboardInterrupt:
    machine.reset()