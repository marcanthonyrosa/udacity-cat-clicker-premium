var model = {
  currentCat: null,
  adminToggled: false,
  data: [
    {
      name: "Cat 1",
      id: "cat-1",
      count: 0,
      image: 'images/cat_picture1.jpg'
    },
    {
      name: "Cat 2",
      id: "cat-2",
      count: 0,
      image: 'images/cat_picture2.jpeg'
    },
    {
      name: "Cat 3",
      id: "cat-3",
      count: 0,
      image: 'images/cat_picture3.jpeg'
    },
    {
      name: "Cat 4",
      id: "cat-4",
      count: 0,
      image: 'images/cat_picture4.jpeg'
    },
    {
      name: "Cat 5",
      id: "cat-5",
      count: 0,
      image: 'images/cat_picture5.jpeg'
    }
  ]
};

var catListView = {
  loadCatList: function() {
    var catArray = model.data;
    var catList = $("#cat-list");
    for (var i = 0; i< catArray.length; i++) {
      var name = catArray[i].name;
      var catID = catArray[i].id;
      var id = 'id="' + catID +'"';
      catList.append('<li ' + id + '><a href="#">' + name + '</a></li>');
      $('#' + catArray[i].id).click((function(paramCopy) {
        return function() {
          octopus.onListClick(paramCopy);
        };
      })(catArray[i]));
    }
  }
};

var catDisplayView = {
  displayCat: function() {
    $("#cat-name").html(model.currentCat.name);
    $("#cat-image").attr("src", model.currentCat.image);
    $("#cat-count").html(model.currentCat.count);
  }
};


// on click, run onCatClick and pass in the right catInfo

var octopus = {
  init: function() {
    catListView.loadCatList();
    model.currentCat = model.data[0];
    catDisplayView.displayCat();
    $('#cat-image').click( (function() {
      return function() {
        octopus.increaseCount();
      };
    })());
    octopus.adminInit();
  },
  onListClick: function (stuff) {
    this.setCurrentCat(stuff);
    catDisplayView.displayCat(stuff);
    this.adminRefresh();
  },
  onImgClick: function() {
    this.increaseCount();
    // catDisplayView.render(model.currentCat);
    // this.adminRefresh();
  },
  increaseCount: function() {
    model.currentCat.count ++;
    catDisplayView.displayCat();
    this.adminRefresh();
  },
  setCurrentCat: function(catData) {
    model.currentCat = catData;
    console.log(model.currentCat);
  },
  adminInit: function() {
    $("#admin-button").click(function() {
      octopus.adminClick();
    });
  },
  adminClose: function() {
    model.adminToggled = false;
    $("#admin-form").empty();
  },
  adminOpen: function() {
    model.adminToggled = true;
    var catNow = model.currentCat;
    var formHTML = 'First Name <input type="text" id="form-name" value="'+ catNow.name +'"> <br> Img URL <input type="text" id="form-url" value="'+ catNow.image +'"> <br> # Clicks <input type="text" id="form-click" value="'+ catNow.count +'">';
    formHTML += '<br> <button id="admin-cancel">Cancel</button> <button id="admin-submit">Submit</button>';
    $("#admin-form").append(formHTML);
    $("#admin-submit").click(function() {
      octopus.adminSubmit();
    });
    $("#admin-cancel").click(function() {
      // do something
      octopus.adminClose();
    });
  },
  adminClick: function() {
    model.adminToggled = !model.adminToggled;
    if (model.adminToggled === true) {
      octopus.adminOpen();
      }
    else if (model.adminToggled === false) {
      octopus.adminClose();
      }
  },
  adminRefresh: function() {
    if (model.adminToggled === true) {
      $("#form-click").val(model.currentCat.count);
      $("#form-name").val(model.currentCat.name);
      $("#form-url").val(model.currentCat.image);
    }
  },
  adminSubmit: function() {
    var newName = $("#form-name").val();
    var newURL = $("#form-url").val();
    var newClick = $("#form-click").val();
    model.currentCat.name = newName;
    model.currentCat.image = newURL;
    model.currentCat.count = newClick;
    catDisplayView.displayCat();
  }

};

octopus.init();
