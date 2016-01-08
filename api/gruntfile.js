module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-nodemon");


	grunt.initConfig({
	 	nodemon: {
            all: {
                script: "server/server.js",
                options: {
                    ignore: ["public/", "Gruntfile.js", "build_artifacts"]
                }
            }
        }
    });

	grunt.registerTask("default", "nodemon");
};