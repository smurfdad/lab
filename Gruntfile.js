module.exports = function(grunt) {
    // Configuramos Grunt
    grunt.initConfig({
		clean: ["dist/*"],
		copy:{
			html: {
				expand: true,
				src: ["**/*.html","CNAME"],
				cwd: 'src/',
				dest: 'dist/',
			},
			styles: {
				expand: true,
				src: '**/*.css',
				cwd: 'src/',
				dest: 'dist/',
			},
			libs: {
				expand: true,
				src: 'libs/*.js',
				cwd: 'src/',
				dest: 'dist/',
			},
			angular: {
				expand: true,
				src: '**/*.js',
				cwd: 'src/scripts/',
				dest: 'dist/libs/',
			}						
		},
		'gh-pages': {
			options: {
				base: 'dist',
			},
			src: '**/*'
		}		
	});

    // Cargar módulos de Grunt
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

    // Definimos las tareas disponibles
    //grunt.registerTask("production", ["less:dev", "postcss:dev", "concat:dist", "uglify", "gh-pages"]);
	grunt.registerTask("build", ["clean", "copy:html", "copy:styles", "copy:libs","copy:angular"]);
	grunt.registerTask("publish", ["clean", "copy:html", "copy:styles", "copy:libs","copy:angular","gh-pages"]);
	
};
