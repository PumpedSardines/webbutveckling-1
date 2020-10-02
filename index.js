const onScroll = [];

;(() => {
    window.addEventListener("scroll",() => {
        onScroll.forEach(f => {
            f({
                isTop: window.scrollY == 0,
                scroll: window.scrollY
            })
        });
    });
})();

/*
    Show website on scroll
*/
;(() => {
    const website = document.querySelector("#website");
    onScroll.push(({isTop}) => {
        if(isTop) {
            website.classList.remove("show");
        }else {
            website.classList.add("show");

        }
    });
})();

;(() => {
    const navbar = document.querySelector("#nav-bar");
    let wasTop = true;
    onScroll.push(({isTop}) => {
        if(isTop) {
            wasTop = true;
            navbar.classList.remove("show");
        }else if(wasTop) {
            wasTop = false;
            setTimeout(() => {
                navbar.classList.add("show");
            },200);
        }
    });
})();

;(() => {
    const scrolls = [...document.querySelectorAll("[animate-on-scroll]")];
    onScroll.push(({scroll}) => {
        scrolls.forEach(v => {
            console.log((document.documentElement.clientHeight * 0.6 + scroll),v.offsetTop)
            if((document.documentElement.clientHeight * 0.6 + scroll) > v.offsetTop) {
                v.classList.add("scrolled");
            }
        })
    });
})();

;(() => {
    const texts = [...document.querySelectorAll("set-text")];
    const backgroundText = document.querySelector("#background-text");
    onScroll.push(({scroll}) => {

        let text = "";
        let currentOffset = 0;

        texts.forEach(v => {
            if((document.documentElement.clientHeight * 0.5 + scroll)  > v.offsetTop && currentOffset < v.offsetTop) {
                currentOffset = v.offsetTop;
                text = v.getAttribute("text");
            }
        });
        
        if(backgroundText.innerHTML !== text && text != "") {
            backgroundText.classList.add("switch");
            setTimeout(() => {
                backgroundText.innerHTML = text;
                backgroundText.classList.remove("switch");
            },500);
        }
    });
})();