module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	clean: {
  	  build: {
  		    src: ['dest/**', 'js/jeugdhuis_bastion.js', 'js/jeugdhuis_bastion.min.js', 'css/jeugdhuis_bastion.css', 'css/jeugdhuis_bastion.min.css']
  	  }
  	},
  	concat: {
  	  js: {
    		src: ['js/modules.js', 'js/providers/*.js', 'js/services/*.js', 'js/controllers/*.js', 'js/*.js'],
    		dest: 'js/jeugdhuis_bastion.js'
  	  },
  	  css: {
    		src: 'css/*.css',
    		dest: 'css/jeugdhuis_bastion.css'
  	  }
  	},
  	uglify: {
      options: {
        mangle: false
      },
      my_target: {
  		  files: {
  			'js/jeugdhuis_bastion.min.js': ['js/jeugdhuis_bastion.js']
  		  }
  		}
  	},
  	cssmin: {
  	  css:{
    		src: 'css/jeugdhuis_bastion.css',
    		dest: 'css/jeugdhuis_bastion.min.css'
  	  }
  	},
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dest/'},
          {expand: true, src: ['templates/*.html'], dest: 'dest/'},
          {expand: true, src: ['img/*.png', 'img/*.jpg', 'img/*.ico'], dest: 'dest/'},
          {expand: true, src: ['data/**/*.json', 'data/**/*.png', 'data/**/*.jpg'], dest: 'dest/'},
          {expand: true, src: ['css/jeugdhuis_bastion.min.css'], dest: 'dest/'},
          {expand: true, src: ['css/bootstrap_overlay.css'], dest: 'dest/'},
          {expand: true, src: ['vendors/bootstrap/css/bootstrap.min.css'], dest: 'dest/'},
          {expand: true, src: ['js/jeugdhuis_bastion.min.js'], dest: 'dest/'},
          {expand: true, src: ['vendors/**/*'], dest: 'dest/'}
        ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('dev', ['clean', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('deploy', ['clean', 'concat', 'uglify', 'cssmin', 'copy']);
};
