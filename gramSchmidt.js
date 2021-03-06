var matrix = [[-2, 3, 0], [4, 0, 0]];
// var matrix = [[1, 2, 0], [8, 1, -6], [0, 0, 1]];
// var matrix = [[0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0]];

var orthoNormVecs = gramSchmidt(matrix);
for (let i = 0; i < orthoNormVecs.length; i++) {
    console.log(orthoNormVecs[i]);
}

var a = getDotProd(orthoNormVecs[0], orthoNormVecs[1])
console.log('dot product of two normalized vectors', a);

function gramSchmidt(matrix) {
    if (matrix.length == 0) {
        return matrix;
    } else {
        var newVec = matrix[0];
        var restVecs = matrix.slice(1);
        var rest = gramSchmidt(restVecs);

        // orthogonalization
        if (rest.length > 0) {
            for (let i = 0; i < rest.length; i++) {
                newVec = project(newVec, rest[i]);
            }
        }
        var newNormVec = [normalize(newVec)];
        var newArray = newNormVec.concat(rest);

        // normalization
        return (newArray);
    }
}

function doThisProjection(newVec, vector) {
    var dotProd = getDotProd(newVec, vector);
    var resVec = multiply(dotProd, vector);
    return resVec;
}

function project(newVec, vector) {
    var dotProd = getDotProd(newVec, vector);
    var resVec = multiply(dotProd, vector);
    var orthoVec = subtract(resVec, newVec);
    return orthoVec;
}

function normalize(vector) {
    var multiple = Math.sqrt(getDotProd(vector, vector));
    var normVec = multiply((1/multiple), vector);
    return normVec;
}

function getDotProd(vec1, vec2) {
    var prod = 0;
    for (let i = 0; i < vec1.length; i++)
        prod += vec1[i] * vec2[i];
    return prod
}

function multiply(dotProd, vec) {
    var resVec = [];
    for (let i = 0; i < vec.length; i++)
        resVec.push(dotProd * vec[i]);
    return resVec;
}

function subtract(resVec, currentVec) {
    var orthoVec = [];
    for (let i = 0; i < currentVec.length; i++)
        orthoVec.push(currentVec[i] - resVec[i])
    return orthoVec;
}
