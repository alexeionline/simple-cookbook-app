var   express           = require('express')
	, path              = require('path')
	, lessMiddleware    = require('less-middleware')
	, nosql             = require('nosql')
	, sid				= require('short-id')
	, compressor 		= require('node-minify')
	, app               = express()
	, db
	;

app.configure(function () {
	app.use(lessMiddleware({src: path.join(__dirname, 'static'), compress: true }));
	app.use(express.static(path.join(__dirname, 'static')));
	app.use(express.bodyParser());
	app.set('view engine', 'jade');
	db = nosql.load(path.join(__dirname, '/db/cookbookdb.nosql'), path.join(__dirname, '/db/bin'));

	new compressor.minify({
		type: 'yui-js',
		publicFolder: 'static/js/',
		fileIn: [
			'engine/cookbook.js',
			'engine/models/recipe.js',
			'engine/collections/recipes.js',
			'engine/views/recipeVS.js',
			'engine/views/recipeES.js',
			'engine/views/recipeNS.js',
			'engine/views/recipes.js',
			'engine/layouts/applayout.js',
			'engine/routes/router.js',
			'engine/start.js'],
		fileOut: 'static/js/core.js',
		callback: function(err, min){
			console.log(err);
		}
	});

	new compressor.minify({
		type: 'no-compress',
		publicFolder: 'static/js/',
		fileIn: [	    	
			'jquery.js', 
			'underscore.js',
			'backbone.js',
			'backbone.marionette.js',
			'moment.min.js'],
		fileOut: 'static/js/lib.js',
		callback: function(err, min){
			console.log(err);
		}
		});
});

/**
 * start simple web server on 8000 port
 */
require('http').createServer(app).listen(8000, function () {
	console.log('ready');
});

/**
 * use this route for get compress app files
 */
app.get('/',  function (req, res) {    
	res.render('index', {title: 'cookbook', env: 'prod'});
});

/**
 * use this route for get no-compress app files
 */
app.get('/dev',  function (req, res) {    
	res.render('index', {title: 'cookbook'});
});

/**
 * CRUD api
 * set '/api/v1/recipes' route [GET] for get all recipes from DB
 */
app.get('/api/v1/recipes',  function (req, res) {
	var map
	, 	callback
	;
	map      = function(doc) {return doc};
	callback = function(selected) {
		res.json(selected);
	};

	db.all(map, callback);
});


/**
 * set '/api/v1/recipes' route [POST] for save new recipe or new version of recipe in DB
 */
app.post('/api/v1/recipes',  function (req, res) {
	var recipe;
	recipe = {
		title:       req.body.title,
		description: req.body.description,
		date:        Date.now(),
		id:          'id' + sid.generate(),
		recipeID:    req.body.recipeID || 'rid' + sid.generate()
	}

	db.insert(recipe, function () {
		res.json(200, recipe);
	});
});

/**
 * set '/api/v1/recipes/:id' route [GET] for get recipe item by id 
 */
app.get('/api/v1/recipes/:id',  function (req, res) {
	var map
	, 	callback
	,	id
	;

	id = req.params.id;

	map = function(doc) {
		if (doc.id === id)
			return doc
	};

	callback = function(doc) {
		res.json(doc);
	};

	db.one(map, callback);
});

/**
 * set '/api/v1/recipes' route [PUT] for update recipe item by id 
 */

app.put('/api/v1/recipes',  function (req, res) {
	var recipe
	,	callback
	;

	recipe = {
		title:       req.body.title,
		description: req.body.description,
		date:        req.body.date,
		id:          req.body.id,
		recipeID:    req.body.recipeID
	};

	callback = function (count) {};

	db.update(function(doc) {

		if (doc.id === recipe.id) {
            doc.title       = recipe.title;
            doc.description = recipe.description;
		}

		return doc;
	}, callback);

});