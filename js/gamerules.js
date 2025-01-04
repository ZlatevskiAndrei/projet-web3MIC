const userName = document.getElementById("userName")
const enterButton = document.getElementById("enterButton")

enterButton.addEventListener("click",nameComparison)

function nameComparison() {
    if(userName.value==="Santa Claus" || userName.value==="santa claus" || userName.value==="Santa claus"|| userName.value==="santa Claus"||userName.value==="Santa Claus " || userName.value==="santa claus " || userName.value==="Santa claus "|| userName.value==="santa Claus " ){
        alert("Well played ! ")
    }
    else {
        alert(userName.value+", you didn't pay enough attention to the story, you are Santa Claus ! How did you forget that ?")
    }
    userName.value=""
}