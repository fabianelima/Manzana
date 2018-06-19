###
	       				  MANZANA 5
	------------------------------------------
				Desenvolvido em CoffeeScript
 							por Fabiane Lima

###

# ----- Pré-carregamento das imagens ----- #
imgs =	[
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


# ----- Módulos e dados ----- #
$ ->
	sets =
		audio: false
		clickarea: false
		quiz: false
		slideshow: true

	audio =
		trilha: new Audio('assets/audio/trilha.mp3')
		clique: new Audio('assets/audio/clique.mp3')

		start: ->
			if sets.audio is true
				audio.trilha.volume = 0.6
				audio.trilha.loop = true
				audio.trilha.play()
				audio.clique.play()
				$('.audio').fadeIn()

		audio: ->
			audio.clique.play()

			if sets.audio is false
				sets.audio = true
				audio.trilha.play()
				$('.audio').html('<img src="assets/img/audio.svg">')

			else if sets.audio is true
				sets.audio = false
				audio.trilha.pause()
				$('.audio').html('<img src="assets/img/audio-off.svg">')

	clickarea =
		pro: undefined
		count: 0
		ctrl: []
		resp: []
		data:	[
			{
				txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [50, 30]
			}
			{
				txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [20, 20]
			}
			{
				txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [10, 30]
			}
			{
				txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [30, 70]
			}
			{
				txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				pos: [50, 50]
			}]

		start: ->
			if sets.clickarea is true
				$('.content').append('<div class="clickarea"></div>')

				for i in clickarea.data
					clickarea.resp.push clickarea.data.indexOf(i)
					$('.clickarea').append('<div></div>')
					$('.clickarea div:nth-child(' + (clickarea.count + 1) + ')').css
						top: clickarea.data[clickarea.count].pos[0] + '%'
						left: clickarea.data[clickarea.count].pos[1] + '%'
					clickarea.count++

		showC: ($el) ->
			clickarea.ctrl.push $el.index()
			$el.css { pointerEvents: 'none', opacity: '0.6' }

			$('.dimmer').fadeIn()
			$('.modal').html(clickarea.data[$el.index()].txt + '<button class="dismiss callend">Fechar</button>')

		callEnd: ->
			if clickarea.ctrl.length isnt clickarea.data.length then return false
			else
				for i, j in clickarea.ctrl
					if clickarea.ctrl.indexOf(i) is clickarea.resp[j]
						setTimeout ->
							func.end()
						, 1000

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
			$('.content').append('
			<div class="slides"></div>
			<div class="ctrl">
				<button class="next">></button>
				<button class="prev"><</button>
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

	func =
		help: ->
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

			if sets.quiz is true	# melhorar isso
				if quiz.score > 1 then $('.modal').html('<h1>Você acertou ' + quiz.score + ' questões!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')
				else if quiz.score < 1 then $('.modal').html('<h1>Você não acertou nenhuma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')
				else $('.modal').html('<h1>Você acertou uma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')

				$('.modal p').html('Texto de feedback.')

		dismiss: ->
			audio.clique.play()
			$('.dimmer').fadeOut()

		start: ->
			audio.start()
			clickarea.start()
			quiz.start()
			slideshow.start()

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

	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
