module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './css',
          src: ['*.css', '!*.min.css'],
          dest: './public',
          ext: '.min.css',
        }],
      },
    },
    run: {
      gitAdd: {
        cmd: 'git',
        args: [
          'add',
          '.',
        ],
      },
      gitCommit: {
        cmd: 'git',
        args: [
          'commit',
          '-m',
          '"commit files for deploy"',
        ],
      },
      s3: {
        cmd: 'eb',
        args: [
          'deploy',
        ],
      },
    },
  });
  grunt.registerTask('minify-css', ['cssmin']);
  grunt.registerTask('gitAdd', ['run:gitAdd']);
  grunt.registerTask('gitCommit', ['run:gitCommit']);
  grunt.registerTask('deploy', ['run:s3']);
  grunt.registerTask('build-deploy', ['minify-css', 'gitAdd', 'gitCommit', 'deploy']);
};