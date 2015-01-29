/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var shouldMinify = !grunt.option('dev');

    // Help Grunt find the right plugins at runtime
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Clear out any previously generated usemin task configuration
    grunt.config.set('concat', undefined);
    grunt.config.set('cssmin', undefined);

    grunt.config.merge({
        // Copies static files for non-optimized builds
        copy: {
            buildStyles: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['assets/{styles,vendor}/**/*.css']
                }]
            },
            buildComponents: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['assets/components/**/*.css']
                }]
            }
        },

        // Searches for build comment blocks (`<!-- build:css -->`) and generates
        // the appropriate `concat` and `cssmin` configuration.
        useminPrepare: {
            options: {
                root: '<%= env.DIR_SRC %>',
                staging: '<%= env.DIR_TMP %>',
                dest: '<%= env.DIR_DEST %>',
                flow: {
                    buildStyles: {
                        // Force css only
                        steps: { css: ['concat', 'cssmin'], js: [] },
                        post: {}
                    }
                }
            },
            buildStyles: ['<%= env.DIR_SRC %>/**/*.html']
        }
    });

    grunt.registerTask('buildStyles',
        shouldMinify
            ? [
                'useminPrepare:buildStyles',
                'concat:generated',
                'cssmin:generated',
            ]
            : [
                'copy:buildStyles',
                'copy:buildComponents'
            ]
    );
};
