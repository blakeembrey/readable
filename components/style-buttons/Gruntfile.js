module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.initConfig({

    stylus: {
      dist: {
        options: {
          compress: false,
          import: ['nib']
        },
        files: {
          'buttons.css': 'buttons.styl'
        }
      }
    },

    watch: {
      stylus: {
        files: [
          'lib/**/*.styl'
        ],
        tasks: ['stylus']
      }
    }

  });

  grunt.registerTask('default', ['stylus']);
};
