function addAttribute() {
    const container = document.getElementById("attributes");
    const div = document.createElement("div");
    div.className = "attribute";
  
    const name = document.createElement("input");
    name.placeholder = "Системное имя атрибута";
    name.className = "attr-name";
  
    const desc = document.createElement("input");
    desc.placeholder = "Описание атрибута";
    desc.className = "attr-desc";
  
    div.appendChild(name);
    div.appendChild(document.createElement("br"));
    div.appendChild(desc);
  
    container.appendChild(div);
  }
  
  function saveCSV() {
    const dataProduct = document.querySelector('input[name="dataProduct"]:checked');
    const tableName = document.getElementById("tableName").value.trim();
    const tableDesc = document.getElementById("tableDesc").value.trim();
  
    const names = document.getElementsByClassName("attr-name");
    const descs = document.getElementsByClassName("attr-desc");
  
    if (!dataProduct || !tableName || !tableDesc) {
      alert("Заполните все обязательные поля.");
      return;
    }
  
    let csv = `data_product,table_name,table_description,attribute_name,attribute_description\n`;
  
    for (let i = 0; i < names.length; i++) {
      const attrName = names[i].value.trim();
      const attrDesc = descs[i].value.trim();
      if (attrName || attrDesc) {
        csv += `"${dataProduct.value}","${tableName}","${tableDesc}","${attrName}","${attrDesc}"\n`;
      }
    }
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  