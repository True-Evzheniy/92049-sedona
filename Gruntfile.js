'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browser-sync');
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'css/*.css'
      }
    },

    browserSync: {
      bsFiles: {
          src : './css/*.css'
      },
      options: {
          server: {
              baseDir: "./"
          }
      }
    },

    watch: {
      style: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss', 'browserSync'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
};