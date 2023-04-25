import updateObjectInArray from "./updateObjectInArray";
const _apiBase = 'https://jsonplaceholder.typicode.com/posts'

const postList = document.querySelector('.post__list') as HTMLElement,
    addButton = document.querySelector('.button__add') as HTMLElement,
    testButton = document.querySelector('.button__test') as HTMLElement
let response: IItemInfo[],
    startPoint = 0,
    dataLoaded = false;

interface IItemInfo{
    userId: number,
    id:number,
    title:string,
    body:string
}

async function getInfo(url:string):Promise<IItemInfo[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data as IItemInfo[];
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
}

async function renderPosts(start:number, end:number): Promise<void> {
    let posts = response.slice(start, end)
    posts.forEach((post) => {
        const {id, body, title} = post
        const postNode = document.createElement("li");
        postNode.className = "post";
        postNode.innerHTML = `
            <h2>User ${id}, ${title}</h2>
            <p>${body}</p>
        `;
        postList.appendChild(postNode);
    });

}
async function getInfoOnLoad(): Promise<void> {
    if (!dataLoaded) {
        response = await getInfo(_apiBase);
        dataLoaded = true;
    }
}

window.addEventListener('load', async () => {
    await getInfoOnLoad();
    await renderPosts(startPoint, startPoint += 10);
});

addButton.addEventListener('click', ()=>{
    if(startPoint === 90){
        addButton.classList.add('disable')
    }
    renderPosts(startPoint, startPoint += 10);
})

testButton.addEventListener('click', async () => {
    const update: Partial<IItemInfo> = {
      title: 'The test is successful!',
      body: 'Function "updateObjectInArray" works correctly!',
    };

    const updatedArray = await updateObjectInArray(response, 'id', response[0].id, update);
  
    if (updatedArray !== null) {
        response = updatedArray;
        postList.innerHTML = ''
        renderPosts(0, startPoint)
        let firstChild = postList.children[0] as HTMLElement
        firstChild.classList.add('green')
        window.scrollTo(0, 0);
        testButton.classList.add('disable')
    }
  });