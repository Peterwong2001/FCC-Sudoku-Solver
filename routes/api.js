'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      console.log('Check button pressed');
      
      

      if(!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' });
      }

      const row = coordinate.split('')[0];
      const column = coordinate.split('')[1];

      if(coordinate.length !== 2 || !/^[a-i]/i.test(row) || !/^[1-9]/i.test(column)) {
        res.json({ error: 'Invalid coordinate' });
        return;
      }

      if(!/^[1-9]$/.test(value)) {
        res.json({ error: 'Invalid value' });
        return;
      }

      if(puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }

      if(/[^0-9.]/g.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }

      const valid = (solver.letterToNum(row) -1)*9+(+column-1);
      if(puzzle[valid] == value) {
        res.json({ valid: true });
        return
      }
      

      let validCol = solver.checkColPlacement(puzzle, row, column, value);
      let validRow = solver.checkRowPlacement(puzzle, row, column, value);
      let validRegion = solver.checkRegionPlacement(puzzle, row, column, value);
      let conflicts = [];

      
      
      if(validCol && validRow && validRegion) {
        res.json({ valid: true });
        return;
      } else {
        if(!validCol) {
          conflicts.push('column');
        }
        if(!validRow) {
          conflicts.push('row');
        }
        if(!validRegion) {
          conflicts.push('region');
        }
        res.json({ valid: false, conflict: conflicts });
      }

      

        
    });

  app.route('/api/solve')
    .post((req, res) => {
        const puzzleString = req.body.puzzle;
        console.log('Solve button pressed');

        if(!puzzleString) {
          res.json({ error: 'Required field missing' })
          return;
        }
        if(puzzleString.length != 81) {
          res.json({ error: 'Expected puzzle to be 81 characters long' })
          return;
        }

        if(/[^0-9.]/g.test(puzzleString)) {
          res.json({ error: 'Invalid characters in puzzle' })
          return;
        }
        let solvedString = solver.solve(puzzleString);
        if(!solvedString) {
          res.json({ error: 'Puzzle cannot be solved' })
        } else {
          res.json({ solution: solvedString });
        }

        
        
      
    });
};