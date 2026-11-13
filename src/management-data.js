export const STORAGE_KEY = 'evolaje-management-v1';
export const sectors = ['Armaduras', 'Serralharia', 'Betonagem', 'Lajes', 'Montagem'];
export const warehouses = ['Matéria-prima', 'Central de betão', 'Produção', 'Expedição'];
export const initialData = {
  materials: [
    {id:'ACO-12',name:'Varão de aço Ø12',unit:'kg',warehouse:'Matéria-prima',stock:4200,min:1500,cost:0.92,lot:'VAZ-2026-148'},
    {id:'CIM-42',name:'Cimento CEM II 42,5',unit:'kg',warehouse:'Central de betão',stock:8200,min:10000,cost:0.14,lot:'C-2611'},
    {id:'DES-01',name:'Descofrante vegetal',unit:'L',warehouse:'Produção',stock:180,min:100,cost:3.8,lot:'D-408'},
    {id:'LA-20',name:'Laje alveolar LA-20',unit:'un.',warehouse:'Expedição',stock:85,min:20,cost:124,lot:'BET-2469'},
    {id:'ARE-01',name:'Areia lavada',unit:'kg',warehouse:'Central de betão',stock:16000,min:12000,cost:0.025,lot:'A-1011'},
  ],
  teams: [
    {id:'EQ-01',name:'Equipa A',sector:'Armaduras',leader:'António Ferreira',shift:'08:00–16:00',members:8,hours:8,status:'Ativa'},
    {id:'EQ-02',name:'Equipa B',sector:'Betonagem',leader:'João Oliveira',shift:'08:00–16:00',members:4,hours:8,status:'Ativa'},
    {id:'EQ-03',name:'Equipa C',sector:'Serralharia',leader:'Rui Santos',shift:'08:00–16:00',members:5,hours:8,status:'Ativa'},
    {id:'EQ-04',name:'Equipa D',sector:'Montagem',leader:'Paulo Ribeiro',shift:'09:00–17:00',members:3,hours:8,status:'Indisponível'},
  ],
  movements: [],
};
export const money = value => new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(value);
export const number = value => new Intl.NumberFormat('pt-PT',{maximumFractionDigits:3}).format(value);
export function applyMovement(data, input) {
  const item=data.materials.find(m=>m.id===input.materialId);
  const qty=Number(input.quantity);
  if(!item || !Number.isFinite(qty) || qty<=0) throw new Error('Indique um material e uma quantidade superior a zero.');
  if(!['Entrada','Saída','Transferência'].includes(input.type)) throw new Error('Tipo de movimento inválido.');
  if(item.unit==='un.' && !Number.isInteger(qty)) throw new Error('As peças devem ser movimentadas em unidades inteiras.');
  if(input.type!=='Entrada' && qty>item.stock) throw new Error('Stock insuficiente para este movimento.');
  if(!input.reference.trim()) throw new Error('Indique a guia, ordem de fabrico ou justificação.');
  const destination=input.type==='Transferência'?input.destination:'';
  if(input.type==='Transferência' && (!warehouses.includes(destination)||destination===item.warehouse)) throw new Error('Escolha um armazém de destino diferente da origem.');
  let materials=data.materials.map(m=>m.id===item.id?{...m,stock:Math.round((m.stock+(input.type==='Entrada'?qty:-qty))*1000)/1000}:m);
  if(destination){
    const existing=materials.find(m=>m.name===item.name&&m.unit===item.unit&&m.lot===item.lot&&m.warehouse===destination);
    materials=existing?materials.map(m=>m.id===existing.id?{...m,stock:Math.round((m.stock+qty)*1000)/1000}:m):[...materials,{...item,id:crypto.randomUUID(),warehouse:destination,stock:qty,min:0}];
  }
  const movement={...input,id:crypto.randomUUID(),date:new Date().toISOString(),quantity:qty,name:item.name,unit:item.unit,warehouse:item.warehouse,destination,cost:item.cost,lot:item.lot};
  return {...data,materials,movements:[movement,...data.movements]};
}
export function csvText(headers, rows) {
  const cell=value=>{let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
  return '\ufeff'+[headers,...rows].map(row=>row.map(cell).join(';')).join('\r\n');
}
