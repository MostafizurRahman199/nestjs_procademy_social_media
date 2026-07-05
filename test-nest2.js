const { Controller, Get } = require('@nestjs/common');
console.log("Get accepts array?", Get(['', ':isMarried']) ? 'yes' : 'no');
