class Quiz {
  constructor(){
    this.tituloRespuesta=createElement('h1');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();
    //escribe aquí el código para cambiar el color de fondo 
    background("dodgerblue");
    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    this.tituloRespuesta.html("Resultado del Cuestionario");
    this.tituloRespuesta.position(350, 0);
    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var display_Answers = 230;
      fill("Blue");
      textSize(20);
      text("Nota: el concursante que respondió correctamente, está resaltado en color verde",130,230);

      for(var plr in allContestants){
        debugger;
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer)
          fill("Green")
        else
          fill("Red");
        this.tituloRespuesta.show();
        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
      }
    }
  }
}
