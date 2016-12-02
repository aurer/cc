module.exports = function(grunt){
	grunt.initConfig({
		// Main options
		srcDir: './src',
		distDir: './public/assets',
		serve: './public',

		// Load packages
		pkg: grunt.file.readJSON('package.json'),

		// Define tasks
		clean: {
			all: '<%= distDir %>/*',
			css: '<%= distDir %>/css/',
			js: '<%= distDir %>/js/',
			images: '<%= distDir %>/images/',
			fonts: '<%= distDir %>/fonts/'
		},

		less: {
			dist: {
				options: {
					compress: true,
					sourceMap: true,
					plugins: [
	        	new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions', 'ie 8', 'ie 9']}),
	        ]
				},
				files: [{
					expand: true,
					cwd: "<%= srcDir %>/less/",
					src: "*.less",
					dest: "<%= distDir %>/css/",
					ext: '.css'
				}]
			}
		},

		browserify: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= srcDir %>/js/",
					src: ["main.js"],
					dest: "<%= distDir %>/js/",
					ext: '.js'
				}],
				options: {
					transform: [
						["babelify", { "presets": ["es2015", "react"] }]
					]
				}
			}
		},

		watch: {
			less: {
				files: '<%= srcDir %>/less/**/*.less',
				tasks: ['less']
			},
			js: {
				files: '<%= srcDir %>/js/**/*.js',
				tasks: ['js']
			},
			fonts: {
				files: ['<%= srcDir %>/fonts/*'],
				tasks: ['clean:fonts', 'copy']
			}
		},

		browserSync: {
			bsFiles: {
				src : [
					'<%= distDir %>/css/main.css',
					'<%= distDir %>/js/main.js'
				]
			},
			options: {
				server: {
					baseDir: '<%= serve %>'
				},
				watchtask: true,
				notify: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('js', ['browserify']);
	grunt.registerTask('css', ['less']);

	grunt.registerTask('default', ['clean:all', 'css', 'js']);
	grunt.registerTask('dev', ['default', 'browserSync', 'watch']);
	grunt.registerTask('build', ['clean:all', 'default']);
};
