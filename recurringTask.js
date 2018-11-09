function recurringTask(
  {
    initialTime, //When is the initial event scheduled for, can either be a UNIX timestamp or ISO string
    taskContent, //What is the event that we want to recur, accessible via the passed callback
    recurrenceSetting = 'None', //How often should the event recur, default to None. Can be set to Custom for more complex pattersn
    customRecurrencePattern = '' //Custom pattern string in the format "days:hours:minutes:seconds", for example "01:00:00:00" is 1 day
  },
  cb //Callback function, invoked at the initial event time and each subsequent recurrence as well
) {
  const createdTime = new Date().getTime(); //Get UNIX timestamp at moment of execution
  const time = validateTime(initialTime, createdTime);
  const [recurrence, isRecurringTask] = validateRecurrence(
    recurrenceSetting,
    customRecurrencePattern
  );
  setTimeout(() => {
    cb(taskContent);
    if (isRecurringTask) {
      setRecurrenceInterval(recurrenceSetting, recurrence, taskContent, cb);
    }
  }, time);
}
//validateTime verifies initial event time and returns difference between event time and current time, for setTimeout
function validateTime(time, createdTime) {
  if (typeof time === 'number' && time > createdTime) {
    return time;
  } else if (typeof time === 'string' && !isNaN(new Date(time))) {
    const formattedTime = new Date(time).getTime();
    if (formattedTime > createdTime) {
      return formattedTime - createdTime;
    } else {
      throw new Error('Event Cannot Be Scheduled In The Past');
    }
  } else {
    throw new Error('Invalid Date');
  }
}
//validateRecurrence verifies the argument is valid, and returns the time in seconds for the chosen option and a boolean of whether or not the task should recur
function validateRecurrence(recurrencePeriod, customRecurrence = '') {
  recurrenceOptions = {
    //recurrenceOptions stored in number of seconds
    None: 0,
    Custom: parseRecurrence(customRecurrence),
    'Every Minute': 60,
    'Every 15 Minutes': 900,
    'Every 30 Minutes': 1800,
    'Every Hour': 3600,
    'Every Day': 86400,
    'Every Week Day': 86400,
    'Every Week': 604800,
    'Every Other Week': 1209600,
    'Every Month': 2419200,
    'Every Year': 3.1536e7
  };
  if (recurrenceOptions[recurrencePeriod] != undefined) {
    if (recurrencePeriod !== 'Custom' && customRecurrence !== '') {
      console.warn(
        "WARNING: Custom Recurrence Pattern Provided without the 'Custom' Recurrence Flag - Custom Pattern will be ignored"
      );
    }
    const recurrence = recurrenceOptions[recurrencePeriod];
    const isRecurringTask = recurrence > 0 ? true : false;
    return [recurrence, isRecurringTask];
  } else {
    throw new Error(
      typeof recurrencePeriod === 'string'
        ? 'Recurrence Option Not Supported - Please Use Custom Configuration'
        : 'Recurrence not of type "String"'
    );
  }
}

function parseRecurrence(customRecurrence) {
  [days, hours, minutes, seconds] = customRecurrence.split(':');
  let sum = 0;
  sum += parseInt(days) * 86400;
  sum += parseInt(hours) * 3600;
  sum += parseInt(minutes) * 60;
  sum += parseInt(seconds);
  return sum;
}

function setRecurrenceInterval(recurrenceSetting, recurrence, content, cb) {
  setInterval(() => {
    if (recurrenceSetting === 'Every Week Day') {
      const currentDay = new Date().getDay();
      if (currentDay > 0 && currentDay < 6) {
        //Check if current day is not Saturday or Sunday
        cb(content);
      }
    } else {
      cb(content);
    }
  }, recurrence * 1000);
}
module.exports = recurringTask;
