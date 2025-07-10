FLAG_DV = false

function hack_mainframe(){
    if (FLAG_DV == false){
        console.log("[MAINFRAME] DETECTED INTRUSION")
        console.log("[MAINFRAME] SUCCESSFULLY HACKED")
        document.querySelectorAll('div').forEach(el => {
            
            el.classList.add('debug_div');
        });
        FLAG_DV = true
        snackbar_create("⚒️ Developer mode toggled.",false)
    }else{
        document.querySelectorAll('div').forEach(el => {
            
            el.classList.remove('debug_div');
        });
        FLAG_DV = false
        snackbar_create("⚒️ Developer mode un-toggled.",false)

    }
}