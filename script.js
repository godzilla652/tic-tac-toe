function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
document.addEventListener('DOMContentLoaded', main)

function main(){
  //check vars
  var fill = 0
  //check vars

  //computer memory
  var vertical0 = ['0_0','0_1','0_2'] //horizontal line 0
  var vertical1 = ['1_0','1_1','1_2'] //horizontal line 1
  var vertical2 = ['2_0','2_1','2_2'] //horizontal line 2

  var vertical3 = ['0_0','1_0','2_0'] //vertical line 0
  var vertical4 = ['0_1','1_1','2_1'] //vertical line 1
  var vertical5 = ['0_2','1_2','2_2'] //vertical line 2

  var vertical6 = ['0_0','1_1','2_2'] //vertical line 1
  var vertical7 = ['0_2','1_1','2_0'] //vertical line 2

  var sum0 = 0
  var sum1 = 0
  var sum2 = 0

  var sum3 = 0
  var sum4 = 0
  var sum5 = 0

  var sum6 = 0
  var sum7 = 0

  var set_of_verticals = [vertical0,vertical1,vertical2,    vertical3,vertical4,vertical5,    vertical6,vertical7]
  var set_of_sums =      [sum0,sum1,sum2,    sum3,sum4,sum5,   sum6,sum7]
  //computer memory
  x = 'x.jpg'
  o = 'o.png'

  let dom_cols = document.querySelectorAll('.col')

  for(let col of dom_cols){
    col.onclick = function(){
      if(this.children.length < 1){
        this.appendChild(returnImage(x))
        inc_fill()
        //make computer take a turn
        check()
        computer_turn()
      }
    }
  }
  function computer_turn(){
    //helpers
    function make_a_choice(){
      let my_verticals = []
      let el = null
      make_sum()


      //@TODO make computer place 3 in a row
      //@TODO make computer place 3 in a row
      for(let vertical_index in set_of_verticals){
        let vertical = set_of_verticals[vertical_index]
        let counter_o = 0
        let counter_x = 0
        for(let node_index in vertical){
          let node = vertical[node_index]
          let element = document.getElementById(node)
          if(element.children.length != 0){
            if(element.children[0].getAttribute('src').match(/./)[0] == 'o'){
              counter_o++
            }
            if(element.children[0].getAttribute('src').match(/./)[0] == 'x'){
              counter_x++
            }
          }
        }
        if(counter_o == 2 && counter_x == 0){
          for(let node of vertical){
            let element = document.getElementById(node)
            if(element.children.length == 0){
              el = element
            }
          }
        }
      }
      //@TODO make computer place 3 in a row/
      //@TODO make computer place 3 in a row
      if(el != null){return el}
      for(let index in set_of_sums){
        if(set_of_sums[index] == 2){
          for(let node_index in set_of_verticals[index]){
            let node = set_of_verticals[index][node_index]
            if(document.getElementById(node).children.length == 0){
              el = document.getElementById(node)
              return el
            }
          }
        }
        if(set_of_sums[index] == 1){
          my_verticals.push(set_of_verticals[index])
        }
      }
      let node_to_choose = []
      for(let vertical of my_verticals){
        for(let node of vertical){
          node_to_choose.push(node)
        }
      }
      let node_to_place = node_to_choose[randomInteger(0, node_to_choose.length-1)]
      if(document.getElementById(node_to_place).children.length == 0){
        return document.getElementById(node_to_place)
      }
      if(document.getElementById(node_to_place).children.length == 1){
        while (true){
        let node_to_place = node_to_choose[randomInteger(0, node_to_choose.length-1)]
        if(document.getElementById(node_to_place).children.length == 0){
          return document.getElementById(node_to_place)
          break
        }
        else{
          continue
        }
        }
      }
    }//end func
    //start
    setTimeout(function(){
      //put down an element
      make_a_choice().appendChild(returnImage(o))
      inc_fill()
      check()
    }, 500)
  }//end of computer turn function

  //check function
  function check(){
    setTimeout(function(){
      if(fill == 9){
        clear_game_paddle()
      }
      //check if three
      for(let vertical of set_of_verticals){
        let counter_x = 0
        let counter_y = 0
        for(let node of vertical){
          let element = document.getElementById(node)
          if(element.children.length != 0){
            if(element.children[0].getAttribute('src').match(/./)[0] == 'x'){
              counter_x++
              if(counter_x == 3){alert('Player wins');location.reload()}
            }
            else{
              counter_y++
              if(counter_y == 3){alert('Computer wins');location.reload()}
            }
          }
        }
      }//for
    }, 500)
  }
  //helper functions
  function returnImage(path){
    let element = document.createElement('img')
    element.src = path
    element.setAttribute('width', '150px')
    element.setAttribute('height', '150px')
    return element
  }
  function inc_fill(){
    fill++
  }
  function set_fill_null(){
    fill = 0
  }
  function null_sums(){
    for(let index in set_of_sums){
      set_of_sums[index] = 0
    }
  }
  function clear_game_paddle(){
    for(let element of dom_cols){
      element.children[0].remove()
    }
    set_fill_null()
  }
  function make_sum(){
    null_sums()
    for(let vertical_index in set_of_verticals){
      let vertical = set_of_verticals[vertical_index]
      for(let node_index in vertical){
        let node = vertical[node_index]
        if(document.getElementById(node).children[0] &&
           document.getElementById(node).children[0].getAttribute('src').match(/^./)[0] == 'x'){
          set_of_sums[vertical_index]++
        }
      }
    }
  }//end make_sum

}// end main
