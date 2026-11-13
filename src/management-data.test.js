import test from 'node:test';
import assert from 'node:assert/strict';
import { initialData, applyMovement, csvText } from './management-data.js';

const movement = {materialId:'ACO-12',type:'Saída',quantity:100,reference:'OF-2481'};
test('Consumo reduz stock e mantém rastreabilidade sem alterar o estado anterior',()=>{
  const data=structuredClone(initialData);const result=applyMovement(data,movement);
  assert.equal(result.materials[0].stock,4100);assert.equal(data.materials[0].stock,4200);
  assert.equal(result.movements[0].reference,'OF-2481');assert.equal(result.movements[0].lot,'VAZ-2026-148');
});
test('Rejeita stock insuficiente, quantidades inválidas e peças fracionadas',()=>{
  for(const quantity of [5000,0,-1,NaN]) assert.throws(()=>applyMovement(initialData,{...movement,quantity}));
  assert.throws(()=>applyMovement(initialData,{...movement,materialId:'LA-20',quantity:1.5}));
});
test('Transferências preservam saldo total e acumulam no lote de destino',()=>{
  const transfer={...movement,type:'Transferência',destination:'Produção'};
  let data=applyMovement(initialData,transfer);data=applyMovement(data,transfer);
  const materials=data.materials.filter(m=>m.name===initialData.materials[0].name);
  assert.equal(materials.length,2);assert.equal(materials.reduce((s,m)=>s+m.stock,0),4200);
  assert.equal(materials.find(m=>m.warehouse==='Produção').stock,200);
  assert.throws(()=>applyMovement(initialData,{...transfer,destination:'Matéria-prima'}));
});
test('Entrada aumenta saldo e exportação CSV protege fórmulas e aspas',()=>{
  assert.equal(applyMovement(initialData,{...movement,type:'Entrada'}).materials[0].stock,4300);
  const csv=csvText(['Nome'],[['=1+1'],['Material "A"; aço']]);
  assert.ok(csv.startsWith('\ufeff'));assert.ok(csv.includes("'="));assert.ok(csv.includes('"Material ""A""; aço"'));
});
