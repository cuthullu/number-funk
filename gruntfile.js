module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
	 	nodemon: {
            all: {
                script: "server/server.js",
                options: {
                    ignore: ["public/", "Gruntfile.js", "build_artifacts"]
                } 
            },
            docker: {
                options:{
                    watch: ['/home/mean/server']
                }
            }

        },
        typescript: {
            base: {
                src: ['front/**/*.ts'],
                dest: 'public/',
                options: {
                    module: 'system', //or commonjs 
                    target: 'es5', //or es3 
                    sourceMap: true,
                    declaration: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false
                }
            }
        },
        copy: {
            main: {
                files: [
                {src: ['node_modules/angular2/bundles/angular2-polyfills.min.js'], dest: 'public/lib/', filter: 'isFile'},
                {src: ['node_modules/systemjs/dist/system.js'], dest: 'public/lib/', filter: 'isFile'},
                {src: ['node_modules/rxjs/bundles/Rx.min.js'], dest: 'public/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/angular2.min.js'], dest: 'public/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/http.min.js'], dest: 'public/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/router.min.js'], dest: 'public/lib/', filter: 'isFile'},
                
                {src: ['node_modules/angular2/bundles/angular2-polyfills.min.js'], dest: 'front/lib/', filter: 'isFile'},
                {src: ['node_modules/systemjs/dist/system.js'], dest: 'front/lib/', filter: 'isFile'},
                {src: ['node_modules/rxjs/bundles/Rx.min.js'], dest: 'front/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/angular2.min.js'], dest: 'front/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/http.min.js'], dest: 'front/lib/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/router.min.js'], dest: 'front/lib/', filter: 'isFile'},
                
                ],
            },
        }
    });
    grunt.registerTask("makey",["copy", "typescript", "nodemon"]);
	grunt.registerTask("default", ["nodemon"]);
};