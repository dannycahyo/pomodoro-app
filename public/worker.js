let timer = 0;

function startTimer() {
  setInterval(() => {
    timer += 1;
  }, 1000);
}

onmessage = function (e) {
  const elapsed = e.data;
  timer = elapsed;
  startTimer();
};

setInterval(() => {
  postMessage(timer);
}, 1000);
