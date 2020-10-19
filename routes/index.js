var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
	const app = req.app;
	
	let value = req.query.sort ? req.query.sort : 'id-inc';
	let field = value.split('-')[0];
	let order = value.split('-')[1];
	let pg = req.query.page ? req.query.page : '1';
	let a = (pg - 1) * 10;
	app.locals.dbconn.query('SELECT COUNT(*) as c FROM todos', function (err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		let rows = results[0].c;
		app.locals.dbconn.query('SELECT * FROM todos ORDER BY ?? ' + (order == 'inc' ? 'ASC' : 'DESC') + ' LIMIT ?, 10', [field, a], function (err, results) {
			if (err) {
				return next(createError(500, 'db error'));
			}
			let page = 0;
			if (parseInt(rows) % 10 >= 1) {
				page = Math.floor(parseInt(rows) / 10);
				page = page + 1;
			} else {
				page = parseInt(rows) / 10;
			}
			return res.render('index', {
				elems: results,
				val: value,
				pages: page,
				elements: rows 
			});	
		})
	});

	
	
  	
});

router.post('/', function(req, res, next) {
	const app = req.app;
	app.locals.dbconn.query('INSERT INTO todos (text) VALUES (?)', [req.body.text], function (err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		return res.redirect('/');
		
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

router.post('/edit/:id', function(req, res, next) {
	const app = req.app;
	app.locals.dbconn.query('UPDATE todos SET text = ? WHERE id = ?', [req.body.newtext, req.params.id], function(err, results) {
		if (err) {
			return next(createError(500, 'db error'));
		}
		return res.redirect('/');
	});
});

module.exports = router;
