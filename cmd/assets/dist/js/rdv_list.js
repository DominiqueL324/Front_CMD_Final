var pg = "";
var k = 0;
var max = 0;
var next = ""
var prev = ""
function getAllRdv() {
  $.ajax({
    type: "GET",
    url: rdv_add,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      var i = 1;
      max_ = Math.round(parseInt(response["count"]) / 10) + 1;
      next = response["next"]
      prev = response["previous"]
      $("#total").text(max_);
      $("#contentTableRdv").empty();
      response["results"].forEach((elt) => {
        var formattedDate = new Date(elt["date"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();
        var couleur;
        if (parseInt(elt["statut"]) == 1) {
          couleur = "rgb(241, 67, 67)";
        }
        if (parseInt(elt["statut"]) == 2) {
          couleur = "rgb(255, 166, 93)";
        }
        if (parseInt(elt["statut"]) == 3) {
          couleur = "rgb(93, 182, 255)";
        }
        if (parseInt(elt["statut"]) == 4) {
          couleur = "rgb(93, 255, 101)";
        }

        $("#contentTableRdv").append(
          '<tr style="background-color:' +
            couleur +
            '; color:white;">\
                        <td>' +
            i +
            "</td>\
                        <td>" +
            String(d).padStart(2, "0") +
            "/" +
            String(m).padStart(2, "0") +
            "/" +
            y +
            "</td>\
                        <td>" +
            elt["client"]["societe"] +
            "</td>\
                        <td>" +
            elt["ref_lot"] +
            "</td>\
                        <td>" +
            elt["ref_rdv_edl"] +
            '</td>\
                        <td>\
                            <span class="badge badge-success">' +
            elt["intervention"]["type"] +
            '</span>\
                        </td>\
                        <td>\
                            <span class="badge badge-primary">' +
            elt["propriete"]["type_propriete"]["type"] +
            "</span>\
                        </td>\
                        <td>\
                            <a  onclick='goWhereEdit(" +
            elt["id"] +
            ')\' ><i class="bi bi-pencil-square"style="color: rgb(0, 0, 0)"></i></a>&nbsp;<a onclick=\'goWhereEdit1(' +
            elt["id"] +
            ')\'><i class="fa fa-calendar" aria-hidden="true" style="color: rgb(136, 102, 119)"></i></a>\
                        </td>\
                    </tr>'
        );
        i++;
      });
    },
    error: function (response) {
      console.log(response);
    },
  });
}
$("#next").on("click", function () {
   if(next===null){
    alert("Derni??re page");
    return;
  }
  v = next.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }
  if (k <= max_) {
    k = k + 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  } else if (k == max_) {
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  } else {
    alert("Derni??re page");
    return;
  }
});
$("#prev").on("click", function () {
  if(prev===null){
    alert("Derni??re page");
    return;
  }
  v = prev.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }	
  if (k == 0) {
    alert("Premi??re page");
  }
  if (k < max_ && k > 0) {
    k = k - 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  }
  if (k == max_) {
    k = k - 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  }
});
function getPrev(url_) {
  code(url_);
}
function getNext() {
    if(next===null){
    alert("Derni??re page");
    return;
  } 
  v = next.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }
	
  if (i <= max_) {
    code(url);
  } else {
    alert("Derni??re page");
    return;
  }
}
function code(url_) {
  $.ajax({
    type: "GET",
    url: url_,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      var i = 1;
      max_ = Math.round(parseInt(response["count"]) / 10);
      next = response["next"]
      prev = response["previous"]
      $("#total").text(max_);
      $("#contentTableRdv").empty();
      response["results"].forEach((elt) => {
        var formattedDate = new Date(elt["date"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();

        var couleur;
        if (parseInt(elt["statut"]) == 1) {
          couleur = "rgb(241, 67, 67)";
        }
        if (parseInt(elt["statut"]) == 2) {
          couleur = "rgb(255, 166, 93)";
        }
        if (parseInt(elt["statut"]) == 3) {
          couleur = "rgb(93, 182, 255)";
        }
        if (parseInt(elt["statut"]) == 4) {
          couleur = "rgb(93, 255, 101)";
        }
        $("#contentTableRdv").append(
          '<tr style="background-color:' +
            couleur +
            '; color:white;">\
                        <td>' +
            i +
            "</td>\
                        <td>" +
            String(d).padStart(2, "0") +
            "/" +
            String(m).padStart(2, "0") +
            "/" +
            y +
            "</td>\
                        <td>" +
            elt["client"]["societe"] +
            "</td>\
                        <td>" +
            elt["ref_lot"] +
            "</td>\
                        <td>" +
            elt["ref_rdv_edl"] +
            '</td>\
                        <td>\
                            <span class="badge badge-success">' +
            elt["intervention"]["type"] +
            '</span>\
                        </td>\
                        <td>\
                            <span class="badge badge-primary">' +
            elt["propriete"]["type_propriete"]["type"] +
            "</span>\
                        </td>\
                        <td>\
                            <a onclick='goWhereEdit(" +
            elt["id"] +
            ')\' ><i class="bi bi-pencil-square"style="color: rgb(0, 0, 0)"></i></a>&nbsp;<a onclick=\'goWhereEdit1(' +
            elt["id"] +
            ')\'><i class="bi bi-eye" style="color: rgb(136, 102, 119)"></i></a>\
                        </td>\
                    </tr>'
        );
        i++;
      });
    },
    error: function (response) {
      console.log(response);
    },
  });
}
function goWhereEdit(id) {
  $.cookie("rdv_to_edit", id);
  window.location.replace("edit_rdv.html");
}
function goWhereEdit1(id) {
  $.cookie("rdv_to_edit", id);
  window.location.replace("plannification.html");
}
