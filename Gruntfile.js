module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ["src/sass/**/*.scss"],
        tasks: ["compile__sass"]
      },
      html: {
        files: ["src/*.html"],
        tasks: ["compile__html"]
      },
      php: {
        files: ["src/*.php"],
        tasks: ["compile__php"]
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["compile__js"]
      }
    },
    clean: {
      build: ["build"]
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "img/**",
            "js/**",
            "fonts/**",
            "*.html",
            "*.php"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "*.html"
          ],
          dest: "build"
        }]
      },
      php: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "*.php"
          ],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "js/**"
          ],
          dest: "build"
        }]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "build/css/style.css": "src/sass/style.scss"
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 3 version", "ie 8", "ie 9", "ie 10"]
      },
      style: {
        src: "build/css/style.css"
      }
    },
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },
    csscomb: {
      style: {
        expand: true,
        src: ["src/sass/**/*.scss", "build/css/style.css"]
      }
    },
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,guf,svg}"]
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
          "build/index.min.html": "build/index.html"
        }
      }
    },
    replace: {
      build: {
        options: {
          patterns: [{
            match: /<script src="http:\/\/localhost:35729\/livereload.js"><\/script>/,
            replacement: ""
          }]
        },
        files: [{
          expand: true,
          src: [
            "build/index.min.html"
          ]
        }]
      }
    }
  });

  grunt.registerTask("compile__sass", [
    "sass",
    "autoprefixer",
    "cmq",
    "csscomb",
    "cssmin"
  ]);

  grunt.registerTask("compile__html", [
    "copy:html",
    "htmlmin",
    "replace"
  ]);

  grunt.registerTask("compile__php", [
    "copy:php"
  ]);

  grunt.registerTask("compile__js", [
    "copy:js"
  ]);

  grunt.registerTask("build", [
    "clean",
    "copy:build",
    "sass",
    "autoprefixer",
    "cmq",
    "csscomb",
    "cssmin",
    "imagemin",
    "htmlmin",
    "replace"
  ]);

};