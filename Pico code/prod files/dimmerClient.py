import network
import socket
from time import sleep
import machine
from machine import Pin, PWM
import urequests
from picozero import Button, pico_led#this is used to make the button presses easier

#the ssid and password of the hotspot
ssid = 'raspberry Hotspot' #wifi network name
password = 'Wow this hotspot is so secure :)' #wifi password
serverIP = '192.168.137.30'#ip adress of the master pico

#set up the pins for the IO
lamp = PWM(Pin(17))
button = Button(18)#light switch
lampState = True#toggle the lamp
lamp.freq(1000)
DUTY = 65535#set the initial duty to full brightness

#status blinking function
def blinkLed(blinks, interval):
    for i in range(0,2*blinks):
        pico_led.toggle()
        sleep(interval/2)

#switch lamp state when the button gets pressed
def buttonHandler():
    global lampState, DUTY
    lampState = False if lampState else True
    lamp.duty_u16(DUTY) if lampState else lamp.duty_u16(0)#set the duty to the duty or turn the lamp off

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
        blinkLed(3,0.5)
        status = wlan.ifconfig()
        ip = status[0]
        print ('ip: ' + ip)
        return ip

#send the data requests
def sendData(updateInterval):
    global lampState, DUTY#this is needed because python is stupid with assigning scope to variables
    
    while True:
        ai = socket.getaddrinfo(serverIP, 80)
        addr = ai[0][-1]
        s = socket.socket()
        s.connect(addr)
        blinkLed(2,0.5)
        
        #make the message to request a light value back
        if lampState:
            mesg = 'req 1'#lamp is on
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
        
        #turn on/off the lamp based on the app
        if splitStr[1] == 'True':
            lampState = True
        elif splitStr[1] == 'False':
            lampState = False
        else:
            print('MESG ERROR not a valid lampstate')
        
        s.close()
        
        #update duty
        if lampState:
            lamp.duty_u16(DUTY)
        else:
            lamp.duty_u16(0)#turn off the lamp
        
        sleep(updateInterval)

#main code
try:
    ip = connect(ssid, password)
    button.when_pressed = buttonHandler#call the switching method when
    sendData(2)
except KeyboardInterrupt:
    machine.reset()