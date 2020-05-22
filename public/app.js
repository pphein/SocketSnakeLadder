// Make connection
var socket = io.connect('http://localhost:8000');

socket.on('noti', function (data) {
  alert(data);
});

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');



var activePlayer, userOne, userTwo, scoreOne, scoreTwo, dieScoreOne, dieScoreTwo, dieScore, button, showOneScore,showTwoScore, restart;


    activePlayer = 0;
    socket.emit('id', activePlayer);
    dieScore = 0;
    scoreOne = 0;
    scoreTwo = 0;
    button = document.getElementById('roll');
    showOneScore = document.getElementById('score-0');
    showTwoScore = document.getElementById('score-1');
    die = document.getElementById('diephoto');

    restart = document.getElementById('restart');


// Emit events   

button.addEventListener('click', function() {       
  
  socket.on('id', function(data) {
    activePlayer = data;
  });

  if (activePlayer === 0) {
    

    dieScore = Math.floor(Math.random() * 6 + 1);
    socket.emit('dieScore', dieScore);

  
    socket.emit('lastScoreOne', scoreOne);      
    

    scoreOne += dieScore;
    
    if (scoreOne == 2) {
      scoreOne = 23; 
      document.getElementById('ladder').play();
    }

    if (scoreOne == 10) {
      scoreOne = 30;
      document.getElementById('ladder').play(); 
    }

    if (scoreOne == 16) {
      scoreOne = 7;
      document.getElementById('snake').play();
    }

    if (scoreOne == 28) {
      scoreOne = 48; 
      document.getElementById('ladder').play();
    }

    if (scoreOne == 43) {
      scoreOne = 38; 
      document.getElementById('snake').play();
    }

    if (scoreOne == 54) {
      scoreOne = 30;
      document.getElementById('snake').play();
    }

    if (scoreOne == 59) {
      scoreOne = 78;
      document.getElementById('ladder').play();
    }

    if (scoreOne == 73) {
      scoreOne = 70; 
      document.getElementById('snake').play();
    }

    if (scoreOne == 74) {
      scoreOne = 88; 
      document.getElementById('ladder').play();
    }

    if (scoreOne == 75) {
      scoreOne = 67; 
      document.getElementById('snake').play();
    }

    if (scoreOne == 83) {
      scoreOne = 46;
      document.getElementById('snake').play(); 
    }

    if (scoreOne == 96) {
      scoreOne = 63;
      document.getElementById('snake').play();
    }

    if (scoreOne == 99) {
      scoreOne = 82; 
      document.getElementById('snake').play();
    }

    if (scoreOne >= 100) {
      scoreOne = 100;
      var winScore = scoreOne;
      document.getElementById('winner').play();
      socket.emit('noti' , winScore );
      socket.emit('scoreOne', winScore);
    }

    socket.emit('scoreOne', scoreOne);

    activePlayer = 1;
    socket.emit('id', activePlayer);

  }else if (activePlayer === 1) {

    dieScore = Math.floor(Math.random() * 6 + 1);
    socket.emit('dieScore', dieScore);

    socket.emit('lastScoreTwo', scoreTwo);

    scoreTwo += dieScore; 
    
     if (scoreTwo == 2) {
      scoreTwo = 23; 
      document.getElementById('ladder').play();
    }

    if (scoreTwo == 10) {
      scoreTwo = 30;
      document.getElementById('ladder').play(); 
    }

    if (scoreTwo == 16) {
      scoreTwo = 7;
      document.getElementById('snake').play();
    }

    if (scoreTwo == 28) {
      scoreTwo = 48; 
      document.getElementById('ladder').play();
    }

    if (scoreTwo == 43) {
      scoreTwo = 38; 
      document.getElementById('snake').play();
    }

    if (scoreTwo == 54) {
      scoreTwo = 30;
      document.getElementById('snake').play();
    }

    if (scoreTwo == 59) {
      scoreTwo = 78;
      document.getElementById('ladder').play();
    }

    if (scoreTwo == 73) {
      scoreTwo = 70; 
      document.getElementById('snake').play();
    }

    if (scoreTwo == 74) {
      scoreTwo = 88; 
      document.getElementById('ladder').play();
    }

    if (scoreTwo == 75) {
      scoreTwo = 67; 
      document.getElementById('snake').play();
    }

    if (scoreTwo == 83) {
      scoreTwo = 46;
      document.getElementById('snake').play(); 
    }

    if (scoreTwo == 96) {
      scoreTwo = 63;
      document.getElementById('snake').play();
    }

    if (scoreTwo == 99) {
      scoreTwo = 82; 
      document.getElementById('snake').play();
    }

    if (scoreTwo >= 100) {
      scoreTwo = 100;
      var winScore = scoreTwo;
      document.getElementById('winner').play();
      socket.emit('noti' , winScore);
      socket.emit('scoreTwo', winScore);
    }

      socket.emit('scoreTwo', scoreTwo);


      activePlayer = 0;
      socket.emit('id', activePlayer);
    }  

});

restart.addEventListener('click', function () {
  socket.emit('restart');
});


btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('dieScore', function(data) {
  die.src = 'dice-'+ data + '.png';
});

socket.on('scoreOne', function(data) {

  document.querySelector('#cell-'+data).style.backgroundColor = 'blue';
  showOneScore.innerHTML = data;
  scoreOne = data;
});

socket.on('scoreTwo', function(data) {
  document.querySelector('#cell-'+data).style.backgroundColor = 'red';
  showTwoScore.innerHTML = data;
  scoreTwo = data;

});

socket.on('id', function(data){
    activePlayer = data;
    if( data === 0){
        document.querySelector('.status-' + data).textContent = '*';
        document.querySelector('.status-1').textContent = '';
        document.querySelector('.status-' + data).style.backgroundColor = 'blue';
        document.querySelector('.status-1').style.backgroundColor = '';
      }else{
       document.querySelector('.status-' + data).textContent = '*';
       document.querySelector('.status-0').textContent = '';
       document.querySelector('.status-' + data).style.backgroundColor = 'red';
        document.querySelector('.status-0').style.backgroundColor = '';
      }
  
    });

socket.on( 'lastScoreOne',function(data){document.querySelector('#cell-'+ data).style.backgroundColor = '';
    });

socket.on( 'lastScoreTwo',function(data){document.querySelector('#cell-'+ data).style.backgroundColor = '';
    });

socket.on('noti', function (data) {
  document.querySelector('#cell-'+data).style.backgroundColor = 'green';
  alert(' Result is '+data+' Game over!');
  window.location.reload(true);
});


socket.on('restart', function () {
  alert('Restart');
  window.location.reload(true);
});


