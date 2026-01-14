/*Mauricio Procel
CS 248 
Project 4: Fifteen Puzzle
A puzzle game with 15 tiles, each display a section of an image. The goal is to move the tiles
until to get the tiles in the correct order with the background image matching.
*/
(function(){
"use strict";
	let tiles = [];
	//fucntion that will be called immediately when it is read on the html file.
		window.onload = function(){
		//get the shuffle button and set event handler
		document.getElementById("shufflebutton").onclick = shuffle;
		//create the initial state of the puzzle 
		createPuzzle();
		//get the element with all the tiles and set onclick event handlers
		//to all of them.
		let target = document.querySelectorAll("div.tile");
		//set all event handlers to the tiles.
		for(let i = 0; i < target.length; i++){
			target[i].onclick = target.onclick = moveTile;
			target[i].onmouseover = target.onmouseover= tileHoverEffect;
			target[i].onmouseout = target.onmouseout = tileHoverEffect;
		}

	};
	//funtion that sets up the initial position of the tiles and gives every tile their 
	//corresponding portion of the image.
	function createPuzzle(){
		let puzzleArea = document.getElementById("puzzlearea");
		const gridTiles = 16;	
		for(let i = 0; i < gridTiles; i++){
			let tile = document.createElement("div"); //tile to be added in array and DOM
			let row = Math.floor(i / 4); //get the row of the current tile
			let column = i % 4;// get the column of the current tile
			//add an empty tile to the array but not the DOM
			if(i == gridTiles - 1){
				tile.id = "empty";
				tile.style.backgroundPosition =-(column * 100) + "px " + -(row * 100) + "px";
				tiles.push(tile);
			}else{
				tile.style.backgroundImage = "url(lily.JPg)";
				tile.className = "tile";
				tile.innerHTML = i + 1;
				tile.style.backgroundPosition = -(column * 100) + "px " + -(row * 100) + "px";
				tiles.push(tile);
				puzzleArea.appendChild(tile);
			}
		}
	}

	//shuffles the grid by making 1000 random moves
	function shuffle(){
		let moves = 0;
		//loop exactly 1000 times
        while(moves < 1000) {
	        let emptyTile;
	        //find the empty tile
			for (let i = 0; i < tiles.length; i++) {
			    if (tiles[i].id == "empty") {
			        emptyTile = tiles[i];
			    }
			}
			//find the neighbors of the empty tile and swap them with a
			//randomly picked neigboring tile.
	        let neighbors = findNeighbors(emptyTile);
            let random = Math.floor(Math.random() * neighbors.length);
	        swapTiles(neighbors[random], emptyTile);
            moves++;
        }
        updateGrid();
			
	}
	//function called when the mouse hovers over a neighboring tile of the one clicked 
	//and styles the border and the mouse pointer.
	function tileHoverEffect(event){
		//find neighbors of the tile with the mouse over.
		let neighbors = findNeighbors(this);
		//loop through the neighbors
		for(let i = 0; i < neighbors.length; i++){
				//if one of the neighbors is an empty tile, meaning that it is a possible 
				//move, then apply the styles.
				if(neighbors[i].id == "empty"){
					this.style.borderColor = "red";
					this.style.cursor = "pointer";
				}
			}
		//when the mouse exits the tile, change the border back to black
		if(event.type == "mouseout"){
			this.style.borderColor = "black";
		}
	}
	//function to find the neighbors of any given tile
	function findNeighbors(tile){
		let tileIndex = tiles.indexOf(tile);//index of the tile looking for its neighbors
		let neighbors = [];//array of neighbors
		let row = Math.floor(tileIndex / 4);//row of the tile clicked
		let column = tileIndex % 4;//column of the tile clicked

		//add top neighbor only if we are past the first row
		if(row > 0){
			neighbors.push(tiles[tileIndex - 4]);
		}
		//add bottom neighbor only if we are before the fourth row
		if(row < 3){
			neighbors.push(tiles[tileIndex + 4]);
		}
		//add left neighbor only if we are past the first column
		if(column > 0){
			neighbors.push(tiles[tileIndex - 1]);
		}
		//add right neighbor only if we are before the fourth column
		if(column < 3){
			neighbors.push(tiles[tileIndex + 1]);
		}
		return neighbors;
	}

	//function toarrange the tiles on the grid by removing all elements in the 
	//grid and replacing them with tiles from the updated array
	function updateGrid(){
		//get the puzzle area and clear it
		let puzzleArea = document.getElementById("puzzlearea");
		puzzleArea.innerHTML = "";
		//repopulate grid with the updated array of tiles
		for(let i = 0; i < tiles.length; i++){
				puzzleArea.appendChild(tiles[i]);
		}
	}
	//function to move a clicked tile or a given tile to the empty square next to it.
	function moveTile(event){
		let neighbors = findNeighbors(this);//get the neighbors of the tile clicked

		//loop through neighbors, check if there is an empty tile as a neighbor.
		//if there is, then swap the empty element with the clicked tile element in the
		//array. Update the grid
		for(let i = 0; i < neighbors.length; i++){
			if(neighbors[i].id == "empty"){
				swapTiles(this, neighbors[i]);
	            updateGrid();
			}		
		}
		
	}
	//function to swap the position of two tiles in the array of tiles given two tiles.
	function swapTiles(tile1, tile2){
		let index1 = tiles.indexOf(tile1);
        let index2 = tiles.indexOf(tile2);

        [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
	}
})();