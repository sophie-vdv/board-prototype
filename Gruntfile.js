module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        jshint  : {
            options : {
                reporter : require('jshint-stylish')
            },
            build   : ['Gruntfile.js', 'src/**/*.js']
        },
        uglify  : {
            build : {
                files : {
                    'docs/js/main.min.js' : 'src/js/main.js'
                }
            }
        },
        cssmin  : {
            build : {
                files : {
                    'docs/css/main.min.css' : 'docs/css/main.css'
                }
            }
        },
        less    : {
            build : {
                files : {
                    'docs/css/main.css' : 'src/less/import.less'
                }
            }
        },
        watch   : {
            options : {
                livereload : true
            },
            less    : {
                files : 'src/less/*.less',
                tasks : ['less', 'cssmin']
            },
            html    : {
                files : ['docs/*.html'],
                tasks : ['build']
            },
            js    : {
                files : ['src/js/*.js'],
                tasks : ['uglify']
            }
        },
        connect : {
            server : {
                options : {
                    port      : 8001,
                    base      : 'docs',
                    keepalive : true
                }
            }
        },
        watch: {
            scripts: {
                files: ['*/**/*/*'],
                tasks: ['default']
            }
        },
    });

    grunt.registerTask('default', ['uglify', 'less', 'cssmin:build', 'connect:server', 'watch']);
};
