const chai = require('chai');
const assert = chai.assert;

const validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

const validSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

const invalidCharactersPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...p......1945....4.37.4.3..6.a';

const not81Puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';


const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

  
  test('Logic handles a valid puzzle string of 81 characters', function(done) {
    assert.equal(solver.solve(validPuzzle), validSolution);
    done();
  })

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
    assert.equal(solver.solve(invalidCharactersPuzzle), '76923541885149637243217895617456928339584276162871354NaN28365719451692483794738162NaN');
    done();
  })

  test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
    assert.equal(solver.solve(not81Puzzle), '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
    done();
  })

  test('Logic handles a valid row placement', function(done) {
    assert.equal(solver.checkRowPlacement(validPuzzle, 'A', 2, 3), true)
    done();
  })

  test('Logic handles an invalid row placement', function(done) {
    assert.equal(solver.checkRowPlacement(validPuzzle, 'A', 2, 2), false)
    done();
  })

  test('Logic handles a valid column placement', function(done) {
    assert.equal(solver.checkColPlacement(validPuzzle, 'A', 2, 3), true)
    done();
  })

  test('Logic handles an invalid column placement', function(done) {
    assert.equal(solver.checkColPlacement(validPuzzle, 'A', 2, 3), true)
    done();
  })

  test('Logic handles a valid region (3x3 grid) placement', function(done) {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', 2, 3), true)
    done();
  })

  test('Logic handles an invalid region (3x3 grid) placement', function(done) {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', 2, 1), false)
    done();
  })

  test('Valid puzzle strings pass the solver', function(done) {
    assert.equal(solver.solve(validPuzzle), validSolution)
    done();
  })

  test('Invalid puzzle strings fail the solver', function(done) {
    assert.equal(solver.solve(invalidCharactersPuzzle), '76923541885149637243217895617456928339584276162871354NaN28365719451692483794738162NaN')
    done();
  })

  test('Solver returns the expected solution for an incomplete puzzle', function(done) {
    assert.equal(solver.solve(validPuzzle), validSolution)
    done();
  })

  
});
