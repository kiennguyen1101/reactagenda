module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		clean: {
			build: {
				src: ['scripts/main.js', 'styles/main.css']
			},
			deploy: {
				src: ['scipts/main.min.js', 'styles/main.min.css']
			}
		},
		concat: {
			libs: {
				src: [
					'scripts/jquery/jquery.js',
					'scripts/bootstrap/dist/js/bootstrap.js',
					'scripts/moment/moment.js',
					'scripts/moment/locale/vi.js',
					'scripts/rome/dist/rome.standalone.js',
					'scripts/jquery-cycle2/build/jquery.cycle2.js',
					'scripts/jquery-cycle2/build/plugin/jquery.cycle2.carousel.min.js',
					'scripts/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                        'scripts/media/js/jquery.dataTables.js',
                                        'scripts/media/js/dataTables.bootstrap.js',
					//'scripts/video.js/dist/video.js',
					'scripts/comments.js',
					'scripts/main.dev.js'
				],
				dest: 'scripts/main.js',
				options: {
					seperator: ';'
				}

			},
			css: {
				src: [
					'scripts/bootstrap/dist/css/bootstrap.css',
					'scripts/bootstrap/dist/css/bootstrap-theme.css',
					'scripts/rome/dist/rome.css',
					'scripts/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
					'scripts/video.js/dist/video-js.css',
					'scripts/ckeditor/contents.css',
                                        'scripts/media/css/jquery.dataTables.css',
                                        'scripts/media/css/dataTables.bootstrap.css',
					'styles/comments.css',
					'node_modules/react-datepicker/dist/react-datepicker.css',
					'styles/styles.css'
				],
				dest: 'styles/main.css'

			}
		},
		uglify: {
			libs: {
				src: 'scripts/main.js',
				dest: 'scripts/main.min.js'
			}
		},
		cssmin: {
			minify: {
				src: 'styles/main.css',
				dest: 'styles/main.min.css'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	// Default task(s).
	grunt.registerTask('default', ['concat']);
	grunt.registerTask('prod', ['concat', 'uglify', 'cssmin'])

};