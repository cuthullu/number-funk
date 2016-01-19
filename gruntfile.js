module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks('grunt-ts');
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
        ts: {
            build: {
                src: ["front/**/*.ts", "!node_modules/**/*.ts"], 
                outDir: "public/app",
                // Avoid compiling TypeScript files in node_modules
                options: {
                    "target": "ES5",
                    "module": "system",
                    "moduleResolution": "node",
                    "sourceMap": true,
                    "emitDecoratorMetadata": true,
                    "experimentalDecorators": true,
                    "removeComments": false,
                    "noImplicitAny": false
                }
            }
        },
        copy: {
            main: {
                files: [
                {src: ['node_modules/angular2/bundles/angular2-polyfills.min.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/systemjs/dist/system.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/rxjs/bundles/Rx.min.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/angular2.min.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/http.min.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/angular2/bundles/router.min.js'], dest: 'public/', filter: 'isFile'},
                {src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/', filter: 'isFile'}
                
                ],
            },
        }
    });
    grunt.registerTask("makey",["ts:build", "copy", "nodemon"]);
	grunt.registerTask("default", ["makey"]);
};