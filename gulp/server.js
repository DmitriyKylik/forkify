const gulp   = require('gulp');
const server = require('browser-sync').create();
const config = require('./config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
    server.init({
        // proxy: 'test.dev',
        server: {
            baseDir: [config.dest.root, config.src.root],
            directory: false,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        files: [
            `${config.dest.html}/*.html`,
            `${config.dest.css}/*.css`,
            `${config.dest.js}/*.js`,
            `${config.dest.img}/**/*`
        ],
        // host: 'test.dev',
        port: 8080,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: 'local', // 'false', 'external', 'ui', 'tunnel' указываем, что наш url внешний в случае external
        notify: false,
        cors: true,
        ghostMode: false, // synchronized events in browsers
        online: true
        // tunnel: true
        // browser: ['google chrome', 'firefox']
    });
});

module.exports = server;
