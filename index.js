// module setup

	var test = require("unit.js");

// setup mocha test	

	// build test suite with array of tests or suites
		
		test.suite = function(label, tests, data) {
		
			describe(label, function() {
			
				var options;
			
				// for each test
				for (var key in tests) {
				
					// if this is a nested suite
					if (tests[key].label) test.suite(tests[key].label, tests[key].tests, data);
				
					// else its a test
					else {
						// if http
						if (tests[key].path) {
							options = _.extend(tests[key], data);
							test.http(options, tests[key].assert);
						}
						// if async
						else if (tests[key].assert.length > 0) test.async(tests[key].desc, tests[key].assert, data);
						// else sync
						else test.sync(tests[key].desc, tests[key].assert, data);
					}
				
				}
			
			});
		
		}

	// run suite with single test
	
		test.single = function(label, desc, assert, data) {
		
			describe(label, function() {
			
				// if async
				if (assert.length > 0) test.async(desc, assert, data);
				// else sync				
				else test.sync(desc, assert, data);
			
			});
		
		}
	
	// sync test case
	
		test.sync = function(desc, assert, data) {
			
			it(desc, function() {
				return assert(data);
			});
		
		}

	// async test case
	
		test.async = function(desc, assert, data) {
		
			it(desc, function(done) {	
			
				if (typeof data == "object") assert(data, done);
				else assert(done);	
			
			});		
		
		}
		
	// supertest wrapper
	
		/* example of options obj */
		var options_example = {
			host: "http://localhost:9000",
			path: "/api/path/",
			user: "email@domain.com",
			pass: "123456",
			set: [
				{ "X-Auth-Token": "d9aff2ca0603aef4c2df46a9b3effe69" }
			],
			status: 200,
			expect: [
				{ "Content-Type": /json/ }
			]
		};
	
		test.http = function(options, assert, done) {
		
			var httpString = "test.httpAgent(options.host)";
			
			// path
			httpString += ".get(options.path)";
			
			// auth
			if (options.user && options.pass) httpString += ".auth(options.user, options.pass)";
			
			// headers
			if (options.set && options.set.length > 0) {
				for (var key in options.set) {
					httpString += ".set(options.set[" + key + "])";
				}
			}
			
			// accept
			if (options.accept) httpString += ".set('Accept', options.accept)";		
			
			// status
			if (options.status) httpString += ".expect(options.status)";
			
			// type
			if (options.type) httpString += ".expect('Content-Type', options.type)";
	
			// body
			if (options.body) httpString += ".expect(options.body)";
			
			// expect
			if (options.expect && options.expect.length > 0) {
				for (var key in options.expect) {
					var obj = options.expect[key];
					var field = Object.keys(obj)[0];
					var val = obj[field];
					if (typeof val == "string") val = "'" + val + "'";
					httpString += ".expect('" + field + "', " + val + ")";
				}
			}
			
			// assert
			if (assert) httpString += ".expect(assert)";
			
			// end
			httpString += ".end(done);";
			
			// run httpString
			eval(httpString);
								
		}		
	
// module exports	
	
	module.exports = test;
