function addTable() {
    const container = document.getElementById("tablesContainer");

    const tableDiv = document.createElement("div");
    tableDiv.className = "table-block";
    tableDiv.style.border = "1px solid #ccc";
    tableDiv.style.padding = "10px";
    tableDiv.style.marginBottom = "20px";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const tableTitle = document.createElement("h3");
    tableTitle.innerText = "Новая таблица";
    header.appendChild(tableTitle);

    const deleteTableBtn = document.createElement("button");
    deleteTableBtn.innerText = "Удалить таблицу";
    deleteTableBtn.onclick = () => tableDiv.remove();
    header.appendChild(deleteTableBtn);

    tableDiv.appendChild(header);

    const nameLabel = document.createElement("label");
    nameLabel.innerText = "Системное имя таблицы:";
    tableDiv.appendChild(nameLabel);
    tableDiv.appendChild(document.createElement("br"));

    const tableNameInput = document.createElement("input");
    tableNameInput.type = "text";
    tableNameInput.className = "table-name";
    tableDiv.appendChild(tableNameInput);
    tableDiv.appendChild(document.createElement("br"));

    const descLabel = document.createElement("label");
    descLabel.innerText = "Описание таблицы:";
    tableDiv.appendChild(descLabel);
    tableDiv.appendChild(document.createElement("br"));

    const tableDescInput = document.createElement("input");
    tableDescInput.type = "text";
    tableDescInput.className = "table-desc";
    tableDiv.appendChild(tableDescInput);
    tableDiv.appendChild(document.createElement("br"));

    const attrContainer = document.createElement("div");
    attrContainer.className = "attr-container";
    tableDiv.appendChild(attrContainer);

    const addAttrBtn = document.createElement("button");
    addAttrBtn.type = "button";
    addAttrBtn.innerText = "Добавить атрибут";
    addAttrBtn.onclick = () => addAttribute(attrContainer);
    tableDiv.appendChild(addAttrBtn);

    container.appendChild(tableDiv);
}

function addAttribute(container) {
    const div = document.createElement("div");
    div.className = "attribute";
    div.style.marginTop = "10px";
    div.style.padding = "5px";
    div.style.borderLeft = "2px solid #ddd";

    const name = document.createElement("input");
    name.placeholder = "Системное имя атрибута";
    name.className = "attr-name";
    name.style.marginRight = "10px";

    const desc = document.createElement("input");
    desc.placeholder = "Описание атрибута";
    desc.className = "attr-desc";
    desc.style.marginRight = "10px";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.innerText = "Удалить";
    delBtn.onclick = () => div.remove();

    div.appendChild(name);
    div.appendChild(desc);
    div.appendChild(delBtn);

    container.appendChild(div);
}

function saveCSV() {
    const dataProduct = document.getElementById("dataProductSelect").value;
    if (!dataProduct) {
        alert("Выберите код дата-продукта.");
        return;
    }

    const tables = document.getElementsByClassName("table-block");
    const sep = ";";
    let csv = `data_product${sep}table_name${sep}table_description${sep}attribute_name${sep}attribute_description\n`;

    let hasEmptyAttr = false;
    let hasTableWithoutAttrs = false;

    for (const t of tables) {
        const tableName = t.querySelector(".table-name").value.trim();
        const tableDesc = t.querySelector(".table-desc").value.trim();

        if (!tableName || !tableDesc) {
            alert("У одной из таблиц не заполнено имя или описание.");
            return;
        }

        const attrs = t.querySelectorAll(".attribute");
        let hasValidAttr = false;

        for (const a of attrs) {
            const nameInput = a.querySelector(".attr-name");
            const descInput = a.querySelector(".attr-desc");

            const attrName = nameInput.value.trim();
            const attrDesc = descInput.value.trim();

            if (attrName === "" || attrDesc === "") {
                hasEmptyAttr = true;
            } else {
                hasValidAttr = true;
                const row = [
                    dataProduct,
                    tableName,
                    tableDesc,
                    attrName,
                    attrDesc
                ]
                    .map((val) => `"${val.replace(/"/g, '""')}"`)
                    .join(sep);
                csv += row + "\n";
            }
        }

        if (!hasValidAttr) {
            hasTableWithoutAttrs = true;
        }
    }

    if (hasEmptyAttr) {
        alert("У одного или нескольких атрибутов не заполнено имя или описание.");
        return;
    }

    if (hasTableWithoutAttrs) {
        alert("Одна или несколько таблиц не содержат ни одного заполненного атрибута.");
        return;
    }

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
