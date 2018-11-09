# simplerecurringtasks v0.0.4
A simple recurring tasks module, takes in an initial time and recurrence pattern and fires the provided callback on those intervals

## Installation
Using npm:
```javascript
npm i --save simplerecurringtasks
```
## Usage
Usage in NodeJS with recurrence string:
```javascript
const recurringTasks = require('simplerecurringtasks');

recurringTasks(
{
	initialTime: '2018-11-09 15:00:00',
	taskContent: {body: 'This is my body content'},
	recurrenceSetting: 'Every Day',
},
 callbackFunction);
```
The above code will run the passed callback for the first time on November 11th, 2018 at 3:00 PM, and every day at 3:00 PM after that. The callback is pased the taskContent parameter for processing.

Using the custom recurrence pattern:
```javascript
const recurringTasks = require('simplerecurringtasks');

recurringTasks(
{
	initialTime: '2018-11-09 15:00:00',
	taskContent: {body: 'This is my body content'},
	recurrenceSetting: 'Custom',
	customRecurrencePattern: '01:00:00:00',
},
 callbackFunction);
```
This code will work exactly the same as the previous code, only it uses the custom recurrence pattern string:

 "days:hours:minutes:seconds"

So the string "01:00:00:00" is equal to 1 day, 0 hours, 0 minutes and 0 seconds

Recurrence String Options Are As Follows:
```javascript
['None', 'Every Minute', 'Every 15 Minutes', 'Every 30 Minutes', 'Every Hour', 'Every Day',
'Every Week Day', 'Every Week', 'Every Other Week', 'Every Month', 'Every Year']
```

