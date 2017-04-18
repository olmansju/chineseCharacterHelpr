module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
					// Task-specific options go here.
			},
			your_target: {
				// Target-specific file lists and/or options go here.
			}
		},
		//watch: {
		sass: { // Task
			dist: { // Target
				files: {
					'styles.css': 'scss/styles.scss' // 'destination': 'source'
				}
			}
		},
		//},
		uglify: {
			build: {
				src: 'js/*.js',
				dest: 'script.js'
			}
		},
		bootlint: {
			bootlint: {
				options: {
					relaxerror: [],
					showallerrors: false,
					stoponerror: false,
					stoponwarning: false
				},
				files: ['*.php']
			}
		},

		watch: {
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass'],
			},
		}

	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-bootlint');
	grunt.registerTask('default', ['watch']);
};