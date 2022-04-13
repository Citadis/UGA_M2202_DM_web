window.addEventListener('load',function(){
// Partie PWA
    
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
};

});