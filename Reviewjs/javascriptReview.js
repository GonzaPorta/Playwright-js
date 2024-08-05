const { error } = require("console");
/* Strict comparator */
let c = "3", a = 3
z = a === c;
console.log(z);

z = a !== c;
console.log(z);

/* Convert a string to a number */
let g = '19';
let edad = Number(g);
console.log(typeof(edad));
console.log(typeof(g));

const transformToNumber = palabra => console.log(`Today is ${4 + parseInt(palabra)} December`);
transformToNumber('4')

/* isNaN function */
if( isNaN(edad)){
    console.log('No es un numero');
}
else{
    console.log('Corresponde a un numero');
}
/* And(&&) comparator */
let isBatteryOn = true;
let isPowerOn = false;
console.log(!(isBatteryOn && isPowerOn));

const condition = 7 >= 6;
const condition2 = 9 === 10;
console.log( condition && condition2);

let valMin = 0, valMax = 20;
if( g >= valMin && g <= valMax){
    console.log('Dentro de rango');
}
else{
    console.log('Fuera de rango');
}
/* Or(||) comparator */
const conditio3 = 7 >= 6;
const condition4 = 9 === 10;
console.log( condition || condition2);

let vacaciones = false, diaDescanso = false;
if(vacaciones || diaDescanso){
    console.log('Puede asistir al juego del hijo');
}
else{
    console.log('El esta ocupado');
}
/* Ternario(?) comparator */
let resultado = (3>2) ? 'OK' : 'Debe colocar solo 2 o numeros menores';
console.log(resultado);

const cualEsMayor = (a, b) => (a > b) ? a : b;
console.log(cualEsMayor(10,9));

/* Switch and IF-ELSE */
let mes = 7;

switch(mes){
    default:
        estacion = 'Estacion no encontrada';
        break;
    case 3: case 4: case 5: case 6:
        estacion = 'Invierno';
        break;
    case 7: case 8: case 9:
        estacion = 'Primavera';
        break;
    case 10: case 11: case 12: case 1: case 2:
        estacion = 'Verano';
        break;
}
console.log(estacion);

let sign = 'Sagitario', elementosig;

if (sign == 'Aries' || sign == 'Leo' || sign == 'Sagitario'){
    elementosig = 'Fuego';
}
else if (sign == 'Cancer' || sign == 'Piscis' || sign == 'Escorpio'){
    elementosig = 'Agua';
}
else{
    elementosig = 'Signo no encontrado';
}
console.log(elementosig);

/* While loop and For loop and methodes */
let user = {
    id: 1,
    name: 'Pedrito',
};

for (let prop in user) {// in = indice
    console.log(prop, user[prop]);
}

let animales = ['Chanchito', 'Dragon', 'Perrito'];
for (let animal of animales) { // for of the best
    console.log(animal);
}

for (let prop in animales) {// in = indice
    console.log(prop, animales[prop]);
}

let arrai = [5, 7, 15, -5, -100, 55, 5];

const numUnicos = arrai.filter((numero,posicon,numeros) => posicon === numeros.indexOf(numero));
console.log(numUnicos);

let array = [
    {id:2, name: 'TOTO', object: 1},// OOB
     5,7, 15, -5, -100, 55];

for (let arr of array) console.log(arr);

let plapla = arrai.sort((x, y) => x - y);//orden by descendente
console.log(plapla)

array.forEach(((item) => {console.log(item)}));

let registros = array.find(item => item.name === 'TOTO');
console.log(registros);

//Get a single value from an array
let newArray2 = arrai.length > 0 ? arrai.reduce((acum, item) => acum += item, 0) : 0;
console.log(newArray2);

let newArrayDobles = (acumu, item) => [...acumu, item * 2] // ... propagador toma elementos de un array existente
let newArrayDobles2 = arrai.reduce(newArrayDobles, []);

console.log(newArrayDobles2);

//Tranform all elements of arrays and get new array
let newArray = array.map((elementoid) => elementoid *2);
console.table(array);
console.table(newArray);

let wawa = array.map(({ id }) => id);
console.table(array);
console.table(wawa);

const nuevoArray = array
    .map(usuario => ({
        ...usuario,
        lastNime: 'algoritmo misterioso'
    }))
console.table(nuevoArray);

//Get new array filter elements the another array that meet a condition
let randomArrays = array.filter((item) => item.name === 'TOTO' || item === -100);
console.log(randomArrays);

const getMenorMayor = (arr) => {
    let menor = arr[0];
    let mayor = arr[0];
    for (numeroos of arr) {
        menor = menor < numeroos ? menor : numeroos;//'?' funciona como entonces, ':' funciona como else
        mayor = mayor > numeroos ? mayor : numeroos;
    }
    return [menor, mayor];
}
console.log(getMenorMayor(array));

let contador = 0;
while (contador < 3){
    console.log(`El contador es: ${contador}`);//Concat 
    contador++;
}
const autos = ['BMW', 'Mercedes Benz', 'Volvo'];
console.log(autos[1]);

//Add element to an array
autos[3] = 'Suzuki';
console.log(autos[3]);
autos.push('Ford', 'WWM');
console.log(autos)
console.log(typeof autos);

//Method of Arrays
let frutas = ['manzana', 'banana', 'cereza', 'dátil', 'uva'];//sin incluir el final del indice en new array,crea new array
var porcionFrutas = frutas.slice(0, 3);

const passed = porcionFrutas.every((item, index) => item === ['manzana', 'banana', 'cereza'][index]);
console.log(passed);
console.log(porcionFrutas);
console.log(frutas);

/* Objects and Methode GET (POO or OOP*/
const person = {//POO or OOP
    firstName: 'Sol',
    lastName: 'Marchetti',
    threeName: ['Porta', 'Bopp'],
    age: 26,
    secondName: 'Giovanna',
    sayHello: function() {return `Hello ${this.firstName} ${this.secondName}`} //Use "this" to refer to a property of the object
};/* get es un metodo para no utilizar los ()*/
console.log(person);
person.email = 'marchettisol@gmail.com';//Add a property to the object
console.log(person.sayHello());
console.log(person);
console.log(person.threeName);
console.log(person.firstName);

let person2 = {//POO or OOP
    firstName: 'piiiiiiiiiii',
    secondName: 'GpuXD'
};
console.log(person.sayHello.apply(person2));

let person3 = {};//methode NEW OBJECT()
person3.telefono = '56247735';
person3.prefijo = '11';
console.log(person3);
delete person3.prefijo;
console.log(person3);

let personString = JSON.stringify(person);//convierte un objeto a cadena
console.log(personString);

const personeObject = JSON.parse(personString);//convierte una cadena en un objeto
console.log(personeObject);

/* Functions Constructor with UpperCamelCase or PassCase*/
function FamilyIntegrante (nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
}
console.log(FamilyIntegrante.length);
console.log(FamilyIntegrante.prototype);

let flamerwar = new FamilyIntegrante('Nicolas', 'Pratto'); 
console.log(flamerwar);

FamilyIntegrante.prototype.calcuage = function(){
    console.log(`${this.apellido} GAMER`)
};

flamerwar.calcuage();
console.log(flamerwar.__proto__ === FamilyIntegrante.prototype);

FamilyIntegrante.prototype.species = 'Homo Sapiens';//Methode add new property of the object
console.log(flamerwar.species)

let punto = {}//Methode New Object
FamilyIntegrante.call(punto, 'Mango', 'Porta');//Methode New Object
console.log(punto);

//Arrow functions
const add2 = (a, b) => a - b;
console.log(add2(69, 45));

const methodesMathematical = (number0) => {return console.log(`Your age is ${++number0} years`);}//AGE=25
methodesMathematical(25)

const family_2 = (edades, apellidos) => { return {edad: edades, apellidos};}
let integrante = family_2(18, 'Pratto')
console.log(integrante);

//Anonymous function(POO or OOP, encapsula datos que tienen relacion entre si )
//Factory functions(create 'factory' function without repeating code) with camelCase
function crearUsuario(name, email) {
    return {
        name,
        email,
        activo: true,
        recuperarClave: function () {//Anonymous
            console.log('Recuperando clave...');
        },
    };
}
console.log(crearUsuario('Chanchito', 'gporta@tsg.com.ar'));
console.log(crearUsuario('Perrito', 'Perrito@tsg.com.ar'));

//
try{
    let x = 10;
    //miFuncion();
}
catch(error){
    console.log(error);
}
finally{
    console.log('Finaliza la revision de errores');
}
console.log('continuamos....');

let resultade = 'f';

try{
    if(isNaN(resultade)) throw 'No es un número';
    else if( resultade === '') throw 'Es cadena vacía';
    else if( resultade >= 0) throw 'Valor positivo';
    else if( resultade < 0 ) throw 'Valor negativo';
}
catch(error){
    console.log(error);
    //console.log(error.name);
    //console.log(error.message);
}
finally{
    console.log('Termina revisión de errores');
}

/*Callbacks*/
function imprimir(mensaje){//function que utilizamos como parametro en otra funcion
    console.log(mensaje);
}

function sumar(op1, op2, callback){
    let res = op1 + op2;
    callback(`Resultado: ${res}`)
    
}
sumar(10, 7, imprimir)

function miFuncionAsync(){
    console.log('Saludo asincrono luego de 2s');
}
//setTimeout(miFuncionAsync, 2000);

//setTimeout( () => console.log('Saludo asincrono 5'), 5000);
//console.log('Fin Asincronismo');

/*Promise and Async*/
let miPromesa = new Promise((resolver, rechazar) =>{
    let expresion = true;
    if(!expresion)
        resolver('Resuelto correctamente');
    else
        rechazar('Ocurrio un error');
});

miPromesa.then(valor => console.log(valor), error => console.log(error));

let iPromise = new Promise((resolve) => {
    console.log('Inicio de promesa');
    setTimeout(() => resolve('Promesa y timeout 6s'), 6000);
});

iPromise.then(valor => console.log(valor));//function then regresa la promesa

//Async and Await
async function miFuncionConPromesa(){
    let espera = new Promise(result => {
    result ('saludos con promesa, async and await');
    });
    console.log(await espera);
}

//miFuncionConPromesa()

//promesas, await, async y setTimeout
async function funcionConPromesaAwaitTimeout(numerosos){
    console.log('inicio función');
    let miPromesa = new Promise(resolver => {
        setTimeout(()=> resolver(`promesa con await y timeout con ${numerosos} parametros`), 3000);
    });
    console.log( await miPromesa);
    console.log('fin función');
}

funcionConPromesaAwaitTimeout(1);