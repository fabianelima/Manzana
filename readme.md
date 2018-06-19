# MANZANA
O novo framework para desenvolvimento de objetos de aprendizagem do NEAD

-----

## Objetivo
Este framework foi desenvolvido em forma de templates ao longo dos últimos dois anos para facilitar o desenvolvimento de pequenas interações com fins pedagógicos dentro de pacotes SCORM, mas de modo a permitir uma flexibilidade que as ferramentas prontas interativas que existem não possuem.

## Configuração
No momento, Manzana vem com módulos que permitem configurar trilha sonora de fundo, área com pontos clicáveis e um quiz com inserção aleatória das perguntas. Para escolher o tipo de interação, marcar "true" no módulo "sets" na opção desejada. Veja o exemplo abaixo:

```CoffeeScript
sets =
  audio: false
  clickarea: false
  quiz: true
  slideshow: false
```

É possível habilitar mais de um módulo ao mesmo tempo, mas é preciso fazer os ajustes necessários no restante da interação.

## Licença
Este framework é distribuído com a (licença MIT)[https://opensource.org/licenses/MIT].
