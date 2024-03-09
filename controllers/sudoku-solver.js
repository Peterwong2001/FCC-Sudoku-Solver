class SudokuSolver {

  validate(puzzleString) {
    
  }

  letterToNum(row) {
    switch(row.toUpperCase()) {
      case 'A':
        return 1;
      case 'B':
        return 2;
      case 'C':
        return 3;
      case 'D':
        return 4;
      case 'E':
        return 5;
      case 'F':
        return 6;
      case 'G':
        return 7;
      case 'H':
        return 8;
      case 'I':
        return 9;
      default:
        return 'none';
    }
  }
  
  
  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNum(row);
    if(grid[row -1][column-1] !== 0) {
      return false;
    }
    for(let i = 0; i < 9; i++) {
      if(grid[row -1][i] == value) {
        return false;
      }
    }
    return true;
    
  }

  
  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNum(row);
    if(grid[row -1][column -1] !== 0) {
      return false;
    }
    for(let i = 0; i < 9; i++) {
      if(grid[i][column -1] == value) {
        return false;
      }
    }
    return true;
  }

  
  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNum(row);
    if(grid[row -1][column -1] !== 0) {
      return false;
    }
    let startRow = row - (row % 3);
    let startCol = column - (column % 3);
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        if(grid[i + startRow][j + startCol] == value) return false;
    return true;
  }


  solveSudoku(grid, row, column) {
    if(row === 9 - 1 && column === 9) return grid;

    if(column === 9) {
      row++;
      column = 0;
    }

    if(grid[row][column] != 0) return this.solveSudoku(grid, row, column + 1)

    for(let num = 1; num < 10; num++) {
      if(this.isSafe(grid, row, column, num)) {
        grid[row][column] = num;

        if(this.solveSudoku(grid, row, column + 1)) return grid;
      }
      grid[row][column] = 0;
    }
    return false;    
  }


  isSafe(grid, row, column, num) {
    for(let x=0; x<=8; x++) if (grid[row][x] == num) return false;
    for(let x=0; x<=8; x++) if (grid[x][column] == num) return false;

    let startRow = row - (row % 3);
    let startCol = column - (column % 3);

    for(let i=0; i<3; i++)
      for(let j=0; j<3; j++)
        if(grid[i + startRow][j + startCol] == num) return false;

    return true;
  }


  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let row = -1;
    let col = 0;

    for(let i = 0; i < puzzleString.length; i++) {
      if(i % 9 == 0) {
        row++;
      }
      if(col % 9 == 0) {
        col = 0
      }

      grid[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i];
      col++;
    }
    return grid;

  }

  
  transformBack(grid) {
    return grid.flat().join('');
  }

  
  solve(puzzleString) {
    let grid = this.transform(puzzleString);
    let solved = this.solveSudoku(grid, 0, 0);
    if(!solved) {
      return false;
    }
    let solvedString = this.transformBack(solved);
    console.log('Solved string: ' + solvedString);
    return solvedString;
  }

}

module.exports = SudokuSolver;