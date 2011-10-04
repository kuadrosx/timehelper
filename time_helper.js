var timeData = {
    month_names: ["~", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbr_month_names: ["~", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    distance_in_words: {
      half_a_minute: "half a minute",
      less_than_x_seconds: {
        one:   "less than 1 second",
        other: "less than %{count} seconds"
      },
      x_seconds: {
        one:   "1 second",
        other: "%{count} seconds"
      },
      less_than_x_minutes: {
        one:   "less than a minute",
        other: "less than %{count} minutes"
      },
      x_minutes: {
        one:   "1 minute",
        other: "%{count} minutes"
      },
      about_x_hours: {
        one:   "about 1 hour",
        other: "about %{count} hours"
      },
      x_days: {
        one:   "1 day",
        other: "%{count} days"
      },
      about_x_months: {
        one:   "about 1 month",
        other: "about %{count} months"
      },
      x_months: {
        one:   "1 month",
        other: "%{count} months"
      },
      about_x_years: {
        one:   "about 1 year",
        other: "about %{count} years"
      },
      over_x_years: {
        one:   "over 1 year",
        other: "over %{count} years"
      },
      almost_x_years: {
        one:   "almost 1 year",
        other: "almost %{count} years"
      }
    }
}

var I18n = {
  translate: function(key, options) {
    options = options || {};
    var scope = options['scope'];
    scope_data = timeData[scope];
    var data = scope_data[key];
    var type = typeof(data);
    var count = options['count'];

    if(type == "string") { 
      if(count) {
        return data.replace('%{count}', count);
      }
    } else if(type == "object") {
      if(count == 1) {
        return data.one.replace('%{count}', count);
      } else {
        return data.other.replace('%{count}', count);
      }
    }
  }
}

var TimeHelper = {
  strftime: function(date, format) {
    var regexp = /%(a|A|d|b|B|m|Y|y|H|M|S)/

    while(regexp.test(format)) {
        format = format.replace(regexp, function(a,b) {
        if(a) {
            var result = '';
            switch(a) {
              case '%A': {
                result = timeData.day_names[date.getDay()];
                break;
              }
              case '%a': {
                result = timeData.abbr_day_names[date.getDay()];
                break;
              }
              case '%d': {
                result = date.getDate();
                break;
              }
              case '%B': {
                result = timeData.month_names[date.getMonth()];
                break;
              }
              case '%b': {
                result = timeData.abbr_month_names[date.getMonth()];
                break;
              }
              case '%m': {
                result = date.getMonth();
                break;
              }
              case '%Y': {
                result = date.getFullYear();
                break;
              }
              case '%H': {
                result = date.getHours();
                break;
              }
              case '%M': {
                result = date.getMinutes();
                break;
              }
              case '%S': {
                result = date.getSeconds();
                break;
              }
              default: {
                result = '.'
                break;
              }
            }
            return result;
        } else {
            r = false;
        }
      });
    }
    return format;
  },
  distance_of_time_in_words_to_now: function(from_time, to_time, include_seconds) {
    to_time = to_time || Date.now;
    include_seconds = include_seconds || false;

    distance_in_minutes = Math.round((Math.abs(to_time - from_time))/60000)

    distance_in_seconds = Math.round(Math.abs(to_time - from_time)/1000);

    opts = {scope: 'distance_in_words'};

    if( 0 <= distance_in_minutes && distance_in_minutes <= 1) {
        if(!include_seconds) {
            if( distance_in_minutes == 0 ) {
                opts['count'] = 1;
                return I18n.translate('less_than_x_minutes', opts);
        } else {
          opts['count'] = distance_in_minutes;
          return I18n.translate('x_minutes', opts);
        }
    }
    if(0 <= distance_in_seconds && distance_in_seconds <= 4) {
          opts['count'] = 5;
          return I18n.translate('less_than_x_seconds', opts);
      } else if(5 <= distance_in_seconds && distance_in_seconds <= 9) {
          opts['count'] = 10;
          return I18n.translate('less_than_x_seconds', opts);
      } else if(10 <= distance_in_seconds && distance_in_seconds <= 19) {
          opts['count'] = 20;
          return I18n.translate('less_than_x_seconds', opts);
      } else if(20 <= distance_in_seconds && distance_in_seconds <= 39) {
          opts['count'] = 0;
          return I18n.translate('half_a_minute', opts);
      } else if(40 <= distance_in_seconds && distance_in_seconds <= 59) {
          opts['count'] = 1;
          return I18n.translate('less_than_x_minutes', opts);
      } else {
        opts['count'] = 1;
        return I18n.translate('x_minutes', opts);
      }
    } else if(2 <= distance_in_minutes && distance_in_minutes <= 44) {
        opts['count'] = distance_in_minutes;
        return I18n.translate('x_minutes', opts);
    } else if(45 <= distance_in_minutes && distance_in_minutes <= 89) {
        opts['count'] = 1;
        return I18n.translate('about_x_hours', opts);
    } else if(90 <= distance_in_minutes && distance_in_minutes <= 1439) {
        opts['count'] = Math.round(distance_in_minutes / 60.0);
        return I18n.translate('about_x_hours', opts);
    } else if(1440 <= distance_in_minutes && distance_in_minutes <= 2529) {
        opts['count'] = 1;
        return I18n.translate('x_days', opts);
    } else if(2530 <= distance_in_minutes && distance_in_minutes <= 43199) {
        opts['count'] = Math.round(distance_in_minutes / 1440.0);
        console.log(opts)
        return I18n.translate('x_days', opts);
    } else if(43200 <= distance_in_minutes && distance_in_minutes <= 86399) {
        opts['count'] = 1;
        return I18n.translate('about_x_months', opts);
    } else if(86400 <= distance_in_minutes && distance_in_minutes <= 525599) {
        opts['count'] = Math.round(distance_in_minutes / 43200.0);
        return I18n.translate('x_months', opts);
    } else {
      distance_in_years           = distance_in_minutes / 525600
          minute_offset_for_leap_year = (distance_in_years / 4) * 1440
          remainder                   = ((distance_in_minutes - minute_offset_for_leap_year) % 525600)
          if(remainder < 131400) {
        opts['count'] = distance_in_years;
        return I18n.translate('about_x_years', opts);
      } else if(remainder < 394200) {
        opts['count'] = distance_in_years;
        return I18n.translate('over_x_years', opts);
      } else {
        opts['count'] = distance_in_years + 1;
        return I18n.translate('almost_x_years', opts);
      }
    }
  }
}

console.log(TimeHelper.strftime(new Date(Date.now()), "%m/%d/%Y %H:%M:%S"));
