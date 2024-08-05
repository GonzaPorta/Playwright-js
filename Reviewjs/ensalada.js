function cortar(integrante) {
    console.log(`Cortar ${integrante}`)
}

function mezclarIngredientes(n) {
    if(n <= 0) return;
    console.log(`Mezclar # ${n}`);
    mezclarIngredientes( n - 1);
}

function comer(){
    console.log('Comer');
}

function hacerEnsalaMixta(){
    cortar('lechuga');
    cortar('tomate');
    cortar('zanahoria');
    cortar('zapallo');
    mezclarIngredientes(5);
    comer();
}
hacerEnsalaMixta();

class TiendaDeFrutas {
    async comprarFrutas(fruta1, fruta2) {// asi o arrow ? 
      await Promise.all([
        this.obtenerFruta(fruta1),
        this.obtenerFruta(fruta2),
      ]);
  
      const operacionesAdicionales = await Promise.resolve('Operaciones adicionales realizadas');
      console.log(operacionesAdicionales);
    }
  
    obtenerFruta(fruta) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Fruta obtenida: ${fruta}`);
          resolve();
        }, 1000);
      });
    }
  }
  
const tienda = new TiendaDeFrutas();
tienda.comprarFrutas('Manzana', 'Plátano');