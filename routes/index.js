var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
	const app = req.app;
	app.locals.dbconn.query('SELECT * FROM todos', function (err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		return res.render('index', {
	  		elems: results
	  	});
	});
  	
});

router.post('/', function(req, res, next) {
	const app = req.app;
	app.locals.dbconn.query('INSERT INTO todos (text) VALUES (?)', [req.body.text], function (err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		app.locals.dbconn.query('SELECT * FROM todos', function (err, results) {
			if (err) {
				return next(createError(500, 'db error'));
			}
			return res.render('index', {
				elems: results
			});
		})
		
	});
});

router.post('/delete/:id', function(req, res, next) {
	const app = req.app;
	app.locals.dbconn.query('DELETE FROM todos WHERE id = ?', [req.params.id], function(err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		return res.redirect('/');
	})
});

module.exports = router;
