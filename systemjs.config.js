/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      // other libraries
      'underscore':           'npm:underscore',
      'angular2-moment': 'npm:angular2-moment',
      'moment': 'npm:moment',
      'ng2-googlechart':           'npm:ng2-googlechart',
      'rxjs':                      'npm:rxjs',
      'angular2-moment' : 'npm:angular2-moment',
      'moment':'npm:moment',
      'time-ago-pipe':'npm:time-ago-pipe',
      'jQuery':'npm:jQuery',
      'ng2-datetime-picker' : 'node_modules/ng2-datetime-picker/dist',
      'angular2-material-datepicker' : 'node_modules/angular2-material-datepicker'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      src: {
        main: './main.js',
        defaultExtension: 'js'
      },
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'ng2-googlechart': {
		  main: './index.js',
	          defaultExtension: 'js'
      },
	'angular2-material-datepicker': {
		  main: './index.js',
	          defaultExtension: 'js'
      },
      'underscore': {
		  main: './underscore.js',
	  	  defaultExtension: 'js'
      },
	'time-ago-pipe': {main: 'time-ago-pipe.js'},
      'moment': {
	  		  main: './moment.js',
	  	  	  defaultExtension: 'js'
      },
      'angular2-moment': {
	  		  main: './index.js',
	  	  	  defaultExtension: 'js'
      },
      'moment': {
	                  main: './moment.js',
	                  defaultExtension: 'js'
            },
	'jQuery': {
	                  main: './tmp/jquery.js',
	                  defaultExtension: 'js'
            },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-datetime-picker':  { main: 'ng2-datetime-picker.umd.js', defaultExtension: 'js' }
    }
  });
})(this);