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
		sound: false
		clickable: false

	audio =
		trilha: new Audio('assets/audio/trilha.mp3')
		clique: new Audio('assets/audio/clique.mp3')

		start: ->
			if sets.sound is true
				audio.trilha.volume = 0.6
				audio.trilha.loop = true
				audio.trilha.play()
				audio.clique.play()
				$('.audio').fadeIn()

		audio: ->
			audio.clique.play()

			if sets.sound is false
				sets.sound = true
				audio.trilha.play()
				$('.audio').html('<img src="assets/img/audio.svg">')

			else if sets.sound is true
				sets.sound = false
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
			if sets.clickable is true
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

		dismiss: ->
			audio.clique.play()
			$('.dimmer').fadeOut()

		start: ->
			sets.sound = false
			audio.start()

			sets.clickable = true
			clickarea.start()

			func.dismiss()
			$('.content').fadeIn()


# ----- Eventos ----- #
	$(document).on 'click', '.audio', -> audio.audio()
	$(document).on 'click', '.clickarea *', -> if sets.clickable is true then clickarea.showC $(this)
	$(document).on 'click', '.dismiss', -> if sets.clickable is true then clickarea.callEnd()

	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
