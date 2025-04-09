export const titlesHidden = (containerTodo, containerComp, titles) => {
  if(containerTodo.childElementCount == 0 && containerComp.childElementCount == 0){
    titles[1].style.display = 'none'; 
    titles[2].style.display = 'none'; 
  } else {
    titles[1].style.display = 'block'; 
    titles[2].style.display = 'block'; 
  }
}