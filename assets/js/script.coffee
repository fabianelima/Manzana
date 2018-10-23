###
	MANZANA v0.4
	----------------------------------------------
	Desenvolvido em CoffeeScript por Fabiane Lima

	Licença: https://opensource.org/licenses/MIT
###

# ----- Pré-carregamento das imagens ----- #
imgs =	[
	'assets/img/help.svg'
	'assets/img/audio.svg'
	'assets/img/audio-off.svg'
]

preload = (imgs) ->
	counter = 0

	$(imgs).each ->
		$('<img />').attr('src', this).appendTo('body').css { display: 'none' }
		counter++

	if counter is imgs.length
		$('main').css { opacity: '1' }
		$('body').css { background: '#e7e7e7' }

$(window).on 'load', -> preload(imgs)


# ----- Módulos e opções ----- #
$ ->
	sets =
		audio: false
		clickarea: false
		quiz: false
		trueORfalse: false
		slideshow: false
		dragdrop: false
		quizdrag: true
		vblocks: false

	audio =
		trilha: new Audio('assets/audio/trilha.mp3')
		clique: new Audio('assets/audio/clique.mp3')

		start: ->
			if sets.audio is true
				audio.trilha.volume = 0.6
				audio.trilha.loop = true
				audio.trilha.play()
				audio.clique.play()
				$('.content').append('<button class="ic audio"></button>')

		audio: ->
			audio.clique.play()

			if sets.audio is false
				sets.audio = true
				audio.trilha.play()
				$('.audio').css { background: '#006c7f url(assets/img/audio.svg) no-repeat' }

			else if sets.audio is true
				sets.audio = false
				audio.trilha.pause()
				$('.audio').css { background: '#006c7f url(assets/img/audio-off.svg) no-repeat' }

	clickarea =
		pro: undefined
		data:	[
			{
				txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [50, 30]
				stt: false
			}
			{
				txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [20, 20]
				stt: false
			}
			{
				txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [10, 30]
				stt: false
			}
			{
				txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [30, 70]
				stt: false
			}
			{
				txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [50, 50]
				stt: false
			}]

		start: ->
			if sets.clickarea is true
				$('.content').append('<div class="clickarea"></div><button class="end">Concluir</button>')

				for i, j in clickarea.data
					$('.clickarea').append('<div></div>')
					$('.clickarea div:nth-child(' + (j + 1) + ')').css
						top: clickarea.data[j].pos[0] + '%'
						left: clickarea.data[j].pos[1] + '%'

		showC: ($el) ->
			clickarea.data[$el.index()].stt = true
			$el.css { pointerEvents: 'none', opacity: '0.6' }

			$('.dimmer').fadeIn()
			$('.modal').html(clickarea.data[$el.index()].txt + '<button class="dismiss callend">Fechar</button>')

		callEnd: ->
			k = 0
			for i in clickarea.data
				if i.stt is true
					k++
					if k is clickarea.data.length
						$('.end').fadeIn()

	quiz =
		alt: undefined
		pro: undefined
		ctrl: []
		count: 0
		score: 0
		error: 0
		inOrder: 1
		data:	[
					{
						titl: 'Título da questão'
						enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 0
						feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					}
					{
						titl: 'Título da questão'
						enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 1
						feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					}
					{
						titl: 'Título da questão'
						enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 2
						feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					}
				]

		rNumber: ->
			quiz.randy = Math.floor(Math.random() * quiz.data.length)

			if quiz.ctrl.length < quiz.data.length
				if quiz.ctrl.indexOf(quiz.randy) is -1
					quiz.ctrl.push quiz.randy
					$('.quiz').append('
						<section id="' + quiz.randy + '" class="q">
							<div class="enun">
								<h1>' + (quiz.ctrl.indexOf(quiz.randy) + 1) + '. ' + quiz.data[quiz.randy].titl + '</h1>
								<p>' + quiz.data[quiz.randy].enun + '</p>
							</div>
							<div class="alts"><ul></ul></div>
							<button class="verify">Conferir</button>
						</section>
					')
					quiz.pro = true
				else quiz.pro = false

				quiz.putAlts(quiz.randy)
				quiz.rNumber()

		start: ->
			if sets.quiz is true
				$('.content').append('<div class="quiz"></div>')
				quiz.rNumber()

		selectAlt: ($el) ->
			quiz.alt = $el.index()
			$('.verify').css { pointerEvents: 'auto', opacity: '1' }
			$('.alts li').css { background: 'white', color: 'black' }
			$el.css { background: '#006c7f', color: 'white' }

		verify: ->
			$('.dimmer').delay(500).fadeIn()
			$('.modal').html('<h1></h1><p>' + quiz.data[quiz.ctrl[quiz.count]].feed + '</p><button class="nxt">Prosseguir</button>')

			if quiz.alt is quiz.data[quiz.ctrl[quiz.count]].answ
				quiz.score++
				$('.modal h1').html('Resposta certa!')

			else
				quiz.error++
				$('.modal h1').html('Resposta errada!')

		nxt: ->
			quiz.count++

			if quiz.count < quiz.data.length
				func.dismiss()
				quiz.putAlts()
				$('.verify').css { pointerEvents: 'none', opacity: '0.6' }
				$('.quiz section:nth-child(' + quiz.count + ')').fadeOut()
				$('.quiz section:nth-child(' + (quiz.count + 1) + ')').fadeIn()

			else
				setTimeout ->
					func.end()
				, 400

		putAlts: (randy) ->
			testPromise = new Promise (resolve, reject) ->
				if quiz.pro is true then resolve()
				else reject()

			.then (fromResolve) ->
				for i, j in quiz.data[randy].alts
					$('.quiz section:nth-child(' + quiz.inOrder + ') .alts ul').append('<li>' + i + '</li>')

					if j is quiz.data[randy].alts.length - 1 then quiz.inOrder++

			.catch (fromReject) -> return

	trueORfalse =
		count: 0
		score: 0
		alt: undefined
		data:	[
					{
						titl: 'Título da questão'
						text: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						answ: true
						feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
					}
					{
						titl: 'Título da questão'
						text: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						answ: true
						feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
					}
					{
						titl: 'Título da questão'
						text: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						answ: false
						feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
					}
					{
						titl: 'Título da questão'
						text: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						answ: false
						feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
					}
					{
						titl: 'Título da questão'
						text: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
						answ: true
						feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
					}
				]

		start: ->
			if sets.trueORfalse is true
				$('.content').append('<div class="t-or-f"></div>')

				j = 0
				func.dismiss()

				for i in trueORfalse.data
					$('.t-or-f').append('
						<section>
							<div class="txt">
								<h1>' + trueORfalse.data[j].titl + '</h1>
								<p>' + trueORfalse.data[j].text + '</p>
							</div>
							<div class="ctrl">
								<button class="true">verdadeiro</button>
								<button class="false">falso</button>
							</div>
						</section>
					')
					j++

		verify: ($el) ->
			$('.ctrl').css { pointerEvents: 'none' }

			if $el.attr('class') is 'true' then trueORfalse.alt = true
			else if $el.attr('class') is 'false' then trueORfalse.alt = false

			$('.dimmer').fadeIn()
			$('.modal').html('<h1></h1><p>' + trueORfalse.data[trueORfalse.count].feed + '</p><button class="nxt">Próxima</button>')

			if trueORfalse.alt is trueORfalse.data[trueORfalse.count].answ
				trueORfalse.score++
				$('.modal h1').html('Resposta correta!')

			else $('.modal h1').html('Resposta errada!')

		nxt: ->
			trueORfalse.count++

			if trueORfalse.count < trueORfalse.data.length
				func.dismiss()
				$('.t-or-f .ctrl').css { pointerEvents: 'auto' }
				$('.t-or-f section:nth-child(' + trueORfalse.count + ')').fadeOut()
				$('.t-or-f section:nth-child(' + (trueORfalse.count + 1) + ')').fadeIn()

			else
				setTimeout ->
					func.end()
				, 500

	slideshow =
		count: 0
		data: [
			{
				img: 'assets/img/img1.png'
				txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			}
			{
				img: 'assets/img/img2.png'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				img: 'assets/img/img3.png'
				txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			}
			{
				img: 'assets/img/img4.png'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				img: 'assets/img/img5.png'
				txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			}
		]

		start: ->
			if sets.slideshow is true
				$('.content').append('
				<div class="slideshow">
					<div class="slides"></div>
					<div class="ctrl">
						<button class="next">></button>
						<button class="prev"><</button>
					</div>
				</div>')

				for i, j in slideshow.data
					$('.slides').append('
						<section>
							<div>' + slideshow.data[j].txt + '</div>
							<img src="' + slideshow.data[j].img + '">
						</section>
					')

		slide: ($el) ->
			if $el.attr('class') is 'next'
				slideshow.count++
				$('.prev').css { pointerEvents: 'auto', opacity: '1' }

				if slideshow.count < slideshow.data.length
					$('.slides section').fadeOut()
					$('.slides section:nth-child(' + (slideshow.count + 1) + ')').fadeIn()
				else func.end()

			if $el.attr('class') is 'prev'
				slideshow.count--
				$('.slides section').fadeOut()
				$('.slides section:nth-child(' + (slideshow.count + 1) + ')').fadeIn()

				if slideshow.count is 0 then $('.prev').css { pointerEvents: 'none', opacity: '0.6' }

	dragdrop =
		count: 0
		ctrl: []
		endit: []
		data:	[
					[
						'draggable 1'
						'draggable 2'
						'draggable 3'
						'draggable 4'
						'draggable 5'
						'draggable 6'
					]
					[
						'draggable 1'
						'draggable 2'
						'draggable 3'
						'draggable 4'
						'draggable 5'
						'draggable 6'
					]
				]

		start: ->
			if sets.dragdrop is true
				$('.content').append('
					<div class="drag-drop">
						<div class="draggie"></div>
						<div class="droppie"></div>
					</div>')

				func.dismiss()
				dragdrop.rNumber()

				for i in dragdrop.data[1]
					$('.droppie').append('<div>' + i + '</div>')

				dragdrop.draggie()
				dragdrop.droppie()

		rNumber: ->
			randy = Math.floor(Math.random() * dragdrop.data[0].length)

			if dragdrop.ctrl.length < dragdrop.data[0].length
				if dragdrop.ctrl.indexOf(randy) is -1
					dragdrop.ctrl.push randy
					$('.draggie').append('
						<div>' + dragdrop.data[0][randy] + '</div>
					')

				dragdrop.rNumber()

		draggie: ->
			$('.draggie').children().draggable
				cursor: 'move'
				revert: (event, ui) ->
					this.data('uiDraggable').originalPosition =
						top: 0
						left: 0
					!event

		droppie: ->
			$('.droppie').children().droppable
				tolerance: 'touch'
				accept: (e) ->
					if $(this).html() is e.html() then return true

				drop: (e, ui) ->
					dragdrop.endit.push $(this).index()
					$('.ui-draggable-dragging').fadeOut()
					$(this).css
						color: 'black'
						background: 'white'
						boxShadow: '0 0 0.5em rgba(0,0,0,0.6)'

					if dragdrop.endit.length is dragdrop.ctrl.length
						$('.draggie').fadeOut()

						setTimeout ->
							func.end()
						, 800

	quizdrag =
		alt: undefined
		pro: undefined
		num: undefined
		ctrl: []
		count: 0
		score: 0
		error: 0
		inOrder: 1
		paused: true
		starttimer: undefined
		data:	[
					{
						enun: 'Lorem ipsum dolor sit amet'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 0
					}
					{
						enun: 'Lorem ipsum dolor sit amet'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 1
					}
					{
						enun: 'Lorem ipsum dolor sit amet'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 2
					}
					{
						enun: 'Lorem ipsum dolor sit amet'
						alts: 	[
									'Alternativa 1'
									'Alternativa 2'
									'Alternativa 3'
									'Alternativa 4'
								]
						answ: 3
					}
				]

		rNumber: ->
			quizdrag.randy = Math.floor(Math.random() * quizdrag.data.length)

			if quizdrag.ctrl.length is quizdrag.data.length then quizdrag.num = true
			else if quizdrag.ctrl.length < quizdrag.data.length
				if quizdrag.ctrl.indexOf(quizdrag.randy) is -1
					quizdrag.ctrl.push quizdrag.randy
					$('.quizdrag .quizd').append('
						<section id="' + quizdrag.randy + '" class="q">
							<div class="enun">
								<p>' + quizdrag.data[quizdrag.randy].enun + '</p>
							</div>
							<div class="alts"><ul class="draggie"></ul></div>
							<div class="droppie"></div>
						</section>
					')
					quizdrag.pro = true

				quizdrag.putAlts(quizdrag.randy)
				quizdrag.rNumber()
				quizdrag.goDrag()

		goDrag: ->
			checkPromise = new Promise (resolve, reject) ->
				if quizdrag.num is true then resolve()
				else reject()

			.then (fromResolve) ->
				$('.droppie').fadeIn()
				quizdrag.draggie()
				quizdrag.droppie()
				quizdrag.timer()

			.catch (fromReject) -> return

		draggie: ->
			$('.draggie').children().draggable
				cursor: 'move'
				revert: (event, ui) ->
					if !event then quizdrag.error++
					this.data('uiDraggable').originalPosition =
						top: 0
						left: 0
					!event

		droppie: ->
			$('.droppie').droppable
				tolerance: 'touch'
				accept: (e) ->
					if quizdrag.data[quizdrag.count] isnt undefined
						if e.html() is quizdrag.data[quizdrag.count].alts[quizdrag.data[quizdrag.ctrl[quizdrag.count]].answ] then return true

				drop: (e, ui) ->
					$('.ui-draggable-dragging, .droppie').fadeOut()
					quizdrag.alt = $(this).index()
					quizdrag.score++
					quizdrag.count++

					if quizdrag.count < quizdrag.data.length
						func.dismiss()
						quizdrag.putAlts()

						$('.quizdrag .quizd').animate { left: '-=100%' }, 1800, -> $('.droppie').fadeIn()

					else
						quizdrag.paused = true
						func.end()

		start: ->
			if sets.quizdrag is true
				$('.content').append('
					<div class="quizdrag">
						<div class="bar">
							<div class="border"></div>
							<div class="innerbar"></div>
						</div>
						<div class="quizd"></div>
					</div>')
				quizdrag.rNumber()

		putAlts: (randy) ->
			testPromise = new Promise (resolve, reject) ->
				if quizdrag.pro is true then resolve()
				else reject()

			.then (fromResolve) ->
				for i, j in quizdrag.data[randy].alts
					$('.quizdrag .quizd section:nth-child(' + quizdrag.inOrder + ') .alts ul').append('<li>' + i + '</li>')

					if j is quizdrag.data[randy].alts.length - 1 then quizdrag.inOrder++

			.catch (fromReject) -> return

		timer: ->
			s = 60
			starttimer = setInterval ->
				if s isnt 0
					if quizdrag.paused isnt true
						if s > 0 then s--
						if s <= 0
							s = 0
							clearInterval(quizdrag.starttimer)

							$('.dimmer').fadeIn()
							$('.modal').html('<h1>Acabou o tempo!</h1><p>Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Jogar novamente</button>')

						$('.bar .innerbar').css { height: (100 / 60) * s + '%' }
			, 1000

	vblocks =
		data: [
			{
				tit: 'Título do quadro'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				tit: 'Título do quadro'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				tit: 'Título do quadro'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				tit: 'Título do quadro'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
			{
				tit: 'Título do quadro'
				txt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			}
		]

		start: ->
			if sets.vblocks is true
				$('.content').css { overflowY: 'auto' }
				$('.content').append('<div class="vblocks"></div>')

				for i, j in vblocks.data
					$('.vblocks').append('
						<section id="b' + j + '">
							<div>
								<h2>' + vblocks.data[j].tit + '</h2>
							</div>
							<div>
								' + vblocks.data[j].txt + '
								<button class="back"></button>
							</div>
						</section>
					')

		showM: ($el) ->
			$('.vblocks section div:nth-child(1)').fadeIn()
			$('.vblocks section:nth-child(' + ($el.index() + 1) + ') div:nth-child(1)').fadeOut()

		backIt: ->
			$('.vblocks section div:nth-child(1)').fadeIn()

	func =
		status: false
		help: ->
			if sets.quizdrag is true then quizdrag.paused = true
			audio.clique.play()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>')

		info: ->
			audio.clique.play()
			$('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>')

		end: ->
			audio.clique.play()
			$('.dimmer').delay(1000).fadeIn()
			$('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')
			$('.modal p').html('Texto de feedback.')

			if sets.quiz is true	# melhorar isso
				if quiz.score > 1 then $('.modal h1').html('Você acertou ' + quiz.score + ' questões!')
				else if quiz.score < 1 then $('.modal h1').html('Você não acertou nenhuma questão!')
				else $('.modal h1').html('Você acertou uma questão!')

			if sets.trueORfalse is true
				if trueORfalse.score < 1 then $('.modal h1').html('Você não acertou nenhuma questão!')
				else if trueORfalse.score > 1 then $('.modal h1').html('Você acertou ' + trueORfalse.score + ' questões!')
				else if trueORfalse.score is 1 then $('.modal h1').html('Você acertou uma questão!')

		dismiss: ->
			if sets.quizdrag is true then quizdrag.paused = false
			audio.clique.play()
			$('.dimmer').fadeOut()

		start: ->
			if func.status is false
				func.status = true
				$('.intro').fadeOut()
				$('.modal').delay(300).fadeIn()

			else
				audio.start()
				clickarea.start()
				quiz.start()
				slideshow.start()
				trueORfalse.start()
				dragdrop.start()
				quizdrag.start()
				vblocks.start()

				func.dismiss()
				$('.content').fadeIn()


# ----- Eventos ----- #
	$(document).on 'click', '.audio', -> audio.audio()

	$(document).on 'click', '.clickarea *', -> if sets.clickarea is true then clickarea.showC $(this)
	$(document).on 'click', '.dismiss', -> if sets.clickarea is true then clickarea.callEnd()

	$(document).on 'click', '.alts li', -> if sets.quiz is true then quiz.selectAlt $(this)
	$(document).on 'click', '.verify', -> if sets.quiz is true then quiz.verify()
	$(document).on 'click', '.nxt', -> if sets.quiz is true then quiz.nxt()

	$(document).on 'click', '.ctrl *', -> if sets.slideshow is true then slideshow.slide $(this)

	$(document).on 'click', '.true, .false', -> if sets.trueORfalse is true then trueORfalse.verify $(this)
	$(document).on 'click', '.nxt', -> if sets.trueORfalse is true then trueORfalse.nxt()

	$(document).on 'click', '.vblocks section div:nth-child(1)', -> if sets.vblocks is true then vblocks.showM $(this).parent()
	$(document).on 'click', '.vblocks .back', -> if sets.vblocks is true then vblocks.backIt()

	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
