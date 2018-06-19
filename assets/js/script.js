
/*
	       				OA TEMPLATE 4.5
	------------------------------------------
				Desenvolvido em CoffeeScript

						Código: Fabiane Lima
	 Ilustração: André Kranz e Eduardo Stumpf
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
    var audio, data, func, sound;
    sound = false;
    data = [];
    audio = {
      trilha: new Audio('assets/audio/trilha.mp3'),
      clique: new Audio('assets/audio/clique.mp3'),
      audio: function() {
        audio.clique.play();
        if (sound === false) {
          sound = true;
          audio.trilha.play();
          return $('.audio').html('<img src="assets/img/audio.svg">');
        } else if (sound === true) {
          sound = false;
          audio.trilha.pause();
          return $('.audio').html('<img src="assets/img/audio-off.svg">');
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
        func.dismiss();
        sound = true;
        audio.trilha.volume = 0.6;
        audio.trilha.loop = true;
        audio.trilha.play();
        audio.clique.play();
        return $('.content').fadeIn();
      }
    };
    $(document).on('click', '.audio', function() {
      return audio.audio();
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
