function createMatrices() {
    var rowsA = parseInt(document.getElementById('rowsA').value);
    var colsA = parseInt(document.getElementById('colsA').value);
    var rowsB = parseInt(document.getElementById('rowsB').value);
    var colsB = parseInt(document.getElementById('colsB').value);

    if (isNaN(rowsA) || isNaN(colsA) || isNaN(rowsB) || isNaN(colsB)) {
        alert("Please enter valid values for rows and columns.");
        return;
    }

    createMatrixInputs('matrixAInputs', 'matrixA', rowsA, colsA);
    createMatrixInputs('matrixBInputs', 'matrixB', rowsB, colsB);
}

function createMatrixInputs(containerId, matrixId, rows, cols) {
    var container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous inputs

    var table = document.createElement('table');

    for (var i = 0; i < rows; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement('td');
            var input = document.createElement('input');
            input.type = "number";
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}

function multiplyMatrices() {
    var matrixA = readMatrix('matrixA');
    var matrixB = readMatrix('matrixB');

    if (!matrixA || !matrixB) {
        document.getElementById('result').innerText = "Invalid input matrices.";
        return;
    }

    if (matrixA[0].length !== matrixB.length) {
        document.getElementById('result').innerText = "Number of columns in Matrix A must equal the number of rows in Matrix B.";
        return;
    }

    var result = [];
    for (var i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (var j = 0; j < matrixB[0].length; j++) {
            result[i][j] = 0;
            for (var k = 0; k < matrixA[0].length; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    displayResult(result);
}

function readMatrix(matrixId) {
    var matrix = [];
    var rows = document.querySelectorAll('#' + matrixId + 'Inputs table tr');

    for (var i = 0; i < rows.length; i++) {
        var rowInputs = rows[i].querySelectorAll('input');
        var row = [];
        for (var j = 0; j < rowInputs.length; j++) {
            row.push(parseFloat(rowInputs[j].value));
        }
        matrix.push(row);
    }

    return matrix;
}

function displayResult(result) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<h3>Result:</h3>";
    var table = document.createElement('table');

    for (var i = 0; i < result.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < result[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = result[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    resultDiv.appendChild(table);
}
