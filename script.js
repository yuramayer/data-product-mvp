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
  
    const sep = ";";
    let csv = `data_product${sep}table_name${sep}table_description${sep}attribute_name${sep}attribute_description\n`;
  
    for (let i = 0; i < names.length; i++) {
      const attrName = names[i].value.trim();
      const attrDesc = descs[i].value.trim();
      if (attrName || attrDesc) {
        const row = [
          dataProduct.value,
          tableName,
          tableDesc,
          attrName,
          attrDesc
        ].map(val => `"${val.replace(/"/g, '""')}"`).join(sep);
        csv += row + "\n";
      }
    }
  
    // Добавляем BOM (\uFEFF) для корректной кодировки в Excel
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  