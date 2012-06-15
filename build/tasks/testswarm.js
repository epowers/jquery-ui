/*jshint node: true */
module.exports = function( grunt ) {

var tests = {
	"Accordion": "accordion/accordion.html",
	"Accordion_deprecated": "accordion/accordion_deprecated.html",
	"Autocomplete": "autocomplete/autocomplete.html",
	"Button": "button/button.html",
	"Core": "core/core.html",
	//"datepicker/datepicker.html",
	//"dialog/dialog.html",
	//"draggable/draggable.html",
	//"droppable/droppable.html",
	"Effects": "effects/effects.html",
	"Menu": "menu/menu.html",
	"Position": "position/position.html",
	"Position_deprecated": "position/position_deprecated.html",
	"Progressbar": "progressbar/progressbar.html",
	//"resizable/resizable.html",
	//"selectable/selectable.html",
	//"slider/slider.html",
	//"sortable/sortable.html",
	"Spinner": "spinner/spinner.html",
	"Tabs": "tabs/tabs.html",
	"Tabs_deprecated": "tabs/tabs_deprecated.html",
	"Tooltip": "tooltip/tooltip.html",
	"Widget": "widget/widget.html"
};

function submit( commit, tests, configFile ) {
	var test,
		testswarm = require( "testswarm" ),
		config = grunt.file.readJSON( configFile ).jqueryui,
		testBase = config.testUrl + commit + "/tests/unit/",
		testUrls = [];
	for ( test in tests ) {
		testUrls.push( testBase + tests[ test ] + "?nojshint=true" );
	}
	testswarm({
		url: config.swarmUrl,
		pollInterval: 10000,
		timeout: 1000 * 60 * 30,
		done: this.async()
	}, {
		authUsername: config.authUsername,
		authToken: config.authToken,
		jobName: 'jQuery UI commit #<a href="https://github.com/jquery/jquery-ui/commit/' + commit + '">' + commit.substr( 0, 10 ) + '</a>',
		runMax: config.runMax,
		"runNames[]": Object.keys(tests),
		"runUrls[]": testUrls,
		"browserSets[]": ["popular"]
	});
}

grunt.registerTask( "testswarm", function( commit, configFile ) {
	submit( commit, tests, configFile );
});

grunt.registerTask( "testswarm-multi-jquery", function( commit, configFile ) {
	var test,
		allTests = {};
	for ( test in tests ) {
		allTests[ test + "-1.6.3" ] = tests[ test ] + "?nojshint=true&jquery=1.6.3";
	}
	for ( test in tests ) {
		allTests[ test + "-1.7.2" ] = tests[ test ] + "?nojshint=true&jquery=1.7.2";
	}
	submit( commit, allTests, configFile );
});

};