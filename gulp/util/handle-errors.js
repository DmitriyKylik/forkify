const notify = require('gulp-notify');

module.exports = notify.onError({
    message: [
        'Error: <%= error.message %>',
        '\n<%= error.cause %>',
        '\nLine: <%= error.cause.line %>',
        '\nPosition: <%= error.cause.pos %>',
        '\n<%= error.fileName %>'
    ]
});

// const notify = require('gulp-notify');

// module.exports = function(...arg) {
//     const args = Array.prototype.slice.call(...arg);
//     notify.onError({
//         title: 'Compile Error',
//         message: '<%= error.message %>',
//         sound: 'Submarine'
//     }).apply(this, args);
//     this.emit('end');
// };


// module.exports = function(...arg) {
//     console.log(...arg);
//     const args = [].slice.call(...arg);
//     notify.onError({
//         message: [
//             'Error: <%= error.message %>',
//             '\n<%= error.cause %>',
//             '\nLine: <%= error.cause.line %>',
//             '\nPosition: <%= error.cause.pos %>',
//             '\n<%= error.fileName %>'
//         ]
//     }).apply(this, args);
//     this.emit('end');
// };
