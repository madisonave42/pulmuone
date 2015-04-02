module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    includes: {
    	html: {
    		cwd:'html_src',
    		src: ['*.html'],
    		dest: 'html/',
    		options: {
    			flatten:true,
    			includePath: 'html_src/include'
    		}
    	}
    },
    
    concat: {
    	dist: {
    		src: ['js_src/*.js'],
    		dest: 'js_concat/function.js'
    	}
    },

    uglify: {
 		build: {
        src: 'js_concat/function.js',
        dest: 'js/function.min.js'
     	}
    },
    
    sass:{
    	dist: {
    		options: {
    			sourcemap: 'auto',
    			style: 'expanded'
    		},
    		files: [{
    			expand: true,
    			cwd: 'css_scss',
    			src: ['*.scss'],
    			dest: 'css/',
    			ext: '.css'
    		}]
    	}
    },
    
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: 'localhost',
          base: '.',
          livereload: true,
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        }
      }
    },
    
    copy: {
    	html: {
    		expand:true,
    		src:'html/*.html',
    		dest:'_output/'
    	},
    	js: {
    		expand: true,
    		src:'js/*.js',
    		dest:'_output/'
    	},
    	css: {
			expand: true,
			src:'css/new_file.css',
			dest: '_output/',
			options:{
				process: function(content, srcpath){
					return content.replace('/*# sourceMappingURL=new_file.css.map */', '');
				},
			},
    	},
    	images: {
    		expand: true,
    		src:'images/**',
    		dest:'_output/'
    	}
    },
    
    watch: {
    	options: {
    		spawn: false,
    		livereload : true
    	},
    	js: {
    		files: ['js_src/*.js'],
    		tasks: ['concat', 'uglify', 'reload']
    	},
    	html: {
    		files: ['html_src/**'],
    		tasks: ['includes', 'reload']
    	},
    	css: {
    		files: ['css_scss/**'],
    		tasks: ['sass', 'reload']
    	}
    },
    
    reload: {
    	port: 8080
    }
    
  });
  
  grunt.registerTask('default',function(){
  	grunt.log.warn('Grunt Start...');
  	grunt.task.run([
  		'includes',
  		'concat',
  		'uglify',
  		'sass',
  		'connect',
  		'watch'
  	]);
  });
  
  grunt.registerTask('export', function(){
	  grunt.task.run([
		  'includes',
		  'concat',
		  'uglify',
		  'sass',
		  'copy'
	  ]);
  });

};
