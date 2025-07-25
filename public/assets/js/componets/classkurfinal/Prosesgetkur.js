import { baseUrl } from "../config.js";

export default class ProsesdataKur{

    constructor(){
        this.renderdataprose();
        this.appendCustomStyles();
    }
    
      appendCustomStyles() {
        const style = document.createElement("style");
        style.textContent = `
              table td, table th {
                font-size: 12px;
            }
        
               th, td {
                text-align: center;
                vertical-align: middle;
                }

         #thead{
            background-color:#E7CEA6 !important;
            /* font-size: 8px;
            font-weight: 100 !important; */
            /*color :#000000 !important;*/
        }
        `;
        document.head.appendChild(style);
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
            <table class="table table-striped table-hover table-bordered" id="table_kurdata">
            <thead id="thead">
                <tr>
                    <th rowspan="2">No</th>
                    <th rowspan="2">Item no</th>
                    <th rowspan="2" class="text-start">Description</th>
                    <th rowspan="2" class="text-end">Qty</th>
                    <th rowspan="2" class="text-center">Unit</th>
                    <th colspan="2">PO (USD)</th>
                    <th rowspan="2" class="text-end">Kurs PO</th>
                    <th colspan="2">PO (IDR)</th>
                    <th rowspan="2" class="text-end">Kurs Landed</th>
                    <th colspan="2">LANDED (IDR)</th>
                    <th rowspan="2" class="text-end">+/-</th>
                </tr>
                <tr>
                   
                    <th class="text-center">Price Unit</th>
                    <th class="text-end">Amount</th>
                    <th class="text-end">Price Unit</th>
                    <th class="text-end">Amount</th>
                    <th class="text-end">Amount</th>
                    <th class="text-end">HPP Unit</th>
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
                        <td colspan="3" class="text-end fw-bold" class"text-end fw-bold">PROSENTASE KENAIKAN HARGA LANDED :</td>
                        ${this.generateTotalProsentase(result)}
                       
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
            <td class="text-start">${item.PartName}</td>
            <td class="text-end">${item.Qty}</td>
            <td class="text-center">${item.Unit}</td>
            <td class="text-end">${item.Price}</td>
            <td class="text-end">${item.Amount_USD}</td>
            <td class="text-end" >${item.Kurs}</td>
            <td class="text-end " id="${item.Hpp_Awal}">${parseFloat(item.Hpp_Awal).toFixed(2)}</td>
            <td class="text-end">${item.Amount_Rp}</td>
            <td class="text-end" id="${item.kur_akhir}">${item.kur_akhirtampil}</td>
            <td class="text-end" id="${item.Amount_RpAkhir}">${item.Amount_RpAkhirTampil}</td>
            <td class="text-end" id="${item.Hpp_Akhir}">${item.Hpp_AkhirTampil}</td>
            <td class="text-end" id="${item.Selisih_Hpp}">${item.Selisih_HppTampil}</td>
        </tr>
    `).join('');
}

    setpaselhilangdesimal(data){
        let kurs = parseFloat(data).toFixed(2);
        let formatted = Number(kurs).toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
       return formatted; // Contoh hasil: 12.345,67

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
            if (!Array.isArray(result)) return `<td >Tidak ada data</td>`;
            let total_Prosentase=""
              result.forEach(element => {
             total_Prosentase =element.Prosentase;
              });
                let newrow =`<td  id="total_Prosentase" class="text-start">${total_Prosentase}</td>`;
            return  newrow;
     }

}