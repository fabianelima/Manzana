
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
    var audio, clickarea, func, quiz, sets, slideshow;
    sets = {
      audio: false,
      clickarea: false,
      quiz: false,
      slideshow: true
    };
    audio = {
      trilha: new Audio('assets/audio/trilha.mp3'),
      clique: new Audio('assets/audio/clique.mp3'),
      start: function() {
        if (sets.audio === true) {
          audio.trilha.volume = 0.6;
          audio.trilha.loop = true;
          audio.trilha.play();
          audio.clique.play();
          return $('.audio').fadeIn();
        }
      },
      audio: function() {
        audio.clique.play();
        if (sets.audio === false) {
          sets.audio = true;
          audio.trilha.play();
          return $('.audio').html('<img src="assets/img/audio.svg">');
        } else if (sets.audio === true) {
          sets.audio = false;
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
        if (sets.clickarea === true) {
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
    quiz = {
      alt: void 0,
      pro: void 0,
      ctrl: [],
      count: 0,
      score: 0,
      error: 0,
      inOrder: 1,
      data: [
        {
          titl: 'Título da questão',
          enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 0,
          feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          titl: 'Título da questão',
          enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 1,
          feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          titl: 'Título da questão',
          enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 2,
          feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      ],
      rNumber: function() {
        quiz.randy = Math.floor(Math.random() * quiz.data.length);
        if (quiz.ctrl.length < quiz.data.length) {
          if (quiz.ctrl.indexOf(quiz.randy) === -1) {
            quiz.ctrl.push(quiz.randy);
            $('.quiz').append('<section id="' + quiz.randy + '" class="q"> <div class="enun"> <h1>' + (quiz.ctrl.indexOf(quiz.randy) + 1) + '. ' + quiz.data[quiz.randy].titl + '</h1> <p>' + quiz.data[quiz.randy].enun + '</p> </div> <div class="alts"><ul></ul></div> <button class="verify">Conferir</button> </section>');
            quiz.pro = true;
          } else {
            quiz.pro = false;
          }
          quiz.putAlts(quiz.randy);
          return quiz.rNumber();
        }
      },
      start: function() {
        if (sets.quiz === true) {
          $('.content').append('<div class="quiz"></div>');
          return quiz.rNumber();
        }
      },
      selectAlt: function($el) {
        quiz.alt = $el.index();
        $('.verify').css({
          pointerEvents: 'auto',
          opacity: '1'
        });
        $('.alts li').css({
          background: 'white',
          color: 'black'
        });
        return $el.css({
          background: '#006c7f',
          color: 'white'
        });
      },
      verify: function() {
        $('.dimmer').delay(500).fadeIn();
        $('.modal').html('<h1></h1><p>' + quiz.data[quiz.ctrl[quiz.count]].feed + '</p><button class="nxt">Prosseguir</button>');
        if (quiz.alt === quiz.data[quiz.ctrl[quiz.count]].answ) {
          quiz.score++;
          return $('.modal h1').html('Resposta certa!');
        } else {
          quiz.error++;
          return $('.modal h1').html('Resposta errada!');
        }
      },
      nxt: function() {
        quiz.count++;
        if (quiz.count < quiz.data.length) {
          func.dismiss();
          quiz.putAlts();
          $('.verify').css({
            pointerEvents: 'none',
            opacity: '0.6'
          });
          $('.quiz section:nth-child(' + quiz.count + ')').fadeOut();
          return $('.quiz section:nth-child(' + (quiz.count + 1) + ')').fadeIn();
        } else {
          return setTimeout(function() {
            return func.end();
          }, 400);
        }
      },
      putAlts: function(randy) {
        var testPromise;
        return testPromise = new Promise(function(resolve, reject) {
          if (quiz.pro === true) {
            return resolve();
          } else {
            return reject();
          }
        }).then(function(fromResolve) {
          var i, j, k, len, ref, results;
          ref = quiz.data[randy].alts;
          results = [];
          for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            $('.quiz section:nth-child(' + quiz.inOrder + ') .alts ul').append('<li>' + i + '</li>');
            if (j === quiz.data[randy].alts.length - 1) {
              results.push(quiz.inOrder++);
            } else {
              results.push(void 0);
            }
          }
          return results;
        })["catch"](function(fromReject) {});
      }
    };
    slideshow = {
      count: 0,
      data: [
        {
          img: 'assets/img/img1.png',
          txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }, {
          img: 'assets/img/img2.png',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          img: 'assets/img/img3.png',
          txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }, {
          img: 'assets/img/img4.png',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          img: 'assets/img/img5.png',
          txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ],
      start: function() {
        var i, j, k, len, ref, results;
        $('.content').append('<div class="slides"></div> <div class="ctrl"> <button class="next">></button> <button class="prev"><</button> </div>');
        ref = slideshow.data;
        results = [];
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
          i = ref[j];
          results.push($('.slides').append('<section> <div>' + slideshow.data[j].txt + '</div> <img src="' + slideshow.data[j].img + '"> </section>'));
        }
        return results;
      },
      slide: function($el) {
        if ($el.attr('class') === 'next') {
          slideshow.count++;
          $('.prev').css({
            pointerEvents: 'auto',
            opacity: '1'
          });
          if (slideshow.count < slideshow.data.length) {
            $('.slides section').fadeOut();
            $('.slides section:nth-child(' + (slideshow.count + 1) + ')').fadeIn();
          } else {
            func.end();
          }
        }
        if ($el.attr('class') === 'prev') {
          slideshow.count--;
          $('.slides section').fadeOut();
          $('.slides section:nth-child(' + (slideshow.count + 1) + ')').fadeIn();
          if (slideshow.count === 0) {
            return $('.prev').css({
              pointerEvents: 'none',
              opacity: '0.6'
            });
          }
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
        $('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
        if (sets.quiz === true) {
          if (quiz.score > 1) {
            $('.modal').html('<h1>Você acertou ' + quiz.score + ' questões!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
          } else if (quiz.score < 1) {
            $('.modal').html('<h1>Você não acertou nenhuma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
          } else {
            $('.modal').html('<h1>Você acertou uma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
          }
          return $('.modal p').html('Texto de feedback.');
        }
      },
      dismiss: function() {
        audio.clique.play();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        audio.start();
        clickarea.start();
        quiz.start();
        slideshow.start();
        func.dismiss();
        return $('.content').fadeIn();
      }
    };
    $(document).on('click', '.audio', function() {
      return audio.audio();
    });
    $(document).on('click', '.clickarea *', function() {
      if (sets.clickarea === true) {
        return clickarea.showC($(this));
      }
    });
    $(document).on('click', '.dismiss', function() {
      if (sets.clickarea === true) {
        return clickarea.callEnd();
      }
    });
    $(document).on('click', '.alts li', function() {
      if (sets.quiz === true) {
        return quiz.selectAlt($(this));
      }
    });
    $(document).on('click', '.verify', function() {
      if (sets.quiz === true) {
        return quiz.verify();
      }
    });
    $(document).on('click', '.nxt', function() {
      if (sets.quiz === true) {
        return quiz.nxt();
      }
    });
    $(document).on('click', '.ctrl *', function() {
      if (sets.slideshow === true) {
        return slideshow.slide($(this));
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
