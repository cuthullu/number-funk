module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-nodemon");


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

        }
    });

	grunt.registerTask("default", "nodemon");
};