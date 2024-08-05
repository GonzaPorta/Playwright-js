class Persona{
    static contadorPersonObject = 0;

    constructor(nombre, apellido){
        this.id = ++Persona.contadorPersonObject;
        this._nombre = nombre; 
        this._apellido = apellido;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){//allowed change name
        this._nombre = nombre;
    }
    get apellido(){
        return this._apellido;
    }
    set apellido(apellido){
        this._apellido = apellido;
    }
    nombreCompleto(){
        return `${this._nombre} ${this._apellido}`;
    }
    static saludar(){
        console.log('saludos desde método static');
    }
    static saludar2(persona){
        console.log(persona.nombre + ' ' + persona.apellido);
    }
}
let persona1 = new Persona('Juan', 'Perez');
persona1.nombre = 'Daniel Pedraza';//set nombre
let persona2 = new Persona('Juan', 'Perez');
console.log(persona1.nombre);
console.log(persona2);
Persona.saludar();
Persona.saludar2(persona1);



class Empleado extends Persona{
    constructor(nombre, apellido, departamento){
        super(nombre, apellido);//llamar al constructor de la clase padre
        this._departamento = departamento;
    }
    get departamento(){
        return this._departamento;
    }
    set departamento(departamento){
        this._departamento = departamento;
    }
    //Sobreescritura
    nombreCompleto(){
        return super.nombreCompleto() + ' DE ' + this._departamento;
    }
    detalle(){
        return `Area de: ${this.departamento}`;
    }
}
/*Polimorfismo This functions execute the methode of the someclass(de funciones en clases las utilizas en una clase independiente )*/
function imprimir(tipo){
    console.log(tipo.detalle());
}
let empleado1 = new Empleado('Maria', 'Jimenez', 'Sistemas');
console.log(empleado1);
console.log(empleado1.nombreCompleto());
console.log(empleado1.detalle());

Empleado.saludar();
Empleado.saludar2(empleado1);
console.log(Persona.contadorPersonObject);
imprimir(empleado1);