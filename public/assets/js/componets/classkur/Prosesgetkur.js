import { baseUrl } from "../config.js";

export default class ProsesdataKurEdit{

    constructor(){
        this.renderdataprose();
    }
    

     renderdataprose(){
       let nopo =$("#nopo").val();
       let totalpib = $("#total").text().replace(/,/g, "").trim();

        const datas ={
        "nopo":nopo,
        "totolpib":totalpib
        }


        $.ajax({
            url: `${baseUrl}/router/seturl`,
            method: "POST",
            dataType: "json",
            data:datas,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            headers: { 'url': 'transkur/prosesgetkur' },

            success:(result)=>{
                $("#divproses").empty();
                this.setTableProsesKur(result);
                this.setTombolSubmit();
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Terjadi kesalahan saat menampilkan data."
                });
            }
        });
       

     }

setTombolSubmit() {
    // Buat elemen div baru
    let newDiv = document.createElement("div");
    newDiv.className = "col-md-10 text-end";

// Tombol Batal
  const btnBatal = document.createElement("button");
  btnBatal.className = "btn btn-secondary me-2"; // Jarak kanan
  btnBatal.id = "BatalData";
  btnBatal.textContent = "Batal";
    // Buat elemen button
    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.id = "SubmitData";
    button.textContent = "Simpan Data";

    // Masukkan button ke dalam div
     newDiv.appendChild(btnBatal);
    newDiv.appendChild(button);

    // Append div ke dalam parent div
    document.getElementById("itemTabel").appendChild(newDiv);
}

    
setTableProsesKur = (result) => {
    let divid = $("#itemTabel");
    divid.empty();

    let table = `
        <div style="overflow-x:auto;">
            <table class="table table-striped table-hover" id="table_kurdata">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Part Id</th>
                        <th>Description</th>
                        <th class="text-end">Qty</th>
                        <th>Unit</th>
                        <th class="text-end">Price</th>
                        <th class="text-end">Amount (USD)</th>
                        <th class="text-end">Kurs</th>
                        <th class="text-end">Hpp Awal</th>
                        <th class="text-end">Amount (RP)</th>
                        <th class="text-end">Kurs Akhir</th>
                        <th class="text-end">Amount Akhir (RP)</th>
                        <th class="text-end">Hpp Akhir</th>
                        <th class="text-end">Selisih Hpp</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateTableRows(result)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-end fw-bold">Total:</td>
                        ${this.generateTotalRow(result)}
                    </tr>
                    <tr>
                        ${this.generateTotalProsentase(result)}
                        <td colspan="11"></td>
                    </tr>
                </tfoot>
            </table>
        </div>`;

    divid.html(table);
}

generateTableRows(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return `<tr><td colspan="14" class="text-center">Tidak ada data</td></tr>`;
    }

    return data.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.Partid}</td>
            <td>${item.PartName}</td>
            <td class="text-end">${item.Qty}</td>
            <td class="text-center">${item.Unit}</td>
            <td class="text-end">${item.Price}</td>
            <td class="text-end">${item.Amount_USD}</td>
            <td class="text-end">${item.Kurs}</td>
            <td class="text-end" id="${item.Hpp_Awal}">${Math.round(Number(item.Hpp_Awal || 0))}</td>
            <td class="text-end">${item.Amount_Rp}</td>
            <td class="text-end" id="${item.kur_akhir}">${Math.round(Number(item.kur_akhir || 0))}</td>
            <td class="text-end">${item.Amount_RpAkhir}</td>
            <td class="text-end" id="${item.Hpp_Akhir}">${Math.round(Number(item.Hpp_Akhir || 0))}</td>
            <td class="text-end" id="${item.Selisih_Hpp}">${Math.round(Number(item.Selisih_Hpp || 0))}</td>
        </tr>
    `).join('');
}

      

     generateTotalRow(result){
    if (!Array.isArray(result)) return `<td colspan="8">Tidak ada data</td>`;
        let total_usd='';
        let total_rp='';
        let total_qty='';
        let total_amountakhir='';
        result.forEach(element => {
             total_usd =element.Total_amount_USD;
             total_rp  =element.Total_amount_Rp;
             total_qty = element.Total_Qty;
             total_amountakhir=element.Total_amount_Rpakhir;
        });
        let newrow =`
            <td class="text-end"></td>
            <td></td>
            <td></td>
            <td class="text-end" id="total_usd">${total_usd}</td>
            <td></td>
            <td></td>
            <td class="text-end" id="total_rp">${total_rp}</td>
            <td></td>
            <td class="text-end" id="total_amountakhir">${total_amountakhir}</td>
            <td></td>
            <td></td>
        `;
        return newrow;
     }


     generateTotalProsentase(result){
            if (!Array.isArray(result)) return `<td colspan="3">Tidak ada data</td>`;
            let total_Prosentase=""
              result.forEach(element => {
             total_Prosentase =element.Prosentase;
              });
                let newrow =`<td colspan="3" id="total_Prosentase" class="text-end">${total_Prosentase}</td>`;
            return  newrow;
     }

}