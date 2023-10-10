let ctx = document.getElementById("age");

setInterval(() => {
    let time = dayjs().diff(dayjs('2002-05-26 10:00'), 'year', true);
    ctx.innerHTML = time.toString().substring(0,12);
    //console.log("test");
    //return;
}, 50);