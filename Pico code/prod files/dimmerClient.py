import network
import socket
from time import sleep
import machine
from machine import Pin, PWM
import urequests
import _thread

ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password
serverIP = '192.168.137.30'

lamp = PWM(Pin(13))
button = Pin(6, Pin.IN, Pin.PULL_DOWN)#light switch
lampState = True#toggle the lamp
debounceTime = 0#for removing noise from the button presses
lamp.freq(1000)
DUTY = 65535#set the initial duty to full brightness

#interrupt handler function for the button press
def callBack(pin):
    if (time.tick_ms()-debounceTime) > 500:#filter out extremely fast accidental button presses
        if lampState:
            lampState = False
        else:
            lampState = True
        debounceTime = time.tick_ms()

button.irq(trigger=Pin.IRQ_RISING, handler=callBack)#do an interrupt when the light switch is pressed

#the second thread
def second_thread(lampUpdateInterval):
    try:#try catch because threads interact a bit weirdly with interrupts and this probably helps with closing the entire program
        while True:
            #todo do the the brightness pwm stuff
            if lampState:
                lamp.duty_u16(DUTY)
            else:
                lamp.duty_16(0)#turn off the lamp
            sleep(lampUpdateInterval)
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
def sendData(updateInterval):
    while True:
        ai = socket.getaddrinfo(serverIP, 80)
        addr = ai[0][-1]
        s = socket.socket()
        s.connect(addr)
        #make the message to request a light value back
        
        if lampState:
            mesg = 'req 1'
        else:
            mesg = 'req 0'
        s.send(mesg)#send this as a message to the master
        
        #store the response
        resp = str(s.recv(512))
        
        #process the response
        resp = str(resp)
        splitStr = resp[2:len(resp)-1]#remove the ' and b
        splitStr = splitStr.split(' ')
        print(splitStr)
        
        #handle the response
        _duty = int(splitStr[0])
        if _duty >= 0 and _duty <= 65535:
            DUTY = _duty
        else:
            print('MESG ERROR duty out of range')
        if splitStr[1] == '1':
            lampState = True
        elif splitStr[1] == '0':
            lampState = False
        else:
            print('MESG ERROR not a valid lampstate')
        
        s.close()
        sleep(updateInterval)

#main code
try:
    ip = connect(ssid, password)
    
    _thread.start_new_thread(second_thread, (0.5,))#start the sensor thread
    sendData(2)
except KeyboardInterrupt:
    machine.reset()