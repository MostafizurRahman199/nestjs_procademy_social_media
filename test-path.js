const { pathToRegexp } = require('path-to-regexp');
console.log(pathToRegexp('/users/{:isMarried}'));
console.log(pathToRegexp('/users{/:isMarried}'));
