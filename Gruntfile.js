'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    browserSync: {
      bsFiles: {
          src : './css/*.css'
      },
      options: {
          watchTask: true,
          server: {
              baseDir: "./"
          }
      }
    },
    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "",
          src: [
            "img/**",
            "js/**",
            "index.html",
            "*.html",
            "font/**"
          ],
          dest: "build"
        }]
      }
    },

    sass: {
      style: {
        files: {
          'build/css/style.css': 'sass/style.scss',
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    cmq: {
      options: {
        log: false
      },
      your_target: {
        files: {
          'build/css/style.css': ['build/css/style.css']
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
        src: 'build/css/*.css'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"] 
        }]
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      }, 
      html: {
        files: {
          "build/index.min.html": "build/index.html",
          "build/form.min.html": "build/form.html",
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['build/js/*.js'],
        dest: 'build/js/script.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    replace: {
      build: {
        options: {
          patterns: [{
            match: "script.js",
            replacement: "script.min.js"
          },
          {
            match: "style.css",
            replacement: "style.min.css"
          }]
        },
        files: [{
          expand: true,
          src: [
            "build/*.html"
          ]
        }]
      }
    },

    watch: {
      style: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  config = require('./.gosha')(grunt, config);
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'sass', 'cmq', 'postcss', 'cssmin', 'imagemin', 'htmlmin', 'concat', 'uglify', 'replace']);
  grunt.initConfig(config);
};