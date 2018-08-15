/*!
 * lepetgo's Gruntfile
 */
module.exports = function (grunt){
	'use strict';
	var configBridge = grunt.file.readJSON('./grunt/configBridge.json',{encoding:'utf8'});
    /*var dependencies = [
        'components/jquery/jquery.js',
        'components/underscore/underscore.js',
        'components/backbone/backbone.js'
    ];*/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        less:{
            fontAwesome:{
                files: {
                    //lessc fontAwesome 先将文件暂存build文件夹里面
                    'build/css/font-awesome.css': 'less/Font-awesome/font-awesome.less',
                    'build/css/font-awesome-ie7.css': 'less/Font-awesome/font-awesome-ie7.less',
                    //存放dist文件夹
                    'dist/css/font-awesome.css': 'less/Font-awesome/font-awesome.less',
                    'dist/css/font-awesome-ie7.css': 'less/Font-awesome/font-awesome-ie7.less'
                }
            }
        },
		//cssmin模块的作用是最小化CSS文件
		cssmin: {
			add_banner:{
				options:{
					banner: '/**\n*  gobal全局样式\n* ----------------------\n*  作者：niewei\n*  时间：<%= grunt.template.today("yyyy-mm-dd") %>\n*  联系：nw0108@gmail.com\n*  CSS虽好，需培养，需规范，需慢慢品尝\n*********************************************************************************************/'
				},
				files:{
					'build/css/lepetgo.min.css': ['src/css/**/*.css']   //合并并压缩src/css目录下(包含子目录)的所有css文件
				}
			},
            fontAwesome:{
                options:{
					banner: '/**\n*  gobal全局样式\n* ----------------------\n*  作者：niewei\n*  时间：<%= grunt.template.today("yyyy-mm-dd") %>\n*  联系：nw0108@gmail.com\n*  CSS虽好，需培养，需规范，需慢慢品尝\n*********************************************************************************************/'
				},
                files:{
                    'dist/css/font-awesome.min.css':['build/css/font-awesome.css'],
                    'dist/css/font-awesome-ie7.min.css':['build/css/font-awesome-ie7.css']
                }
            }
		},
		//grunt-contrib-jshint 用来检查语法错误，比如分号的使用是否正确、有没有忘记写括号等等。
		jshint: {
			//自定义任务  begin
			lepetgo:{
				options: {},
				files:[]
			},
			//自定义任务  end
			options: {
				eqeqeq: true,
				trailing: true
			},
			files: ['Gruntfile.js','lib/**/*.js']
		},
		//grunt-contrib-concat 用来合并同类文件，它不仅可以合并JavaScript文件，还可以合并CSS文件。
		concat: {
			options: {
			   banner: '<%= banner %>\n<%= jqueryCheck %>',
			   stripBanners: false
			},
			//自定义任务  begin
			lepetgo:{
				src: [
					'src/js/lepetgo.js'
				],
				dest:'dist/js/<%= pkg.name %>.js'
			}
			//自定义任务  end
		},
		//grunt-contrib-uglify 模块用来压缩代码，减小文件体积。
		uglify: {
			options: {
				sourceMap: true,
				sourceMapName: 'dist/js/<%= pkg.name %>.map',
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
		 lepetgo:{
                files: {
                    'dist/js/<%= pkg.name %>.min.js':['js/<%= pkg.name %>.js']
                }
            }
		},
		//grunt-contrib-copy 用于复制文件与目录。
		copy: {
			font: {
				//用于复制文件与目录
				expand: true,
				src: 'font/*',
				dest: 'dist/'
			}
		},
		//该模块用于删除文件或目录。
		clean: {

		},
		//grunt-autoprefixer 该模块用于为CSS语句加上浏览器前缀。
		autoprefixer: {
			dist:{
				files:{
					'build/css/style.css':'src/css/input_one.css'
				}
			},
			options:{
				browsers:configBridge.config.autoprefixerBrowsers
			},
			core:{
				options:{
					map:true
				},
				src:'src/css/<%= pkg.name %>.css'
			},
			theme:{
				options:{
					map:true
				},
				src:'build/css/<%= pkg.name %>-theme.css'
			},
			examples:{
				expand:true,
				cwd:'src/css/',
				src:['**/*.css'],
				dest:'build/css/'
			}
		}
	});
	//为这些插件提供必要的任务
	require('load-grunt-tasks')(grunt,{scope:'devDependencies'});
	//加载time-grunt
	require('time-grunt')(grunt);

	//require('load-grunt-tasks')(grunt);

	/*cssmin','jshint','concat','copy','clean'*/

  	//默认被执行的任务列表。
    grunt.registerTask('default', ['dist','font','fontAwesome','fontAwesomeMin']); //fontAwesome
    grunt.registerTask('dist', ['uglify:lepetgo']);
    grunt.registerTask('font', ['copy:font']);
    grunt.registerTask('fontAwesome', ['less:fontAwesome']);
    grunt.registerTask('fontAwesomeMin', ['cssmin:fontAwesome']);
	//grunt.registerTask('default', ['uglify','cssmin','autoprefixer']);
	//grunt.registerTask('stylesheets', 'Compiles the stylesheets.', [ 'stylus', 'autoprefixer' ]);
}
