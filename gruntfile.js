var grunt = require('grunt');

grunt.initConfig({

    // -------------------------------------------------------------------------
    // CSS

    less: {
        options: {
            compress: true,
            optimisation: 1,
            banner: '/* (c) 2016, Henrike Legner */\n'
        },
        app: {
            files: [{
                expand: true,
                src: '**/*.less',
                cwd: 'src/',
                dest: 'build/',
                ext: '.css'
            }]
        }
    },

    autoprefixer: {
        app: {
            files: [{
                expand: true,
                src: 'build/**/*.css'
            }]
        }
    },

    // -------------------------------------------------------------------------
    // JavaScript

    babel: {
        options: {
            presets: ['es2015-loose']
        },
        app: {
            files: [{
                expand: true,
                src: '**/*.js',
                cwd: 'src/',
                dest: 'build/'
            }]
        }
    },

    uglify: {
        options: {
            banner: '/* (c) 2016, Henrike Legner */\n',
            sourceMap: false,
            mangle: true
        },
        app: {
            files: [{
                expand: true,
                src: 'build/**/*.js'
            }]
        }
    },


    // -------------------------------------------------------------------------
    // JavaScript

    pug: {
        app: {
            files: [{
                expand: true,
                src: ['**/*.jade', '!_layout.jade'],
                cwd: 'src',
                dest: 'build/',
                ext: '.html'
            }]
        }
    },


    // -------------------------------------------------------------------------
    // General

    clean: {
        app: ['build']
    },

    copy: {
        app: {
            files: [{
                expand: true,
                src: '**/*.{gif,png,jpg,webp,ico,json,mp3,mp4,eot,svg,ttf,woff,pdf,txt}',
                cwd: 'src',
                dest: 'build'
            }]
        }
    },

    buildcontrol: { app: {
        options: {
            dir: 'build',
            branch: 'gh-pages',
            commit: true,
            push: true,
            force: true,
            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
            remote: 'git@github.com:plegner/henrikelegner.com.git'
        }
    }}

});

require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.registerTask('build', ['clean', 'babel', 'less', 'pug', 'copy']);
grunt.registerTask('default', ['build', 'uglify', 'autoprefixer']);
grunt.registerTask('deploy', ['default', 'buildcontrol']);
module.exports = grunt;
