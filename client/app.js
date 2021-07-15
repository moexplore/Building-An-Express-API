$(document).ready(function () {
  console.log($);
  let $nameInput = $("#name-input");
  let $msgInput = $("#msg-input");
  let $chirpContainer = $("#chirps");
  let $btn = $("#button");
  let $modalbox = $(".jqModal");
  let $modalName = $("#updateName");
  let $modalMsg = $("#updateMsg");
  let $saveBtn = $("#save");

  console.log($modalbox);

  $btn.click(() => {
    let postInfo = { name: $nameInput.val(), msg: $msgInput.val() };
    $.ajax({
      url: "/api/chirps",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify(postInfo),
    });

    $.get("/api/chirps/", (data, textStatus, jqXHR) => {
      let id = data.nextid - 1;
      let $chirpDiv = $(
        '<div class ="card d-flex justify-content-center mt-3"></div>'
      );
      let $editBtn = $(
        `<button class = 'card-footer text-black btn btn-success'>Edit Chirp</button>`
      );
      let $chirpName = $(
        `<div class ="card-header bg-primary text-white">${data[id].name}</div>`
      );
      let $chirpMsg = $(
        `<div class ="card-body d-flex justify-content-between align-items-center">${data[id].msg}</div>`
      );
      let $chirpFooter = $(
        '<div class= "card-footer d-flex justify-content-between"></div>'
      );

      let $chirpDelete = $(
        `<button type = 'button' class = ' card-footer text-black btn btn-danger ml-5'>` +
          "Delete Chirp" +
          `</button>`
      );
      $chirpDiv.appendTo($chirpContainer);
      $chirpName.appendTo($chirpDiv);
      $chirpMsg.appendTo($chirpDiv);
      $chirpFooter.appendTo($chirpDiv);
      $chirpDelete.prependTo($chirpFooter);
      $editBtn.prependTo($chirpFooter);
      $modalName.val(data[id].name);
      $modalMsg.val(data[id].msg);
      //data-toggle="modal" data-target="#exampleModal"
      $editBtn.attr("data-toggle", "modal");
      $editBtn.attr("data-target", "#editModal");

      $saveBtn.click(() => {
        $.ajax({
          url: `/api/chirps/${id}`,
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify({
            name: $modalName.val(),
            msg: $modalMsg.val(),
          }),
        });
        $chirpName.text($modalName.val());
        $chirpMsg.text($modalMsg.val());
      });

      //   $editBtn.click(() => {
      //     console.log(`Hey ${$modalbox}`);
      //     $modalbox.css("display: block");
      //   });

      $chirpDelete.click(() => {
        $.ajax({
          url: `/api/chirps/${id}`,
          method: "DELETE",
        });
        $chirpDiv.remove();
      });
    });
  });

  // let $chirpDiv = $('<div class ="card mt-3"></div>')
  //         let $chirpName = $(`<div class ="card-header bg-primary text-white">${$nameInput.val()}</div>`)
  //         let $chirpMsg = $(`<div class ="card-body d-flex justify-content-between align-items-center">${$msgInput.val()}</div>`)
  //         let $chirpDelete = $(`<button type = 'button' class = 'btn btn-danger ml-5'>` + 'Delete Chirp' + `</button>`)
  //          $chirpDiv.appendTo($chirpContainer)
  //          $chirpName.appendTo($chirpDiv)
  //          $chirpMsg.appendTo($chirpDiv)
  //          $chirpDelete.appendTo($chirpMsg)
  //          $chirpDelete.click(() => {
  //              alert('Hello')
  //          })
});
