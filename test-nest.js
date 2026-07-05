const { pathToRegexp } = require('path-to-regexp');
// If nest combines them as /users/{/:isMarried}
console.log('Test 1:', pathToRegexp('/users/{/:isMarried}'));

// If nest combines them as /users{/:isMarried}
console.log('Test 2:', pathToRegexp('/users{/:isMarried}'));
