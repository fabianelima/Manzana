###
	       				OA TEMPLATE 4.5
	------------------------------------------
				Desenvolvido em CoffeeScript

						Código: Fabiane Lima
	 Ilustração: André Kranz e Eduardo Stumpf
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


# ----- Funções e dados ----- #
$ ->
	sound = false
	data =	[]

	audio =
		trilha: new Audio('assets/audio/trilha.mp3')
		clique: new Audio('assets/audio/clique.mp3')

		audio: ->
			audio.clique.play()

			if sound is false
				sound = true
				audio.trilha.play()
				$('.audio').html('<img src="assets/img/audio.svg">')

			else if sound is true
				sound = false
				audio.trilha.pause()
				$('.audio').html('<img src="assets/img/audio-off.svg">')

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
			func.dismiss()
			sound = true
			audio.trilha.volume = 0.6
			audio.trilha.loop = true
			audio.trilha.play()
			audio.clique.play()
			$('.content').fadeIn()


# ----- Eventos ----- #
	$(document).on 'click', '.audio', -> audio.audio()

	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
