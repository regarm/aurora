module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig( {
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
                        './index.js',
                        './lib/*.js',
                        'lib/dataType/*'
                      ]
                  }
              ]
          }
      }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-docco');

    // Default task(s)
    grunt.registerTask('document', ['docco']);

};