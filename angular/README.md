# Timeline Slider ![Build Status](https://travis-ci.org/piskula/timeline-slider.svg?branch=master)
##### Diploma Thesis on FI MUNI
Angular (Angular6) module for timeline portlet

You can try actual state [online here](https://timeline-slider.firebaseapp.com/).

## Development server

First of all run `npm install` to install all dependencies.
If you have not been using angular-cli before, run also `npm install -g @angular/cli`

Then run `npm run app` for a dev server. This starts also fake REST API, which returns multiple timestamp ranges
from [db.json](db.json) file. Navigate to [localhost:4200](http://localhost:4200/). But you need to uncomment real `getTimestamps(url)` method in [PossibleTimestampsService](src/app/time-service/possible-timestamps.service.ts) due to Travis CI configuration. The app will automatically reload if you change any of the source files. If you do not need fake REST api, command `ng serve` is enough for you.

## Architecture
Actual version of timeline-slider uses [ShareTimeService](src/app/time-service/share-time.service.ts) as *Injectable*
service through whole application, so each part can modify all important states directly:
- min max range
- actual chosen values
- locker flag

Both slider parts use SVG images, which are rendered inside \<div\> thanks to my own [directive](src/app/slider-directive). This is
much more simple solution as [previous](#previous-version-i), where I was trying to use [ng2-nouislider](https://github.com/tb/ng2-nouislider).
![Angular Components of portlet](https://docs.google.com/uc?id=1Tbpjy5jlqR5IfpGamSdBeTQ6iAdtoXzK)

### Component Diagram:
![Components of portlet](https://docs.google.com/uc?id=1ZEZhC-CGCuj5nj28t2jsk5nEWupSY-57)

<a name="previous-version-i"/>

### State Diagram (lockers):
![State diagram](https://docs.google.com/uc?id=1ENNLMooP0RqMhiwwz5fSsxMaLYrXJlku)

#### Previous version I.
On this diagram all arrows are used to denote binding. Simple arrow denotes one-way binding, two-way arrow
denotes two-way binding. Red dashed arrow denotes accessing (reading value in) child component from parent component.
![Components of portlet](https://docs.google.com/uc?id=0BwSahQl2pAtueUFHQVBtS1VEalE)

#### Previous version II.
In previous version, range choice in lower slider did not affect upper slider
![Components of portlet](https://docs.google.com/uc?id=0BwSahQl2pAtuRGQxU01zMEVydUE)
