//"S" Single Responsibility Principle SOLID
// Callstack, se denomina pila de ejecucion de llamadas y sigue el principio LIFO
// Last In,First Out, se apilan un frame registro que contiene variables....cuando se completa aparece LIFO
class GestorUsuarios {
    constructor() {
      this.usuarios = [];
    }
  
    agregarUsuario(usuario) {
      this.usuarios.push(usuario);
      console.log(`User ${usuario} agregado`);
    }
    mostrarUsuarios() {
      console.log('Lista de usuarios:');
      let index = 1;
      for (const usuario of this.usuarios) {
        console.log(`${index}. ${usuario}`);
        index++;
      }
    }
    
  }
  
const gestorUsuarios = new GestorUsuarios();
gestorUsuarios.agregarUsuario('Juan');
gestorUsuarios.agregarUsuario('María');
gestorUsuarios.agregarUsuario('PEPE')
gestorUsuarios.mostrarUsuarios();

//"O" & "L" Open/Closed Principle and Liskov Subtitution Principle
class FormaGeometrica {
    calcularArea() {
      throw new Error('Método calcularArea() debe ser implementado por las subclases.');
    }
  }
  
  class Rectangulo extends FormaGeometrica { //The use of "extends" refers to inheritance
    constructor(base, altura) {
      super();//Use inheritance
      this.base = base;
      this.altura = altura;
    }
  
    calcularArea() {
      return this.base * this.altura;
    }
  }
  
  class Circulo extends FormaGeometrica {
    constructor(radio) {
      super();
      this.radio = radio;
    }
  
    calcularArea() {
      return Math.PI * this.radio ** 2;
    }
  }
  
const rectangulo = new Rectangulo(5, 10);
console.log('Área del rectángulo:', rectangulo.calcularArea());
  
const circulo = new Circulo(7);
console.log('Área del círculo:', circulo.calcularArea());

//"I" Interface Segregation Principle
class Trabajador {
    trabajar() {
      throw new Error('Método trabajar() debe ser implementado por las subclases.');
    }
  }
  
  class Desarrollador extends Trabajador {
    trabajar() {
      console.log('El desarrollador está programando.');
    }
  }
  
  class Gerente extends Trabajador {
    trabajar() {
      console.log('El gerente está coordinando el equipo.');
    }
  }
  
const desarrollador = new Desarrollador();
desarrollador.trabajar();

const gerente = new Gerente();
gerente.trabajar();

//"D" Dependency Inversion Principle
class UsuarioService {
    constructor(storage) {
      this.storage = storage;
    }
  
    guardarUsuario(usuario) {
      this.storage.guardar(usuario);
      console.log(`Usuario ${usuario} guardado.`);
    }
  }
  
  class LocalStorage {
    guardar(data) {
      // Lógica para guardar en el almacenamiento local
      console.log(`Guardando en el almacenamiento local: ${data}`);
    }
  }
  
  class DatabaseStorage {
    guardar(data) {
      // Lógica para guardar en la base de datos
      console.log(`Guardando en la base de datos: ${data}`);
    }
  }
  
const localStorage = new LocalStorage();
const usuarioService = new UsuarioService(localStorage);
usuarioService.guardarUsuario('Juan');

const databaseStorage = new DatabaseStorage();
const usuarioDatabase = new UsuarioService(databaseStorage);
usuarioDatabase.guardarUsuario('María');