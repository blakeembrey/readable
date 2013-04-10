module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.initConfig({

    stylus: {
      dist: {
        options: {
          use: [
            require('./components/pinch-grid'),
            require('./components/default-typography'),
            require('./components/code-block'),
            require('./components/awesome-form'),
            require('./components/style-buttons')
          ],
          compress: true,
          'include css': true
        },
        files: {
          'public/css/main.css': 'public/css/main.styl'
        }
      }
    },

    watch: {
      stylus: {
        files: [
          'public/**/*.styl'
        ],
        tasks: ['stylus']
      }
    }

  });

  grunt.registerTask('default', ['stylus']);
};
