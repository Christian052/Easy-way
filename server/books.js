// API Route to Get All Books
// app.get('/api/books', (req, res) => {
//     const sql = `SELECT * FROM books`;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error fetching books.' });
//         }

//         res.status(200).json(results);
//     });
// });