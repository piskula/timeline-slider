# Timeline Slider ![Build Status](https://travis-ci.org/piskula/timeline-slider.svg?branch=master)
##### Diploma Thesis on FI MUNI
Angular2 module for timeline portlet

You can try actual state [online here](https://timeline-slider.firebaseapp.com/).

## Development server

First of all run `npm install` to install all dependencies.
If you have not been using angular-cli before, run also `npm install -g @angular/cli`

Then run `ng serve` for a dev server. Navigate to [localhost:4200](http://localhost:4200/). The app will automatically
reload if you change any of the source files.

## Architecture
Actual version of timeline-slider uses [ShareTimeService](src/app/time-service/share-time.service.ts) as Injectable
service through whole application, so each part can modify all important states directly:
- min max range
- actual chosen values
- locker flag

#### Previous version I.
On this diagram all arrows are used to denote binding. Simple arrow denotes one-way binding, two-way arrow
denotes two-way binding. Red dashed arrow denotes accessing (reading value in) child component from parent component.
![Components of portlet](https://docs.google.com/uc?id=0BwSahQl2pAtueUFHQVBtS1VEalE)

#### Previous version II.
In previous version, range choice in lower slider did not affect upper slider
![Components of portlet](https://docs.google.com/uc?id=0BwSahQl2pAtuRGQxU01zMEVydUE)
