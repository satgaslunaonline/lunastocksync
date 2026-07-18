const routes = {};

export function registerRoute(name, render, init = null) {

    routes[name] = {
        render,
        init
    };

}

export function navigate(name){

    const app = document.querySelector("#app");

    if(!routes[name]){

        app.innerHTML = "<h1>404</h1>";

        return;

    }

    app.innerHTML = routes[name].render();

    initMenu();

    if(routes[name].init){

        routes[name].init();

    }

    window.location.hash = name;

}

export function startRouter(defaultPage="dashboard"){

    const page = window.location.hash.replace("#","");

    navigate(page || defaultPage);

}

export function initMenu(){

    document
    .querySelectorAll("[data-page]")
    .forEach(button=>{

        button.onclick=()=>{

            navigate(button.dataset.page);

        };

    });

}