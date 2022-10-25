import { blueGrey } from '@mui/material/colors'
import React from 'react'

//On this page the user can find information about the team

const Aboutus = () => {
  return (
    
    <div classname="App" class="h-screen">
          <div class="container pt-4 mx-auto align-center w-screen">
          <div
            id="controls-widget"
            class="flex flex-col h-48 items-center pb-2 bg-slate-200/50 rounded-2xl"
          >
            <div class="font-light w-full text-xl text-left pl-4 p-2 rounded-t-2xl bg-slate-300/50">
                <div class="w-24">Our Goal</div>
            </div>
            <span class="p-3">
              Hier komt een inspirerende text over onze goal van het product
            </span>
        </div>
      </div>
      <div class="container mx-auto align-center w-screen pt-4">
          <div
            id="our-team-widget"
            class="flex flex-col h-96 items-center pb-2 bg-slate-200/50 rounded-2xl"
          >
            <div class="font-light w-full text-xl text-left pl-4 p-2 rounded-t-2xl bg-slate-300/50">
                <div class="w-24">Our team</div>
            </div>
            <div class="grid grid-cols-3 items-center gap-3 h-28 pt-6">
              <div
                  classname="teammember-widget"
                  class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                      <path class="stroke-widget-blue" stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                  </div>
                  <div class="text-xs text-center font-bold pt-1">Peter de Bruijne</div>
                  <div class="text-xs text-center pt-1">Peter de Bruijne</div>
                </div>
              <div
                classname="button-light-1"
                class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path class="stroke-widget-blue" stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>

                  </div>
                  <div class="text-xs text-center font-bold pt-1">Thijs Egberts</div>
                  <div class="text-xs text-center pt-1">Thijs Egberts</div>
                </div>
              <div
                classname="button-light-1"
                class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                      <path class="stroke-widget-blue" stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <div class="text-xs text-center font-bold pt-1">Lucca Geldens</div>
                  <div class="text-xs text-center pt-1">Lucca Geldens</div>
                </div>
              <div
                classname="button-light-1"
                class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                      <img class="w-8 h-8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADTUlEQVRoge2ZS2sUQRDHfxuz8eAm4OOmriCCCqLZm1cvYhQTAyZ+iYAH9eIDQcGoR+M38EESMYIHg15UclQRRHRNzCEqagw+4opCSDIeusftmXTP9HR2MivkDwU901Xd/+rtrq6ahWUsI1PkgS7gJlAGfkkpAzdkXz4zdjHoBMYAL0bGgEMZcdSiAbhEPPGw9ErbzBEm/xk4CewCVklpBU7JvrATmaKTIKF+oBCh3wwMhGw6UuZoRBPBPd8P5CzscsCgYjdKRge7i+C2iVr5MJqBScX+cK1IJTlUnUr7CiJc2qIC9CnPmUSlN1RXcKeDfatiX64hL2tUFAJJto+PgmJfqRWppYzL6lzzaQwah49Ke7PDXKrNJwd7LZI48FRpH3SYS7V54mC/aITDaHMC2xbgCymE0STIE7zIBrC/yG5RBxcZiPitpgWDRP8SLQTJzwPtKXOMRS9BJyaB00AJESoLsn2G4LbxgAsZ8F2ABhY6ESfzCPJ1kU776EDs5zjyo9TBtjEhj4go14HXiBu2ArwCrsm+JAc2B1xVnvuwCxR1g+OIX82HJ9/9FygiMtywA79xu/mXHHepnhsf/vNwJowSIFyq+lDfJaohisAQwRS61nJfzlUAJiwcmMAyjS8C31Ik7gF/gC1yvsuafp0DntSNxe2UyXvAWTnXDmAmgQMz0iYSPxWD3TYeOyIHjKB30Ieub4SYu0E3UBroNhBU6+WyQac7auA5RTHN3OWxgVxJ0SkZdB5GDTylKG6sNWsF0wZyaxSdtQad776CboVfKO00K6dZw/vzwAqgUbaT2ALQQ9XTKcQqpIFh9KvrAV+lmPrvRQ1cQHyB8JWfAatTcKAtgmCctMUN3o4oQnyDcWBvDcn7W3fIgfyQ7SRHNcYPEIVMowPpJmn7iGrOvx7zYdbJtLSxxhGCF5svP4A7wDFgP7AVET2agJXAOvnuAHBC6qp51RzVS7JHM75JesIEbaqdDcBF6YzLyuswi4gw5xDbqRSt/g/PWcRnyU2IZGoc98P3FvEXVdGVRBiu9eZ2YA8isdqGcK6F6jeiCmLrTSBq5ZeI29P0Wd02bVnAt14KZmcH6uU7zQcLnfeps1gE2hAETWfnHbAvM3bLiMBfcL7UCZutNMwAAAAASUVORK5CYII="></img>
                  </div>
                  <div class="text-xs text-center font-bold pt-1">Babette van Leeuwen</div>
                  <div class="text-xs text-center pt-1">Babette van Leeuwen</div>
                </div>
              <div
                classname="button-light-1"
                class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                      <path class="stroke-widget-blue" stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                  </div>
                  <div class="text-xs text-center font-bold pt-1">Jarne Sikkema</div>
                  <div class="text-xs text-center pt-1">Jarne Sikkema</div>
                </div>
              <div
                classname="button-light-1"
                class="w-28 h-32 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg">
                  <div
                    classname="Light-widget-1"
                    class="flex flex-auto justify-center items-center h-14"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                      <path class="stroke-widget-blue" stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <div class="text-xs text-center font-bold pt-1">Koen Verhoof</div>
                  <div class="text-xs text-center pt-1">Koen Verhoof</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus