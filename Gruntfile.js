/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
     pkg: grunt.file.readJSON("package.json"),
     
    // Metadata.
    meta: {
      version: '0.1.0'
    },
     htmlbuild: {
           dist: {
               src: 'pages/*.html',
               dest: 'www/',
               options: {
                  recursive: true,
                  beautify: true,
                   relative: true,
                   sections: {
                       layout: {
                           header: 'layout/header.html',
                           footer: 'layout/footer.html'
                       }
                   },
               }
           }
       },
       wiredep: {
          target: {
            src: 'www/*.html' // point to your HTML file.
          }
        },
    banner: '/*! Midori Front End Template - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://http://www.mtkocak.com/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Midori Kocak <mtkocak@mtkocak.net>; Licensed MIT */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/template-frontend.js'],
        dest: 'dist/template-frontend.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/streetparty.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task.
  grunt.registerTask('default', ['htmlbuild','wiredep','jshint']);

};