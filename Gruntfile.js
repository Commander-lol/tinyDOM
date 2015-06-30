module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                src: "dist/tinydom.js",
                dest: "dist/tinydom.min.js"
            }
        },
        concat: {
            options: {
                seperator: "",
                banner: "(function () {\n'use strict';\n",
                footer: "\n}());"
            },
            dist: {
                src: ["src/Core.js", "src/Batch.js", "src/Util.js", "src/Json.js", "src/Ajax.js"],
                dest: "dist/tinydom.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask("default", ["concat", "uglify"]);
}
