import { Updatedata } from './updatedata.js';

export default class ModalEdit {
  constructor(datas) {
    this.datas = datas;
    this.container = document.querySelector("#app");

    this.appendCustomStyles();
    this.renderModal();
  }

  appendCustomStyles() {
    const style = document.createElement("style");
    style.textContent = `
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }
      .error {
        color: red;
        font-size: 0.875rem;
      }
    `;
    document.head.appendChild(style);
  }

  renderModal() {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "modaleditdata";
    modal.tabIndex = -1;
    modal.setAttribute("data-bs-backdrop", "static");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.setAttribute("aria-labelledby", "modaleditdataLabel");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modaleditdataLabel">Edit Data</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formedit" class="form form-horizontal" enctype="multipart/form-data">
              <input type="hidden" id="msid" />

              ${this.createInputGroup("keterangan_edit", "Keterangan", "text", "keteranganError")}
              ${this.createRadioGroup("Hitung_edit", "Hitung", ["Y", "N"], "HitungError")}
              ${this.createRadioGroup("Rumus_edit", "Rumus", ["Y", "N"], "RumusError")}
              ${this.createRadioGroup("Aktif_edit", "Aktif", ["Y", "N"], "AktifError")}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="button" id="UpdateData" class="btn btn-info">Update</button>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(modal);

    const modalInstance = new bootstrap.Modal(document.getElementById('modaleditdata'));
    modalInstance.show();

    this.populateForm();
  }

  createInputGroup(id, label, type = "text", errorId = "") {
    return `
      <div class="mb-3 row">
        <label for="${id}" class="col-sm-4 col-form-label">${label}</label>
        <div class="col-sm-8">
          <input type="${type}" id="${id}" class="form-control" />
          <span id="${errorId}" class="error"></span>
        </div>
      </div>
    `;
  }

  createRadioGroup(name, label, values, errorId = "") {
    const radios = values.map(value => {
      const labelText = value === "Y" ? "Ya" : "Tidak";
      return `
        <div class="form-check form-check-inline">
          <input type="radio" name="${name}" value="${value}" id="${name}${labelText}" class="form-check-input" />
          <label for="${name}${labelText}" class="form-check-label">${labelText}</label>
        </div>
      `;
    }).join("");

    return `
      <div class="mb-3 row">
        <label class="col-sm-4 col-form-label">${label}</label>
        <div class="col-sm-8">
          ${radios}
          <br />
          <span id="${errorId}" class="error"></span>
        </div>
      </div>
    `;
  }

  populateForm() {
    const { id, keterangan, hitungan, rumus, status_aktif } = this.datas;

    $("#msid").val(id);
    $("#keterangan_edit").val(keterangan || '');

    $(`input[name="Hitung_edit"][value="${hitungan}"]`).prop("checked", true);
    $(`input[name="Rumus_edit"][value="${rumus}"]`).prop("checked", true);
    $(`input[name="Aktif_edit"][value="${status_aktif}"]`).prop("checked", true);
  }
}

// Submit event
$(document).on("click", "#UpdateData", function (event) {
  event.preventDefault();

  const msid       = $("#msid").val();
  const keterangan = $("#keterangan_edit").val().trim();
  const rumus      = $('input[name="Rumus_edit"]:checked').val();
  const hitung     = $('input[name="Hitung_edit"]:checked').val();
  const aktif      = $('input[name="Aktif_edit"]:checked').val();

  let isValid = true;

  if (!keterangan) {
    $("#keteranganError").text("Keterangan tidak boleh kosong.");
    $("#keterangan_edit").focus();
    isValid = false;
  }

  if (!rumus) {
    $("#RumusError").text("Silakan pilih salah satu opsi untuk Rumus.");
    isValid = false;
  }

  if (!hitung) {
    $("#HitungError").text("Silakan pilih salah satu opsi untuk Hitung.");
    isValid = false;
  }

  if (!aktif) {
    $("#AktifError").text("Silakan pilih salah satu opsi untuk Aktif.");
    isValid = false;
  }

  if (!isValid) return;

  const datas = {
    msid,
    keterangan,
    rumus,
    hitungan: hitung,
    aktif
  };

  Updatedata(datas);
});
