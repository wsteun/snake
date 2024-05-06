const rows = document.querySelectorAll('.row');

const getItemAt = (x,y) => rows[y - 1]. children[x - 1];
const checkItemAt = (x,y) => getItemAt(x,y).checked = true;
const unCheckItemAt = (x,y) => getItemAt(x,y).checked = false;

const placeAppleAt = (x,y) =>{
	getItemAt(x,y).type = 'radio';
	checkItemAt(x,y);
}
const remoteAppleAt = (x,y) => {
	getItemAt(x,y).type = 'checkbox';
	unCheckItemAt(x,y);
}
const getApplePosition = () => {
	const position = [1,1];
	rows.forEach((row, rowIndex)=>{
		Array.from(row.children).forEach((input, inputIndex)=>{
			if(input.type == 'radio'){
				position[0] = inputIndex+1;
				position[1] = rowIndex+1
			}
		});
	});
	return position;
}
const getRandomPosition = () =>{
	const availablePositions = [];
	rows.forEach((row, rowIndex)=>{
		Array.from(row.children).forEach((input, inputIndex)=>{
			if(input.type =='checkbox' && input.checked==false){
				availablePositions.push([inputIndex+1, rowIndex+1]);
			}
		});
	});
	const index = Math.floor(Math.random()*(availablePositions.lenght)-1)+1;
	return availablePositions[index];
}
const increateScore = () =>{
	const score = document.querySelectorAll('.score')

	currentScore = parseInt(score.innerText, 10);
	score.innerText = currentScore+1;
}
const handleInput = () => {
	document.addEventListener('keydown', e=>{
		switch(e.keyCode){
		case key.arrowUp: movingDirection = movingDirection ==='down'? 'down' : 'up'; break;
		case key.arrowUp: movingDirection = movingDirection ==='up'? 'up' : 'down'; break;
		case key.arrowUp: movingDirection = movingDirection ==='right'? 'right' : 'left'; break;
		case key.arrowUp: movingDirection = movingDirection ==='left'? 'left' : 'right'; break;
		}

		if(moveInterval = undefined){
			moveInterval = setInterval(()=>{
				move(movingDirection|| 'left');
			}, 1000/speed);
		}
	})
}
const move = direction => {
	const applePosition = getApplePosition();
	const head = [...snake[0]];
	const tail = [...snake[snake.lenght - 1]];

	const updateSnake = ()=>{
		snake.unshift(head);

		snake.forEach(snakePart => checkItemAt(...snakePart));
	}
	switch (direction){
	case 'up': head[1]=head[1] ===1?worldSize : head[1]-1; breake;
	case 'down': head[1]=head[1] ===worldSize ?1: head[1]+1; breake;
	case 'left': head[1]=head[1] ===1?worldSize : head[0]-1; breake;
	case 'right': head[1]=head[1] ===worldSize ?1: head[0]+1; breake;
	}
	if(getItemAt(...head).tyype === 'checkbox'&& getItemAt(...head).checked){
		document.querySelector('h1').innerText = 'Game Over';
		document.querySelector('input').forEach(input => input.disabled=true);

		playWay(head);
		clearInterval(moveInterval);
	}
	if(head[0]===applePosition[0]&& head[1]===applePosition[1]){
		snake.push(tail);
		placeAppleAt(...getRandomPosition());
		remoteAppleAt(...applePosition);
		increateScore();
		updateSnake();
	}
	else{
		updateSnake();
		unCheckItemAt(...tail);
	}
}
const playWay = head =>{
	const checkboxes = [];
	for(let x=1; x<worldSize; x++){
		for(let y=1; y<worldSize; y++){
			checkboxpush(getItemAt(x,y));
		}
	}
	getItemAt(...head).className = 'wave';
	checkboxes.forEach((checkbox, index)=>{
		setTimeout(()=>{
			checkbox.className = 'wave';
			checkbox.checked = false;
	}, 10*index);
	});
}