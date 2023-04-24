
const _apiBase = 'https://jsonplaceholder.typicode.com/posts'

const postList = document.querySelector('.post__list') as HTMLElement,
    addButton = document.querySelector('.button__add') as HTMLElement
    let response: IItemInfo[] | null = null;
let startPoint = 0,
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
    let posts = response?.slice(start, end)
    posts?.forEach((post) => {
        const postNode = document.createElement("li");
        postNode.className = "post";
        postNode.innerHTML = `
            <h2>User ${post.id}, ${post.title}</h2>
            <p>${post.body}</p>
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
    await renderPosts(startPoint, startPoint + 10);
});

addButton.addEventListener('click', ()=>{
    if(startPoint === 20){
        addButton.classList.add('disable')
    }
    startPoint += 10
    renderPosts(startPoint, startPoint + 10);
})