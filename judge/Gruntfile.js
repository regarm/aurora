module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig( {
      pkg: grunt.file.readJSON('package.json'),
      docco: {
          options: {
              dst: './docs/',
              layout: 'parallel'
          },
          docs: {
              files: [
                  {
                      expand: true,
                      src: [
                          'lib/*.js',
                          'index.js'
                      ]
                  }
              ]
          }
      }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-docco2');

    // Default task(s)
    grunt.registerTask('default', ['docco']);

};