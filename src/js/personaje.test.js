/**
* @jest-environment jsdom
*/
const funciones = require("./testspersonaje")

test ("El buff de velocidad funciona",()=>{expect(funciones.speedModifier(3,0)).toBe(4.5)});
test ("El buff de score funciona",()=>{expect(funciones.scoreModifier(4,0)).toBe(0.25)});
test("El buff de score funciona",()=>{expect(funciones.sizeModifier(4,0)).toBe(200,200)});

test ("El componente tiene 50px de ancho", ()=>{expect(funciones.startGame().width).toBe(50)});
test ("El componente tiene 50px de alto", ()=>{expect(funciones.startGame().height).toBe(50)});
test ("El componente empieza en la coordenada x=20", ()=>{expect(funciones.startGame().x).toBe(20)});
test ("El componente empieza en la coordenada y=220", ()=>{expect(funciones.startGame().y).toBe(220)});


test ("el bloque se mueve la longitud deseada en -x", ()=>{
    expect(funciones.updateGameArea(-1,0)[0]).toBe(18.5)
    
});
test ("el bloque se mueve la longitud deseada en x", ()=>{
    expect(funciones.updateGameArea(1,0)[0]).toBe(20)
    
});
test ("el bloque se mueve la longitud deseada en -y", ()=>{
    expect(funciones.updateGameArea(0,-1)[1]).toBe(218.5)
    
});
test ("el bloque se mueve la longitud deseada en y", ()=>{
    expect(funciones.updateGameArea(0,1)[1]).toBe(220)
    
});
test ("el bloque se mueve la longitud deseada en -x,-y", ()=>{
    expect(funciones.updateGameArea(-1,-1)).toStrictEqual([18.5,218.5])
    
});
