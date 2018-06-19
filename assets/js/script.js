
/*
	       				  MANZANA 5
	------------------------------------------
				Desenvolvido em CoffeeScript
 							por Fabiane Lima
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/audio.svg', 'assets/img/audio-off.svg'];

  preload = function(imgs) {
    var counter;
    counter = 0;
    $(imgs).each(function() {
      $('<img />').attr('src', this).appendTo('body').css({
        display: 'none'
      });
      return counter++;
    });
    if (counter === imgs.length) {
      $('main').css({
        opacity: '1'
      });
      return $('body').css({
        background: '#e7e7e7'
      });
    }
  };

  $(window).on('load', function() {
    return preload(imgs);
  });

  $(function() {
    var audio, clickarea, func, sets;
    sets = {
      sound: false,
      clickable: false
    };
    audio = {
      trilha: new Audio('assets/audio/trilha.mp3'),
      clique: new Audio('assets/audio/clique.mp3'),
      start: function() {
        if (sets.sound === true) {
          audio.trilha.volume = 0.6;
          audio.trilha.loop = true;
          audio.trilha.play();
          audio.clique.play();
          return $('.audio').fadeIn();
        }
      },
      audio: function() {
        audio.clique.play();
        if (sets.sound === false) {
          sets.sound = true;
          audio.trilha.play();
          return $('.audio').html('<img src="assets/img/audio.svg">');
        } else if (sets.sound === true) {
          sets.sound = false;
          audio.trilha.pause();
          return $('.audio').html('<img src="assets/img/audio-off.svg">');
        }
      }
    };
    clickarea = {
      pro: void 0,
      count: 0,
      ctrl: [],
      resp: [],
      data: [
        {
          txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [50, 30]
        }, {
          txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [20, 20]
        }, {
          txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [10, 30]
        }, {
          txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [30, 70]
        }, {
          txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [50, 50]
        }
      ],
      start: function() {
        var i, k, len, ref, results;
        if (sets.clickable === true) {
          $('.content').append('<div class="clickarea"></div>');
          ref = clickarea.data;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            i = ref[k];
            clickarea.resp.push(clickarea.data.indexOf(i));
            $('.clickarea').append('<div></div>');
            $('.clickarea div:nth-child(' + (clickarea.count + 1) + ')').css({
              top: clickarea.data[clickarea.count].pos[0] + '%',
              left: clickarea.data[clickarea.count].pos[1] + '%'
            });
            results.push(clickarea.count++);
          }
          return results;
        }
      },
      showC: function($el) {
        clickarea.ctrl.push($el.index());
        $el.css({
          pointerEvents: 'none',
          opacity: '0.6'
        });
        $('.dimmer').fadeIn();
        return $('.modal').html(clickarea.data[$el.index()].txt + '<button class="dismiss callend">Fechar</button>');
      },
      callEnd: function() {
        var i, j, k, len, ref, results;
        if (clickarea.ctrl.length !== clickarea.data.length) {
          return false;
        } else {
          ref = clickarea.ctrl;
          results = [];
          for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            if (clickarea.ctrl.indexOf(i) === clickarea.resp[j]) {
              results.push(setTimeout(function() {
                return func.end();
              }, 1000));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    };
    func = {
      help: function() {
        audio.clique.play();
        $('.dimmer').fadeIn();
        return $('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>');
      },
      info: function() {
        audio.clique.play();
        return $('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>');
      },
      end: function() {
        audio.clique.play();
        $('.dimmer').delay(1000).fadeIn();
        return $('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
      },
      dismiss: function() {
        audio.clique.play();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        sets.sound = false;
        audio.start();
        sets.clickable = true;
        clickarea.start();
        func.dismiss();
        return $('.content').fadeIn();
      }
    };
    $(document).on('click', '.audio', function() {
      return audio.audio();
    });
    $(document).on('click', '.clickarea *', function() {
      if (sets.clickable === true) {
        return clickarea.showC($(this));
      }
    });
    $(document).on('click', '.dismiss', function() {
      if (sets.clickable === true) {
        return clickarea.callEnd();
      }
    });
    $(document).on('click', '.start', function() {
      return func.start();
    });
    $(document).on('click', '.help', function() {
      return func.help();
    });
    $(document).on('click', '.info', function() {
      return func.info();
    });
    $(document).on('click', '.end', function() {
      return func.end();
    });
    $(document).on('click', '.dismiss', function() {
      return func.dismiss();
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
