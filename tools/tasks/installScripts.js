/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        // Searches for bower comment blocks (`<!-- bower:js -->`) and injects
        // script tag references to bower modules into markup.
        bowerInstall: {
            buildScripts: {
                ignorePath: '<%= env.DIR_SRC %>/',
                src: ['<%= env.DIR_SRC %>/**/*.html']
            }
        }
    });

    grunt.registerTask('installScripts', [
        'bowerInstall:buildScripts'
    ]);
};
