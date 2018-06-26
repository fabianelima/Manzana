# MANZANA 0.1
O novo framework para desenvolvimento de objetos de aprendizagem do NEAD

-----

## Objetivo
Este framework surgiu da necessidade de flexibilidade que as ferramentas automáticas comumente usadas para a criação de interatividades voltadas à educação não possuem, e sem usar um milhão de bibliotecas que matam formiga com bazuca. Ele foi desenvolvido inicialmente em forma de templates simples, que foram utilizados ao longo dos últimos dois anos para facilitar a criação de pequenas interações com fins pedagógicos, dentro de pacotes SCORM publicados em ambiente Moodle. Com o tempo, a ferramenta foi crescendo e aglutinando mais e mais funções.

## Configuração
No momento, Manzana vem com módulos que permitem configurar trilha sonora de fundo, área com pontos clicáveis, quiz com inserção aleatória de perguntas, quiz do tipo verdadeiro ou falso, e slideshow. Para escolher o tipo de interação, marque "true" no módulo "sets" na opção desejada. Veja o exemplo abaixo:

```CoffeeScript
sets =
  audio: false
  clickarea: false
  quiz: true
  trueORfalse: false
  slideshow: false
```

É possível habilitar mais de um módulo ao mesmo tempo, mas é preciso fazer os ajustes necessários no restante da interação para que ela funcione a contento.

## Licença
Este framework é distribuído com a [licença MIT](https://opensource.org/licenses/MIT).
