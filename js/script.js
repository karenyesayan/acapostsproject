const API_URL = `https://jsonplaceholder.typicode.com/posts`

const postsNode = document.getElementById('posts');
const postsGetButtonNode = document.getElementById('postsGetButton');
const svg = document.querySelector('svg');
const searchBtn = document.getElementById('searchBtn');
const siteSearch = document.getElementById('site-search');
const header1 = document.querySelector('h1');



let chngtm = false;
let hidebtn = false;
let srcbtn = false;
let gPost = false;



function removeContent() {
    let first = postsNode.firstElementChild;
    while (first) {
        first.remove();
        first = postsNode.firstElementChild;
    }
}

 function getPosts() {
    gPost = true;
    if(srcbtn === true) {
        removeContent();
    }

    if(hidebtn === true) {
        postsNode.style.display = "";
        return;
    }  

     fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(el => {
                const newLiNode = document.createElement('li')
                const newTitleNode = document.createElement('div')
                const newBodyNode = document.createElement('div')
                newTitleNode.innerHTML = el.title
                newTitleNode.style.fontWeight = "bold";
                newBodyNode.innerHTML = el.body
                newLiNode.appendChild(newTitleNode)
                newLiNode.appendChild(newBodyNode)
                postsNode.appendChild(newLiNode)
                
            });
        })
}





 async function loadingIcon() {
    const newDivNode = document.createElement('div');
    newDivNode.className ="loader";
    header1.appendChild(newDivNode);
    await new Promise((resolve, reject) => setTimeout(() => {
        newDivNode.remove();
        getPosts();
    }, 1500));
  }

postsGetButtonNode.addEventListener('click', loadingIcon);




document.getElementById('postsHidebutton').addEventListener('click', () => {
    if(srcbtn === true) {
        removeContent();
        return;
    }
    if(gPost === false) {
        return;
    }
    if(hidebtn === true || gPost === true) {
        postsNode.style.display = "";
        removeContent();
        return;
    }
    postsNode.style.display = "none";
    hidebtn = true;
});


svg.addEventListener('click', () => {
    if(chngtm === true) {
        document.body.style.color ="";
        document.body.style.backgroundColor ="";
        svg.style.fill = "";
        chngtm = false;
        return;
    }
    svg.style.fill = "white";
    document.body.style.color ="white";
    document.body.style.backgroundColor ="#212121";
    chngtm = true;
});


async function filterById() {
    if(hidebtn === true || gPost === true) {
        postsNode.style.display = "";
        removeContent();
    }

    let userinput = siteSearch.value;
    let response = await fetch(API_URL);
    let convert = await response.json();
    let array = convert.filter(element => element.id === +userinput);
    const newLiNode = document.createElement('li')
    const newTitleNode = document.createElement('div')
    const newBodyNode = document.createElement('div')
    newTitleNode.innerHTML = array[0].title;
    newTitleNode.style.fontWeight = "bold";
    newBodyNode.innerHTML = array[0].body;
    newLiNode.appendChild(newTitleNode)
    newLiNode.appendChild(newBodyNode)
    postsNode.appendChild(newLiNode)
    srcbtn = true;
  }


searchBtn.addEventListener('click', filterById);



siteSearch.addEventListener('keypress', function (e) {
    if(isNaN(siteSearch.value)) {
        return;
    } else if (e.key === 'Enter') {
            e.preventDefault();
            filterById()
   }
});

