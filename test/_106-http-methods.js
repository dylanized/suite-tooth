// setup

	var test = require("../index.js");
	
// tests	
	
	test.page("106 HTTP Methods", function() {

		// http methods
	
			test.suite("106.1 Post, Put and Delete",
				[
					{
						label: "Post with .verb",
						verb: "post",
						send: {},
						status: 201
					},	
					{
						label: "Post with .post property",
						post: {},
						status: 201
					},	
					{
						label: "Put with .verb property",
						verb: "put",
						send: {},
						status: 204
					},	
					{
						label: "Put with .put property",
						put: {},
						status: 204
					},
					{
						label: "Del with .del property",
						verb: "del",
						send: {},
						status: 204
					},	
					{
						label: "Delete with .delete property",
						put: {},
						status: 204
					}					
				],
				{
					pending: true
				}
			);
	
	});