const table = document.createElement("table");
let num = 0;
for(let i=1; i<=5; i++){
   const tr = document.createElement('tr');
   for(let j=1; j<=5; j++){
    const td = document.createElement('td');
    console.log(td)
    num++
    td.innerText = num;
    //add data into td 
    tr.append(td);

    //append td to tr
    
   }
   //append tr to table
   //append table to body
   table.append(tr);
}
document.body.append(table);



