# Caching module
Caching for JS applications, with expiration time in minutes.

## Current methods
- Get(key): retrieve the data from localStorage, if it exists or if it isn't expired.
- Set(key, data [, timeInMinutes = 5]): set the data on localStorage.
