
/*
	MANZANA v0.4
	----------------------------------------------
	Desenvolvido em CoffeeScript por Fabiane Lima

	Licença: https://opensource.org/licenses/MIT
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/help.svg', 'assets/img/audio.svg', 'assets/img/audio-off.svg'];

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
    var audio, clickarea, dragdrop, func, quiz, quizdrag, sets, slideshow, trueORfalse, vblocks;
    sets = {
      audio: false,
      clickarea: true,
      quiz: false,
      trueORfalse: false,
      slideshow: false,
      dragdrop: false,
      quizdrag: false,
      vblocks: false
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
          return $('.content').append('<button class="ic audio"></button>');
        }
      },
      audio: function() {
        audio.clique.play();
        if (sets.audio === false) {
          sets.audio = true;
          audio.trilha.play();
          return $('.audio').css({
            background: '#006c7f url(assets/img/audio.svg) no-repeat'
          });
        } else if (sets.audio === true) {
          sets.audio = false;
          audio.trilha.pause();
          return $('.audio').css({
            background: '#006c7f url(assets/img/audio-off.svg) no-repeat'
          });
        }
      }
    };
    clickarea = {
      pro: void 0,
      data: [
        {
          txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [50, 30],
          stt: false
        }, {
          txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [20, 20],
          stt: false
        }, {
          txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [10, 30],
          stt: false
        }, {
          txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [30, 70],
          stt: false
        }, {
          txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          pos: [50, 50],
          stt: false
        }
      ],
      start: function() {
        var i, j, l, len, ref, results;
        if (sets.clickarea === true) {
          $('.content').append('<div class="clickarea"></div><button class="end">Concluir</button>');
          ref = clickarea.data;
          results = [];
          for (j = l = 0, len = ref.length; l < len; j = ++l) {
            i = ref[j];
            $('.clickarea').append('<div></div>');
            results.push($('.clickarea div:nth-child(' + (j + 1) + ')').css({
              top: clickarea.data[j].pos[0] + '%',
              left: clickarea.data[j].pos[1] + '%'
            }));
          }
          return results;
        }
      },
      showC: function($el) {
        clickarea.data[$el.index()].stt = true;
        $el.css({
          pointerEvents: 'none',
          opacity: '0.6'
        });
        $('.dimmer').fadeIn();
        return $('.modal').html(clickarea.data[$el.index()].txt + '<button class="dismiss callend">Fechar</button>');
      },
      callEnd: function() {
        var i, k, l, len, ref, results;
        k = 0;
        ref = clickarea.data;
        results = [];
        for (l = 0, len = ref.length; l < len; l++) {
          i = ref[l];
          if (i.stt === true) {
            k++;
            if (k === clickarea.data.length) {
              results.push($('.end').fadeIn());
            } else {
              results.push(void 0);
            }
          } else {
            results.push(void 0);
          }
        }
        return results;
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
          var i, j, l, len, ref, results;
          ref = quiz.data[randy].alts;
          results = [];
          for (j = l = 0, len = ref.length; l < len; j = ++l) {
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
    trueORfalse = {
      count: 0,
      score: 0,
      alt: void 0,
      data: [
        {
          titl: 'Título da questão',
          text: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answ: true,
          feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        }, {
          titl: 'Título da questão',
          text: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answ: true,
          feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        }, {
          titl: 'Título da questão',
          text: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answ: false,
          feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        }, {
          titl: 'Título da questão',
          text: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answ: false,
          feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        }, {
          titl: 'Título da questão',
          text: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answ: true,
          feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        }
      ],
      start: function() {
        var i, j, l, len, ref, results;
        if (sets.trueORfalse === true) {
          $('.content').append('<div class="t-or-f"></div>');
          j = 0;
          func.dismiss();
          ref = trueORfalse.data;
          results = [];
          for (l = 0, len = ref.length; l < len; l++) {
            i = ref[l];
            $('.t-or-f').append('<section> <div class="txt"> <h1>' + trueORfalse.data[j].titl + '</h1> <p>' + trueORfalse.data[j].text + '</p> </div> <div class="ctrl"> <button class="true">verdadeiro</button> <button class="false">falso</button> </div> </section>');
            results.push(j++);
          }
          return results;
        }
      },
      verify: function($el) {
        $('.ctrl').css({
          pointerEvents: 'none'
        });
        if ($el.attr('class') === 'true') {
          trueORfalse.alt = true;
        } else if ($el.attr('class') === 'false') {
          trueORfalse.alt = false;
        }
        $('.dimmer').fadeIn();
        $('.modal').html('<h1></h1><p>' + trueORfalse.data[trueORfalse.count].feed + '</p><button class="nxt">Próxima</button>');
        if (trueORfalse.alt === trueORfalse.data[trueORfalse.count].answ) {
          trueORfalse.score++;
          return $('.modal h1').html('Resposta correta!');
        } else {
          return $('.modal h1').html('Resposta errada!');
        }
      },
      nxt: function() {
        trueORfalse.count++;
        if (trueORfalse.count < trueORfalse.data.length) {
          func.dismiss();
          $('.t-or-f .ctrl').css({
            pointerEvents: 'auto'
          });
          $('.t-or-f section:nth-child(' + trueORfalse.count + ')').fadeOut();
          return $('.t-or-f section:nth-child(' + (trueORfalse.count + 1) + ')').fadeIn();
        } else {
          return setTimeout(function() {
            return func.end();
          }, 500);
        }
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
        var i, j, l, len, ref, results;
        if (sets.slideshow === true) {
          $('.content').append('<div class="slideshow"> <div class="slides"></div> <div class="ctrl"> <button class="next">></button> <button class="prev"><</button> </div> </div>');
          ref = slideshow.data;
          results = [];
          for (j = l = 0, len = ref.length; l < len; j = ++l) {
            i = ref[j];
            results.push($('.slides').append('<section> <div>' + slideshow.data[j].txt + '</div> <img src="' + slideshow.data[j].img + '"> </section>'));
          }
          return results;
        }
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
    dragdrop = {
      count: 0,
      ctrl: [],
      endit: [],
      data: [['draggable 1', 'draggable 2', 'draggable 3', 'draggable 4', 'draggable 5', 'draggable 6'], ['draggable 1', 'draggable 2', 'draggable 3', 'draggable 4', 'draggable 5', 'draggable 6']],
      start: function() {
        var i, l, len, ref;
        if (sets.dragdrop === true) {
          $('.content').append('<div class="drag-drop"> <div class="draggie"></div> <div class="droppie"></div> </div>');
          func.dismiss();
          dragdrop.rNumber();
          ref = dragdrop.data[1];
          for (l = 0, len = ref.length; l < len; l++) {
            i = ref[l];
            $('.droppie').append('<div>' + i + '</div>');
          }
          dragdrop.draggie();
          return dragdrop.droppie();
        }
      },
      rNumber: function() {
        var randy;
        randy = Math.floor(Math.random() * dragdrop.data[0].length);
        if (dragdrop.ctrl.length < dragdrop.data[0].length) {
          if (dragdrop.ctrl.indexOf(randy) === -1) {
            dragdrop.ctrl.push(randy);
            $('.draggie').append('<div>' + dragdrop.data[0][randy] + '</div>');
          }
          return dragdrop.rNumber();
        }
      },
      draggie: function() {
        return $('.draggie').children().draggable({
          cursor: 'move',
          revert: function(event, ui) {
            this.data('uiDraggable').originalPosition = {
              top: 0,
              left: 0
            };
            return !event;
          }
        });
      },
      droppie: function() {
        return $('.droppie').children().droppable({
          tolerance: 'touch',
          accept: function(e) {
            if ($(this).html() === e.html()) {
              return true;
            }
          },
          drop: function(e, ui) {
            dragdrop.endit.push($(this).index());
            $('.ui-draggable-dragging').fadeOut();
            $(this).css({
              color: 'black',
              background: 'white',
              boxShadow: '0 0 0.5em rgba(0,0,0,0.6)'
            });
            if (dragdrop.endit.length === dragdrop.ctrl.length) {
              $('.draggie').fadeOut();
              return setTimeout(function() {
                return func.end();
              }, 800);
            }
          }
        });
      }
    };
    quizdrag = {
      alt: void 0,
      pro: void 0,
      num: void 0,
      ctrl: [],
      count: 0,
      score: 0,
      error: 0,
      inOrder: 1,
      paused: true,
      starttimer: void 0,
      data: [
        {
          enun: 'Lorem ipsum dolor sit amet',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 0
        }, {
          enun: 'Lorem ipsum dolor sit amet',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 1
        }, {
          enun: 'Lorem ipsum dolor sit amet',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 2
        }, {
          enun: 'Lorem ipsum dolor sit amet',
          alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
          answ: 3
        }
      ],
      rNumber: function() {
        quizdrag.randy = Math.floor(Math.random() * quizdrag.data.length);
        if (quizdrag.ctrl.length === quizdrag.data.length) {
          return quizdrag.num = true;
        } else if (quizdrag.ctrl.length < quizdrag.data.length) {
          if (quizdrag.ctrl.indexOf(quizdrag.randy) === -1) {
            quizdrag.ctrl.push(quizdrag.randy);
            $('.quizdrag .quizd').append('<section id="' + quizdrag.randy + '" class="q"> <div class="enun"> <p>' + quizdrag.data[quizdrag.randy].enun + '</p> </div> <div class="alts"><ul class="draggie"></ul></div> <div class="droppie"></div> </section>');
            quizdrag.pro = true;
          }
          quizdrag.putAlts(quizdrag.randy);
          quizdrag.rNumber();
          return quizdrag.goDrag();
        }
      },
      goDrag: function() {
        var checkPromise;
        return checkPromise = new Promise(function(resolve, reject) {
          if (quizdrag.num === true) {
            return resolve();
          } else {
            return reject();
          }
        }).then(function(fromResolve) {
          $('.droppie').fadeIn();
          quizdrag.draggie();
          quizdrag.droppie();
          return quizdrag.timer();
        })["catch"](function(fromReject) {});
      },
      draggie: function() {
        return $('.draggie').children().draggable({
          cursor: 'move',
          revert: function(event, ui) {
            this.data('uiDraggable').originalPosition = {
              top: 0,
              left: 0
            };
            return !event;
          }
        });
      },
      droppie: function() {
        return $('.droppie').droppable({
          tolerance: 'touch',
          accept: function(e) {
            if (quizdrag.data[quizdrag.count] !== void 0) {
              if (e.html() === quizdrag.data[quizdrag.count].alts[quizdrag.data[quizdrag.ctrl[quizdrag.count]].answ]) {
                return true;
              }
            }
          },
          drop: function(e, ui) {
            $('.ui-draggable-dragging, .droppie').fadeOut();
            quizdrag.alt = $(this).index();
            if (quizdrag.alt === quizdrag.data[quizdrag.ctrl[quizdrag.count]].answ) {
              quizdrag.score++;
            } else {
              quizdrag.error++;
            }
            quizdrag.count++;
            if (quizdrag.count < quizdrag.data.length) {
              func.dismiss();
              quizdrag.putAlts();
              return $('.quizdrag .quizd').animate({
                left: '-=100%'
              }, 1800, function() {
                return $('.droppie').fadeIn();
              });
            } else {
              quizdrag.paused = true;
              return func.end();
            }
          }
        });
      },
      start: function() {
        if (sets.quizdrag === true) {
          $('.content').append('<div class="quizdrag"> <div class="bar"> <div class="border"></div> <div class="innerbar"></div> </div> <div class="quizd"></div> </div>');
          return quizdrag.rNumber();
        }
      },
      putAlts: function(randy) {
        var testPromise;
        return testPromise = new Promise(function(resolve, reject) {
          if (quizdrag.pro === true) {
            return resolve();
          } else {
            return reject();
          }
        }).then(function(fromResolve) {
          var i, j, l, len, ref, results;
          ref = quizdrag.data[randy].alts;
          results = [];
          for (j = l = 0, len = ref.length; l < len; j = ++l) {
            i = ref[j];
            $('.quizdrag .quizd section:nth-child(' + quizdrag.inOrder + ') .alts ul').append('<li>' + i + '</li>');
            if (j === quizdrag.data[randy].alts.length - 1) {
              results.push(quizdrag.inOrder++);
            } else {
              results.push(void 0);
            }
          }
          return results;
        })["catch"](function(fromReject) {});
      },
      timer: function() {
        var s, starttimer;
        s = 60;
        return starttimer = setInterval(function() {
          if (quizdrag.paused !== true) {
            if (s > 0) {
              s--;
            }
            if (s <= 0) {
              s = 0;
              clearInterval(quizdrag.starttimer);
              $('.dimmer').fadeIn();
              $('.modal').html('<h1>Acabou o tempo!</h1><p>Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Jogar novamente</button>');
            }
            return $('.bar .innerbar').css({
              height: (100 / 60) * s + '%'
            });
          }
        }, 1000);
      }
    };
    vblocks = {
      data: [
        {
          tit: 'Título do quadro',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          tit: 'Título do quadro',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          tit: 'Título do quadro',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          tit: 'Título do quadro',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, {
          tit: 'Título do quadro',
          txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ],
      start: function() {
        var i, j, l, len, ref, results;
        if (sets.vblocks === true) {
          $('.content').css({
            overflowY: 'auto'
          });
          $('.content').append('<div class="vblocks"></div>');
          ref = vblocks.data;
          results = [];
          for (j = l = 0, len = ref.length; l < len; j = ++l) {
            i = ref[j];
            results.push($('.vblocks').append('<section id="b' + j + '"> <div> <h2>' + vblocks.data[j].tit + '</h2> </div> <div>' + vblocks.data[j].txt + '<button class="back"></button> </div> </section>'));
          }
          return results;
        }
      },
      showM: function($el) {
        $('.vblocks section div:nth-child(1)').fadeIn();
        return $('.vblocks section:nth-child(' + ($el.index() + 1) + ') div:nth-child(1)').fadeOut();
      },
      backIt: function() {
        return $('.vblocks section div:nth-child(1)').fadeIn();
      }
    };
    func = {
      status: false,
      help: function() {
        if (sets.quizdrag === true) {
          quizdrag.paused = true;
        }
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
        $('.modal p').html('Texto de feedback.');
        if (sets.quiz === true) {
          if (quiz.score > 1) {
            $('.modal h1').html('Você acertou ' + quiz.score + ' questões!');
          } else if (quiz.score < 1) {
            $('.modal h1').html('Você não acertou nenhuma questão!');
          } else {
            $('.modal h1').html('Você acertou uma questão!');
          }
        }
        if (sets.trueORfalse === true) {
          if (trueORfalse.score < 1) {
            return $('.modal h1').html('Você não acertou nenhuma questão!');
          } else if (trueORfalse.score > 1) {
            return $('.modal h1').html('Você acertou ' + trueORfalse.score + ' questões!');
          } else if (trueORfalse.score === 1) {
            return $('.modal h1').html('Você acertou uma questão!');
          }
        }
      },
      dismiss: function() {
        if (sets.quizdrag === true) {
          quizdrag.paused = false;
        }
        audio.clique.play();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        if (func.status === false) {
          func.status = true;
          $('.intro').fadeOut();
          return $('.modal').delay(300).fadeIn();
        } else {
          audio.start();
          clickarea.start();
          quiz.start();
          slideshow.start();
          trueORfalse.start();
          dragdrop.start();
          quizdrag.start();
          vblocks.start();
          func.dismiss();
          return $('.content').fadeIn();
        }
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
    $(document).on('click', '.true, .false', function() {
      if (sets.trueORfalse === true) {
        return trueORfalse.verify($(this));
      }
    });
    $(document).on('click', '.nxt', function() {
      if (sets.trueORfalse === true) {
        return trueORfalse.nxt();
      }
    });
    $(document).on('click', '.vblocks section div:nth-child(1)', function() {
      if (sets.vblocks === true) {
        return vblocks.showM($(this).parent());
      }
    });
    $(document).on('click', '.vblocks .back', function() {
      if (sets.vblocks === true) {
        return vblocks.backIt();
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
